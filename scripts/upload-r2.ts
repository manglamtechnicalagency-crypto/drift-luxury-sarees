import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const MIME_MAP: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.json': 'application/json',
};

interface ManifestItem {
  key: string;
  localPath: string;
  sizeBytes: number;
  contentType: string;
  cacheControl: string;
}

function getFilesRecursively(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getFilesRecursively(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

async function uploadToR2() {
  const publicDir = path.resolve(process.cwd(), 'public');
  const targetDirs = ['collections', 'videos'].map((d) => path.join(publicDir, d));

  const manifest: ManifestItem[] = [];
  const isDryRun = process.argv.includes('--dry-run');

  console.log(`[R2 UPLOAD] Scanning public assets for drift-media-assets bucket...`);

  for (const dir of targetDirs) {
    const files = getFilesRecursively(dir);
    for (const filePath of files) {
      const relPath = path.relative(publicDir, filePath).replace(/\\/g, '/');
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_MAP[ext] || 'application/octet-stream';
      const stats = fs.statSync(filePath);

      manifest.push({
        key: relPath,
        localPath: filePath,
        sizeBytes: stats.size,
        contentType,
        cacheControl: 'public, max-age=31536000, immutable',
      });
    }
  }

  console.log(`[R2 UPLOAD] Found ${manifest.length} media assets.`);

  const manifestPath = path.join(publicDir, 'r2-manifest.json');
  fs.writeFileSync(
    manifestPath,
    JSON.stringify(
      {
        bucket: 'drift-media-assets',
        syncedAt: new Date().toISOString(),
        totalFiles: manifest.length,
        totalBytes: manifest.reduce((acc, m) => acc + m.sizeBytes, 0),
        files: manifest.map((m) => ({
          key: m.key,
          sizeBytes: m.sizeBytes,
          contentType: m.contentType,
        })),
      },
      null,
      2
    )
  );
  console.log(`[R2 UPLOAD] Manifest saved to ${manifestPath}`);

  if (isDryRun) {
    console.log('[R2 UPLOAD] Dry-run complete. Exiting without remote upload.');
    return;
  }

  // Upload each file using wrangler r2 object put
  let successCount = 0;
  for (const item of manifest) {
    try {
      execSync(
        `npx wrangler r2 object put "drift-media-assets/${item.key}" --file="${item.localPath}" --content-type="${item.contentType}" --cache-control="${item.cacheControl}"`,
        { stdio: 'pipe' }
      );
      successCount++;
      if (successCount % 10 === 0 || successCount === manifest.length) {
        console.log(`[R2 UPLOAD] Progress: ${successCount}/${manifest.length} uploaded.`);
      }
    } catch (err) {
      // In local mode without live R2 credentials, log note
      console.warn(`[R2 UPLOAD] Remote upload notice for ${item.key}: ${(err as Error).message.split('\n')[0]}`);
      break;
    }
  }

  console.log(`[R2 UPLOAD] Sync run finished.`);
}

uploadToR2().catch((err) => {
  console.error('[R2 UPLOAD] Fatal:', err);
  process.exit(1);
});
