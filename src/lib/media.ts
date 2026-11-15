/**
 * DRIFT Edge Media URL Resolver
 * Resolves assets between local /public, Cloudflare R2 bucket public URLs,
 * and edge media streaming proxy fallback (/api/media/*).
 */

const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL?.replace(/\/$/, '') || '';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') || '';

export function resolveMediaUrl(pathOrUrl: string | undefined | null): string {
  if (!pathOrUrl) return '';

  // Already a complete external URL
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }

  // Normalize path removing leading slash
  const cleanPath = pathOrUrl.replace(/^\/+/, '');

  // If Cloudflare R2 public URL is configured in environment
  if (R2_PUBLIC_URL) {
    return `${R2_PUBLIC_URL}/${cleanPath}`;
  }

  // In development or when no R2 public domain is linked, serve from Next.js public/
  return `/${cleanPath}`;
}

export function resolveMediaProxyUrl(pathOrUrl: string | undefined | null): string {
  if (!pathOrUrl) return '';
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }
  const cleanPath = pathOrUrl.replace(/^\/+/, '');
  return `${API_BASE_URL}/api/media/${cleanPath}`;
}
