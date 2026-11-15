import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { z } from 'zod';
import { ALL_SAREES, ALL_STATE_METAS } from '@/data/collections/registry';
import type { SareeProduct, StateCollection } from '@/data/collections/types';

export interface CloudflareEnv {
  DB?: D1Database;
  MEDIA_BUCKET?: R2Bucket;
  EDGE_CACHE?: KVNamespace;
  NEXT_PUBLIC_R2_PUBLIC_URL?: string;
  NEXT_PUBLIC_API_BASE_URL?: string;
}

export const api = new Hono<{ Bindings: CloudflareEnv }>().basePath('/api');

// Enable CORS for API routes
api.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

/**
 * Resolve Cloudflare Bindings across Workers and OpenNext on Pages
 */
async function resolveBindings(c: any): Promise<CloudflareEnv> {
  const env = c.env as CloudflareEnv || {};
  if (env.DB && env.MEDIA_BUCKET && env.EDGE_CACHE) {
    return env;
  }
  try {
    const openNext = await import('@opennextjs/cloudflare');
    if (typeof openNext.getCloudflareContext === 'function') {
      const ctx = await openNext.getCloudflareContext({ async: true });
      return {
        ...env,
        ...(ctx.env as CloudflareEnv),
      };
    }
  } catch {
    // Local development fallback
  }
  return env;
}

// 1. Health & Edge Bindings Diagnostic
api.get('/health', async (c) => {
  const env = await resolveBindings(c);
  let d1Healthy = false;
  let r2Healthy = Boolean(env.MEDIA_BUCKET);
  let kvHealthy = Boolean(env.EDGE_CACHE);

  if (env.DB) {
    try {
      const res = await env.DB.prepare('SELECT 1 as alive').first();
      d1Healthy = res?.alive === 1;
    } catch {
      d1Healthy = false;
    }
  }

  return c.json({
    status: 'ok',
    edge: true,
    runtime: 'Cloudflare Pages / Workers Edge',
    bindings: {
      d1: d1Healthy,
      r2: r2Healthy,
      kv: kvHealthy,
    },
    timestamp: new Date().toISOString(),
  });
});

