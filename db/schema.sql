-- DRIFT Luxury Sarees D1 Database Schema
-- Optimized for Cloudflare D1 Free Tier read/write limits

CREATE TABLE IF NOT EXISTS states (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  tagline TEXT,
  craft_history TEXT,
  hero_image TEXT,
  accent_hex TEXT,
  display_order INTEGER
);

CREATE TABLE IF NOT EXISTS sarees (
  id TEXT PRIMARY KEY,
  sku TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  state_slug TEXT NOT NULL REFERENCES states(slug),
  craft_origin TEXT,
  weave_type TEXT,
  fabric TEXT,
  price_inr INTEGER NOT NULL,
  original_price_inr INTEGER,
  badge TEXT,
  colors_json TEXT NOT NULL,
  blouse_sizes_json TEXT NOT NULL,
  cultural_story TEXT,
  primary_image TEXT NOT NULL,
  hover_image TEXT NOT NULL,
  is_bridal INTEGER DEFAULT 0,
  is_featured_arc INTEGER DEFAULT 0,
  occasion_tag TEXT,
  stock_count INTEGER DEFAULT 25,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  shipping_address_json TEXT NOT NULL,
  items_json TEXT NOT NULL,
  subtotal_inr INTEGER NOT NULL,
  status TEXT DEFAULT 'CONFIRMED',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Performance Indexes for Edge Filtering
CREATE INDEX IF NOT EXISTS idx_sarees_state_slug ON sarees(state_slug);
CREATE INDEX IF NOT EXISTS idx_sarees_is_bridal ON sarees(is_bridal);
CREATE INDEX IF NOT EXISTS idx_sarees_is_featured_arc ON sarees(is_featured_arc);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
