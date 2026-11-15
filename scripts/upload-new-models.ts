import { execSync } from 'node:child_process';
import path from 'node:path';

const models = [
  'priya_banarasi_red.jpg',
  'priya_gujarati_patola.jpg',
  'priya_kanchipuram_purple.jpg',
  'priya_rajasthani_leheriya.jpg',
  'priya_jodhpuri_bandhani.jpg',
  'priya_paithani_peacock.jpg',
  'model_royal_chandan.jpg',
  'model_saffron_yellow.jpg',
  'model_nath_paithani.jpg',
  'model_bengali_bridal.jpg',
  'model_burgundy_zardozi.jpg',
];

for (const m of models) {
  const localPath = path.join(process.cwd(), 'public', 'collections', 'models', m);
  try {
    execSync(
      `npx wrangler r2 object put "drift-media-assets/collections/models/${m}" --file="${localPath}" --remote --content-type="image/jpeg" --cache-control="public, max-age=31536000, immutable"`,
      { stdio: 'inherit' }
    );
    console.log(`Uploaded ${m} to R2`);
  } catch (err) {
    console.error(`Failed ${m}:`, err);
  }
}