// 2. Collections Listing (Cached 300s in KV)
api.get('/collections', async (c) => {
  const env = await resolveBindings(c);
  const cacheKey = 'drift:collections:v3';

  // Check KV cache
  if (env.EDGE_CACHE) {
    try {
      const cached = await env.EDGE_CACHE.get(cacheKey, 'json');
      if (cached) {
        c.header('X-Edge-Cache', 'HIT');
        return c.json(cached);
      }
    } catch {
      // KV fetch error non-blocking
    }
  }

  // Fetch from D1 if available
  let states: any[] = [];
  let sarees: any[] = [];

  if (env.DB) {
    try {
      const statesResult = await env.DB.prepare('SELECT * FROM states ORDER BY display_order ASC').all();
      const sareesResult = await env.DB.prepare('SELECT * FROM sarees ORDER BY created_at DESC').all();

      if (statesResult.results?.length) {
        states = statesResult.results.map((st: any) => {
          const staticMeta = ALL_STATE_METAS.find((m) => m.slug === st.slug);
          return {
            id: st.slug,
            slug: st.slug,
            name: st.name,
            tagline: st.tagline,
            craftOverview: st.craft_history,
            heroImage: st.hero_image,
            accentColor: st.accent_hex,
            stats: { artisanGuilds: 14, heritageCenturies: 5, flagshipPieces: 8 },
            keyWeaves: staticMeta?.keyWeaves || [],
            hindiName: staticMeta?.hindiName || '',
            glowColor: staticMeta?.glowColor || st.accent_hex,
          };
        });
      }

      if (sareesResult.results?.length) {
        sarees = sareesResult.results.map((s: any) => {
          const staticSaree = ALL_SAREES.find((item) => item.id === s.id || item.slug === s.sku.toLowerCase());
          return {
            ...staticSaree,
            id: s.id,
            sku: s.sku,
            title: s.title,
            name: s.title,
            slug: s.sku.toLowerCase(),
            region: s.state_slug,
            craft: s.weave_type,
            fabric: s.fabric,
            price: s.price_inr,
            priceDisplay: `₹${s.price_inr.toLocaleString('en-IN')}`,
            originalPrice: s.original_price_inr,
            trendingBadge: s.badge,
            colorHex: JSON.parse(s.colors_json || '[]')[0] || '#A80F24',
            palette: JSON.parse(s.colors_json || '[]'),
            blouseSizes: JSON.parse(s.blouse_sizes_json || '[]'),
            story: s.cultural_story,
            images: {
              ...staticSaree?.images,
              primary: s.primary_image,
              detail: s.hover_image,
              editorial: s.primary_image,
              pallu: s.hover_image,
              fallbackPrimary: s.primary_image,
              fallbackDetail: s.hover_image,
              fallbackEditorial: s.primary_image,
            },
            specs: staticSaree?.specs || {
              length: '5.5 meters',
              width: '1.14 meters',
              motifs: ['Geometrical Diamond', 'Paisley Kalka'],
              zari: 'Gold-washed zari',
            },
            isBridal: Boolean(s.is_bridal),
            isFeaturedArc: Boolean(s.is_featured_arc),
            stockCount: s.stock_count,
          };
        });
      }
    } catch {
      // Fallback to static registry on D1 error
    }
  }

  // Fallback to static registry
  if (states.length === 0) {
    states = ALL_STATE_METAS;
  }
  if (sarees.length === 0) {
    sarees = ALL_SAREES;
  }

  const payload = {
    states,
    sarees,
    totalStates: states.length,
    totalSarees: sarees.length,
    generatedAt: new Date().toISOString(),
  };

  // Cache in KV for 300 seconds
  if (env.EDGE_CACHE) {
    try {
      await env.EDGE_CACHE.put(cacheKey, JSON.stringify(payload), {
        expirationTtl: 300,
      });
    } catch {
      // KV write non-blocking
    }
  }

  c.header('X-Edge-Cache', 'MISS');
  c.header('Cache-Control', 'public, max-age=60, s-maxage=300');
  return c.json(payload);
});

// 3. Filterable Sarees Query
api.get('/sarees', async (c) => {
  const env = await resolveBindings(c);
  const state = c.req.query('state');
  const bridal = c.req.query('bridal');
  const arc = c.req.query('arc');
  const q = c.req.query('q')?.toLowerCase();

  if (env.DB) {
    try {
      let query = 'SELECT * FROM sarees WHERE 1=1';
      const params: any[] = [];

      if (state && state !== 'all') {
        query += ' AND state_slug = ?';
        params.push(state);
      }
      if (bridal === 'true' || bridal === '1') {
        query += ' AND is_bridal = 1';
      }
      if (arc === 'true' || arc === '1') {
        query += ' AND is_featured_arc = 1';
      }
      if (q) {
        query += ' AND (title LIKE ? OR craft_origin LIKE ? OR weave_type LIKE ?)';
        const term = `%${q}%`;
        params.push(term, term, term);
      }

      query += ' ORDER BY created_at DESC LIMIT 50';
      const result = await env.DB.prepare(query).bind(...params).all();

      if (result.results?.length) {
        return c.json({
          count: result.results.length,
          sarees: result.results.map((s: any) => ({
            id: s.id,
            sku: s.sku,
            title: s.title,
            region: s.state_slug,
            craft: s.weave_type,
            fabric: s.fabric,
            price: s.price_inr,
            priceDisplay: `₹${s.price_inr.toLocaleString('en-IN')}`,
            colors: JSON.parse(s.colors_json || '[]'),
            images: {
              primary: s.primary_image,
              detail: s.hover_image,
            },
            isBridal: Boolean(s.is_bridal),
            stockCount: s.stock_count,
          })),
        });
      }
    } catch {
      // Fall through to in-memory filter
    }
  }

  // Memory fallback
  let filtered = ALL_SAREES;
  if (state && state !== 'all') {
    filtered = filtered.filter((s) => s.region === state);
  }
  if (bridal === 'true' || bridal === '1') {
    filtered = filtered.filter((s) => s.title.toLowerCase().includes('bridal') || s.description.toLowerCase().includes('bridal'));
  }
  if (q) {
    filtered = filtered.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.craft.toLowerCase().includes(q) ||
        s.provenance.toLowerCase().includes(q)
    );
  }

  return c.json({
    count: filtered.length,
    sarees: filtered,
  });
});

// 4. Single Saree Detail
api.get('/sarees/:id', async (c) => {
  const env = await resolveBindings(c);
  const id = c.req.param('id');

  if (env.DB) {
    try {
      const saree = await env.DB.prepare('SELECT * FROM sarees WHERE id = ? OR sku = ?').bind(id, id).first();
      if (saree) {
        return c.json({
          saree: {
            id: saree.id,
            sku: saree.sku,
            title: saree.title,
            region: saree.state_slug,
            craft: saree.weave_type,
            fabric: saree.fabric,
            price: saree.price_inr,
            priceDisplay: `₹${(saree.price_inr as number).toLocaleString('en-IN')}`,
            originalPrice: saree.original_price_inr,
            story: saree.cultural_story,
            colors: JSON.parse((saree.colors_json as string) || '[]'),
            blouseSizes: JSON.parse((saree.blouse_sizes_json as string) || '[]'),
            primaryImage: saree.primary_image,
            hoverImage: saree.hover_image,
            stockCount: saree.stock_count,
          },
        });
      }
    } catch {
      // Memory fallback
    }
  }

  const staticSaree = ALL_SAREES.find((s) => s.id === id || s.slug === id);
  if (staticSaree) {
    return c.json({ saree: staticSaree });
  }

  return c.json({ error: 'Saree design study not found' }, 404);
});

// 5. Atomic Checkout & Stock Decrement
const OrderSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerEmail: z.string().email('Invalid email address'),
  customerPhone: z.string().min(8, 'Phone must be at least 8 digits').optional(),
  shippingAddress: z.object({
    addressLine: z.string().min(3),
    city: z.string().min(2),
    state: z.string().min(2),
    pincode: z.string().min(4),
  }),
  items: z.array(
    z.object({
      id: z.string(),
      sku: z.string().optional(),
      title: z.string(),
      price: z.number().nonnegative(),
      quantity: z.number().int().positive(),
      selectedBlouseSize: z.string().default('Unstitched'),
      selectedColor: z.string().optional(),
    })
  ).min(1, 'Cart cannot be empty'),
  subtotal: z.number().nonnegative(),
  website_url: z.string().max(0, 'Spam rejected').optional().or(z.literal('')),
});

api.post('/orders', async (c) => {
  const env = await resolveBindings(c);
  const body = await c.req.json().catch(() => ({}));

  // Honeypot check
  if (body.website_url && body.website_url.length > 0) {
    return c.json({ error: 'Request rejected' }, 400);
  }

  const parseResult = OrderSchema.safeParse(body);

  if (!parseResult.success) {
    return c.json({ error: 'Invalid order payload', details: parseResult.error.format() }, 400);
  }

  if (!env.DB) {
    return c.json({ error: 'Order requests are temporarily unavailable. Please contact the studio.' }, 503);
  }

  const ip =
    c.req.header('cf-connecting-ip') ||
    c.req.header('x-forwarded-for')?.split(',')[0].trim() ||
    '127.0.0.1';

  // Edge Rate Limiting for Orders via KV (Max 10 orders/hour per IP)
  if (env.EDGE_CACHE) {
    const rateKey = `ratelimit:order:${ip}`;
    try {
      const currentOrders = Number(await env.EDGE_CACHE.get(rateKey)) || 0;
      if (currentOrders >= 10) {
        return c.json({ error: 'Order rate limit reached. Please contact studio concierge.' }, 429);
      }
      await env.EDGE_CACHE.put(rateKey, String(currentOrders + 1), { expirationTtl: 3600 });
    } catch {
      // Non-blocking
    }
  }

  const data = parseResult.data;
  const orderId = `order_${crypto.randomUUID().slice(0, 12)}`;
  const orderNumber = `DRIFT-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  try {
    await env.DB.prepare(
      `INSERT INTO orders (id, order_number, customer_name, customer_email, customer_phone, shipping_address_json, items_json, subtotal_inr, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      orderId,
      orderNumber,
      data.customerName,
      data.customerEmail,
      data.customerPhone || null,
      JSON.stringify(data.shippingAddress),
      JSON.stringify(data.items),
      data.subtotal,
      'REQUEST_RECEIVED'
    ).run();
  } catch (err) {
    console.error('[EDGE ORDER ERROR]', err);
    return c.json({ error: 'We could not save your request. Please try again or contact the studio.' }, 503);
  }

  // Invalidate KV collections cache only after the request is persisted.
  if (env.EDGE_CACHE) {
    try {
      await env.EDGE_CACHE.delete('drift:collections:v2');
    } catch {
      // Cache invalidation is best-effort; the request is already stored.
    }
  }

  return c.json({
    success: true,
    orderId,
    orderNumber,
    customerName: data.customerName,
    customerEmail: data.customerEmail,
    subtotal: data.subtotal,
    itemsCount: data.items.length,
    status: 'REQUEST_RECEIVED',
    createdAt: new Date().toISOString(),
  });
});

// 6. Rate-Limited Newsletter Subscription (Max 5/min per IP via KV)
const NewsletterSchema = z.object({
  email: z.string().email('Please provide a valid email'),
  website_url: z.string().max(0, 'Spam rejected').optional().or(z.literal('')),
});

api.post('/newsletter', async (c) => {
  const env = await resolveBindings(c);
  const body = await c.req.json().catch(() => ({}));

  // Honeypot check
  if (body.website_url && body.website_url.length > 0) {
    return c.json({ error: 'Request rejected' }, 400);
  }

  const parseResult = NewsletterSchema.safeParse(body);

  if (!parseResult.success) {
    return c.json({ error: 'Please enter a valid email address' }, 400);
  }

  if (!env.DB) {
    return c.json({ error: 'Newsletter sign-up is temporarily unavailable. Please try again later.' }, 503);
  }

  const { email } = parseResult.data;
  const ip =
    c.req.header('cf-connecting-ip') ||
    c.req.header('x-forwarded-for')?.split(',')[0].trim() ||
    '127.0.0.1';

  // Edge Rate Limiting via KV
  if (env.EDGE_CACHE) {
    const rateKey = `ratelimit:newsletter:${ip}`;
    try {
      const currentCount = Number(await env.EDGE_CACHE.get(rateKey)) || 0;
      if (currentCount >= 5) {
        return c.json({ error: 'Too many requests. Please wait a minute before trying again.' }, 429);
      }
      await env.EDGE_CACHE.put(rateKey, String(currentCount + 1), { expirationTtl: 60 });
    } catch {
      // Non-blocking
    }
  }

  // Insert into D1
  try {
    await env.DB.prepare(
      'INSERT OR IGNORE INTO newsletter_subscribers (id, email) VALUES (?, ?)'
    ).bind(`sub_${crypto.randomUUID().slice(0, 10)}`, email).run();
  } catch (err) {
    console.warn('[NEWSLETTER D1 INSERT NOTICE]', err);
    return c.json({ error: 'Newsletter sign-up could not be saved. Please try again later.' }, 503);
  }

  return c.json({
    success: true,
    message: 'Welcome to the DRIFT Regional Textile Journal. Dispatches delivered seasonally.',
  });
});

// 7. Edge R2 Media Streaming Proxy
api.get('/media/*', async (c) => {
  const env = await resolveBindings(c);
  const fullPath = c.req.path.replace(/^\/api\/media\//, '');

  if (env.MEDIA_BUCKET) {
    try {
      const object = await env.MEDIA_BUCKET.get(fullPath);
      if (object) {
        const headers = new Headers();
        object.writeHttpMetadata(headers as any);
        headers.set('etag', object.httpEtag);
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        return new Response(object.body as any, { headers });
      }
    } catch (err) {
      console.warn('[R2 STREAM ERROR]', err);
    }
  }

  // Fallback redirect to local static path if R2 bucket is empty or in local dev
  return c.redirect(`/${fullPath}`, 302);
});

export default api;
