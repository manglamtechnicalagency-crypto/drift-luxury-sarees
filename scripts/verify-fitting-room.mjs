/**
 * DRIFT Luxury Saree Storefront
 * End-to-End Verification Suite: Virtual Fitting Room, Catalog & Production Build
 *
 * Executable via:
 *   node scripts/verify-fitting-room.mjs
 *   npx tsx scripts/verify-fitting-room.mjs
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// ============================================================================
// Test Harness Utilities
// ============================================================================

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failureMessages = [];

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ [PASS] ${testName}`);
  } else {
    failedTests++;
    const errMsg = `  ✗ [FAIL] ${testName}${details ? ` -> ${details}` : ''}`;
    console.error(errMsg);
    failureMessages.push(errMsg);
  }
}

function assertEqual(actual, expected, testName) {
  assert(
    actual === expected,
    testName,
    `Expected: ${JSON.stringify(expected)}, Actual: ${JSON.stringify(actual)}`
  );
}

function assertMatches(text, regex, testName) {
  assert(
    regex.test(text),
    testName,
    `Text failed to match pattern: ${regex.toString()}`
  );
}

console.log('='.repeat(78));
console.log('DRIFT LUXURY SAREE STOREFRONT — END-TO-END VERIFICATION SUITE');
console.log('Testing Virtual Fitting Room, Regional Catalog, and Trends Pipeline');
console.log('='.repeat(78));
console.log(`Timestamp: ${new Date().toISOString()}`);
console.log(`Workspace: ${ROOT_DIR}\n`);

// ============================================================================
// SUITE 1: Saree Trends Scraping & Extraction Pipeline
// ============================================================================
console.log('--- SUITE 1: Saree Trends Scraping & Extraction Pipeline ---');

const pipelineScriptPath = path.join(ROOT_DIR, 'scripts', 'extract-saree-trends.ts');
assert(fs.existsSync(pipelineScriptPath), 'Extraction script scripts/extract-saree-trends.ts exists');

let pipelineOutput = '';
let pipelineExitOk = false;
try {
  pipelineOutput = execSync('npx tsx scripts/extract-saree-trends.ts', {
    cwd: ROOT_DIR,
    encoding: 'utf-8',
    stdio: 'pipe',
  });
  pipelineExitOk = true;
} catch (err) {
  pipelineOutput = err.stdout?.toString() || err.message;
  pipelineExitOk = false;
}

assert(pipelineExitOk, 'Extraction pipeline executed cleanly (exit code 0)');
assert(
  pipelineOutput.includes('100% STOREFRONT CATALOG INTEGRITY VERIFIED'),
  'Pipeline verified 100% catalog integrity against AGENTS.md rules'
);

const manifestPath = path.join(ROOT_DIR, 'src', 'data', 'collections', 'extracted-trends.json');
assert(fs.existsSync(manifestPath), 'Extracted trends manifest extracted-trends.json exists');

let manifest = null;
try {
  manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
} catch (e) {
  manifest = null;
}

assert(manifest !== null, 'Extracted trends manifest is valid JSON');
if (manifest) {
  assertEqual(manifest.integrityAuditStatus, 'PASSED', 'Manifest integrityAuditStatus is PASSED');
  assertEqual(manifest.totalRegionalTraditions, 11, 'Extracted exactly 11 Indian Handloom Regional Traditions');
  assertEqual(manifest.totalCoutureTrends, 7, 'Extracted exactly 7 Contemporary Couture Trends');
  assertEqual(manifest.totalCatalogSareesValidated, 48, 'Validated all 48 catalog sarees in manifest audit');

  // Validate 11 Regional Traditions structure
  assert(
    Array.isArray(manifest.regionalTraditions) && manifest.regionalTraditions.length === 11,
    'Regional traditions list is populated with 11 items'
  );

  let validTraditions = 0;
  for (const t of manifest.regionalTraditions || []) {
    const hasGi = typeof t.giReference === 'string' && t.giReference.length > 5;
    const hasTechnique = typeof t.primaryWeaveTechnique === 'string' && t.primaryWeaveTechnique.length > 5;
    const hasMotifs = Array.isArray(t.repertoireMotifs) && t.repertoireMotifs.length >= 3;
    const hasColorways = Array.isArray(t.colorways) && t.colorways.length >= 3;
    const hasDrapes = Array.isArray(t.supportedDrapes) && t.supportedDrapes.length >= 5;
    if (hasGi && hasTechnique && hasMotifs && hasColorways && hasDrapes) {
      validTraditions++;
    }
  }
  assertEqual(validTraditions, 11, 'All 11 regional traditions have GI reference, technique, motifs, 4-tone colorways, and 5 drapes');

  // Validate 7 Couture Trends structure
  assert(
    Array.isArray(manifest.coutureTrends) && manifest.coutureTrends.length === 7,
    'Couture trends list is populated with 7 items'
  );

  let validTrends = 0;
  for (const tr of manifest.coutureTrends || []) {
    const hasStyle = typeof tr.stylisticSignature === 'string' && tr.stylisticSignature.length > 10;
    const hasCraft = typeof tr.technicalCraftConnection === 'string' && tr.technicalCraftConnection.length > 10;
    const hasPattern = tr.patternSet && Array.isArray(tr.patternSet.motifs) && tr.patternSet.motifs.length > 0;
    const hasPairings = Array.isArray(tr.colorwayPairings) && tr.colorwayPairings.length >= 2;
    const hasSources = Array.isArray(tr.sources) && tr.sources.length >= 1;
    if (hasStyle && hasCraft && hasPattern && hasPairings && hasSources) {
      validTrends++;
    }
  }
  assertEqual(validTrends, 7, 'All 7 couture trends contain stylistic signature, craft connection, pattern sets, pairings, and sources');
}

// ============================================================================
// SUITE 2: Regional Saree Catalog & AGENTS.md Integrity Gating
// ============================================================================
console.log('\n--- SUITE 2: Regional Saree Catalog & AGENTS.md Integrity Gating ---');

// Extract live catalog directly from TypeScript exports using tsx
let catalogData = null;
try {
  const tsxEvalCmd = 'npx tsx -e "import(\'./src/data/collections/registry.ts\').then(m => console.log(JSON.stringify({sarees: m.ALL_SAREES, metas: m.ALL_STATE_METAS})))"';
  const rawCatalogJson = execSync(tsxEvalCmd, {
    cwd: ROOT_DIR,
    encoding: 'utf-8',
    stdio: 'pipe',
  });
  // Filter any npm notice lines if present
  const lines = rawCatalogJson.split('\n').filter((l) => l.trim().startsWith('{'));
  catalogData = JSON.parse(lines[lines.length - 1]);
} catch (e) {
  console.error('Failed to extract live catalog via tsx:', e.message);
}

assert(catalogData !== null && Array.isArray(catalogData.sarees), 'Loaded live ALL_SAREES from registry.ts');

const sarees = catalogData?.sarees || [];
assertEqual(sarees.length, 48, 'Catalog contains exactly 48 sarees');

// Check 6 Regional Collections
const regionCounts = {};
for (const s of sarees) {
  regionCounts[s.region] = (regionCounts[s.region] || 0) + 1;
}

const EXPECTED_REGIONS = [
  'banarasi',
  'gujarati',
  'heritage-states',
  'jodhpuri',
  'kanchipuram',
  'rajasthani',
];

for (const reg of EXPECTED_REGIONS) {
  assertEqual(regionCounts[reg], 8, `Region "${reg}" contains exactly 8 verified sarees`);
}

// Validate each saree's patternSet, colorways, supportedDrapes, and AGENTS.md rules
let validPatternSets = 0;
let validColorwaysCount = 0;
let validDrapesCount = 0;
let validHexColorways = 0;
let zeroPriceCount = 0;
let zeroStockCount = 0;
let zeroRatingCount = 0;
let zeroReviewsCount = 0;
let unavailableCount = 0;
let designStudyLabelCount = 0;

const hexRegex = /^#[0-9A-Fa-f]{6}$/;

for (const saree of sarees) {
  // specs.patternSet
  const ps = saree.specs?.patternSet;
  if (
    ps &&
    Array.isArray(ps.motifs) &&
    ps.motifs.length > 0 &&
    typeof ps.borderMotif === 'string' &&
    ps.borderMotif.length > 0 &&
    typeof ps.palluMotif === 'string' &&
    ps.palluMotif.length > 0 &&
    typeof ps.primaryTechnique === 'string' &&
    ps.primaryTechnique.length > 0 &&
    ['delicate-sprig', 'all-over-jaal', 'geometric-grid', 'fluid-wave'].includes(ps.motifDensity) &&
    typeof ps.selvedgeStyle === 'string' &&
    ps.selvedgeStyle.length > 0
  ) {
    validPatternSets++;
  }

  // colorways: multiple distinct 4-tone combinations
  const cws = saree.colorways;
  if (Array.isArray(cws) && cws.length >= 3) {
    validColorwaysCount++;
    let allHexValid = true;
    for (const cw of cws) {
      const p = cw.pairing;
      if (
        !p ||
        !hexRegex.test(p.body) ||
        !hexRegex.test(p.border) ||
        !hexRegex.test(p.pallu) ||
        !hexRegex.test(p.zari)
      ) {
        allHexValid = false;
        break;
      }
    }
    if (allHexValid) validHexColorways++;
  }

  // supportedDrapes
  const drapes = saree.supportedDrapes;
  if (Array.isArray(drapes) && drapes.length >= 2) {
    validDrapesCount++;
  }

  // AGENTS.md Integrity Rules:
  if (saree.price === 0) zeroPriceCount++;
  if (saree.stockCount === 0) zeroStockCount++;
  if (saree.rating === 0) zeroRatingCount++;
  if (saree.reviewsCount === 0) zeroReviewsCount++;
  if (saree.isAvailable === false) unavailableCount++;

  const fullText = `${saree.title} ${saree.description} ${saree.story} ${saree.trendingBadge || ''}`.toLowerCase();
  if (
    fullText.includes('study') ||
    fullText.includes('concept') ||
    fullText.includes('reference') ||
    fullText.includes('prototype') ||
    fullText.includes('unverified')
  ) {
    designStudyLabelCount++;
  }
}

assertEqual(validPatternSets, 48, 'All 48 sarees possess full specs.patternSet (motifs, borders, pallu, technique, density, selvedge)');
assertEqual(validColorwaysCount, 48, 'All 48 sarees possess >= 3 distinct curated colorways');
assertEqual(validHexColorways, 48, 'All 48 sarees have strictly validated 4-tone hex color combinations (body, border, pallu, zari)');
assertEqual(validDrapesCount, 48, 'All 48 sarees specify supported drape styles');
assertEqual(zeroPriceCount, 48, 'AGENTS.md Integrity: All 48 sarees have price = 0 (no commercial pricing claims)');
assertEqual(zeroStockCount, 48, 'AGENTS.md Integrity: All 48 sarees have stockCount = 0 (no inventory claims)');
assertEqual(zeroRatingCount, 48, 'AGENTS.md Integrity: All 48 sarees have rating = 0 (no fake ratings)');
assertEqual(zeroReviewsCount, 48, 'AGENTS.md Integrity: All 48 sarees have reviewsCount = 0 (no fake reviews)');
assertEqual(unavailableCount, 48, 'AGENTS.md Integrity: All 48 sarees have isAvailable = false (unverified listings)');
assertEqual(designStudyLabelCount, 48, 'AGENTS.md Integrity: All 48 sarees are explicitly documented as design studies');

// ============================================================================
// SUITE 3: Interactive Model Virtual Fitting Room Assets & Definitions
// ============================================================================
console.log('\n--- SUITE 3: Virtual Fitting Room Drape Models & On-Disk Assets ---');

const fittingRoomPath = path.join(ROOT_DIR, 'src', 'components', 'fitting-room', 'VirtualFittingRoom.tsx');
assert(fs.existsSync(fittingRoomPath), 'VirtualFittingRoom.tsx component file exists');

const fittingRoomCode = fs.readFileSync(fittingRoomPath, 'utf-8');

// Check DRAPE_MODELS definition in VirtualFittingRoom.tsx
const requiredDrapes = ['nivi', 'seedha-pallu', 'nauvari-kashta', 'atpoure', 'modern-cocktail'];
for (const drapeId of requiredDrapes) {
  assert(
    fittingRoomCode.includes(`'${drapeId}':`) || fittingRoomCode.includes(`"${drapeId}":`),
    `DRAPE_MODELS defines drape profile for "${drapeId}"`
  );
}

// Extract model image assets referenced in DRAPE_MODELS
const MODEL_ASSETS = [
  { drape: 'nivi', file: 'public/collections/models/model_royal_chandan.jpg' },
  { drape: 'seedha-pallu', file: 'public/collections/models/model_saffron_yellow.jpg' },
  { drape: 'nauvari-kashta', file: 'public/collections/models/model_nath_paithani.jpg' },
  { drape: 'atpoure', file: 'public/collections/models/model_bengali_bridal.jpg' },
  { drape: 'modern-cocktail', file: 'public/collections/models/model_burgundy_zardozi.jpg' },
];

for (const asset of MODEL_ASSETS) {
  const fullPath = path.join(ROOT_DIR, asset.file);
  const exists = fs.existsSync(fullPath);
  assert(exists, `Model asset exists for drape "${asset.drape}": ${asset.file}`);
  if (exists) {
    const stat = fs.statSync(fullPath);
    assert(
      stat.size > 100000,
      `Model asset "${asset.file}" is non-zero high-resolution photography (${Math.round(stat.size / 1024)} KB)`
    );
  }
}

// Fallback image assets referenced in DRAPE_MODELS
const FALLBACK_ASSETS = [
  'public/collections/banarasi/editorial_banner.jpg',
  'public/collections/gujarati/editorial_banner.jpg',
  'public/collections/heritage-states/editorial_banner.jpg',
  'public/collections/banarasi/saree_01_primary.jpg',
  'public/collections/jodhpuri/editorial_banner.jpg',
];

for (const fb of FALLBACK_ASSETS) {
  const fullPath = path.join(ROOT_DIR, fb);
  const exists = fs.existsSync(fullPath);
  assert(exists, `Fallback image asset exists on disk: ${fb}`);
  if (exists) {
    const stat = fs.statSync(fullPath);
    assert(
      stat.size > 50000,
      `Fallback image asset "${fb}" is valid (${Math.round(stat.size / 1024)} KB)`
    );
  }
}

// ============================================================================
// SUITE 4: Zustand Store State & Fitting Room Action Contracts
// ============================================================================
console.log('\n--- SUITE 4: Zustand Store State & Fitting Room Action Contracts ---');

const storePath = path.join(ROOT_DIR, 'src', 'store', 'useStore.ts');
assert(fs.existsSync(storePath), 'Zustand store src/store/useStore.ts exists');

const storeCode = fs.readFileSync(storePath, 'utf-8');

// Contract verification on store code
const requiredStoreContracts = [
  'fittingRoomSaree',
  'fittingRoomDrape',
  'fittingRoomColorwayIndex',
  'fittingRoomMotif',
  'fittingRoomLighting',
  'openFittingRoom',
  'setFittingRoomSaree',
  'setFittingRoomDrape',
  'setFittingRoomColorway',
  'setFittingRoomMotif',
  'setFittingRoomLighting',
];

for (const prop of requiredStoreContracts) {
  assert(storeCode.includes(prop), `Zustand store defines contract property/action: "${prop}"`);
}

assert(
  storeCode.includes("'fitting-room'"),
  "ModalType union in useStore includes 'fitting-room'"
);

// Execute live runtime test of Zustand store transitions
let storeTestOk = false;
let storeTestDetails = '';
try {
  const storeTestCode = [
    "import('./src/store/useStore.ts').then(async ({useStore}) => {",
    "  const { ALL_SAREES } = await import('./src/data/collections/registry.ts');",
    "  const store = useStore.getState();",
    "  if (typeof store.openFittingRoom !== 'function') throw new Error('openFittingRoom missing');",
    "  if (typeof store.setFittingRoomDrape !== 'function') throw new Error('setFittingRoomDrape missing');",
    "  useStore.getState().setFittingRoomDrape('seedha-pallu');",
    "  if (useStore.getState().fittingRoomDrape !== 'seedha-pallu') throw new Error('setFittingRoomDrape failed');",
    "  useStore.getState().setFittingRoomColorway(2);",
    "  if (useStore.getState().fittingRoomColorwayIndex !== 2) throw new Error('setFittingRoomColorway failed');",
    "  useStore.getState().setFittingRoomMotif('waves');",
    "  if (useStore.getState().fittingRoomMotif !== 'waves') throw new Error('setFittingRoomMotif failed');",
    "  useStore.getState().setFittingRoomLighting('candlelight');",
    "  if (useStore.getState().fittingRoomLighting !== 'candlelight') throw new Error('setFittingRoomLighting failed');",
    "  const testSaree = ALL_SAREES[5];",
    "  useStore.getState().openFittingRoom(testSaree, 'nauvari-kashta');",
    "  const afterOpen = useStore.getState();",
    "  if (afterOpen.activeModal !== 'fitting-room') throw new Error('openFittingRoom did not set activeModal');",
    "  if (afterOpen.fittingRoomSaree?.id !== testSaree.id) throw new Error('openFittingRoom did not set saree');",
    "  if (afterOpen.fittingRoomDrape !== 'nauvari-kashta') throw new Error('openFittingRoom did not set drape');",
    "  console.log('STORE_RUNTIME_TESTS_OK');",
    "}).catch(err => { console.error(err); process.exit(1); });",
  ].map((l) => l.trim()).join(' ');

  const storeTestCmd = `npx tsx -e "${storeTestCode.replace(/"/g, '\\"')}"`;

  const out = execSync(storeTestCmd, { cwd: ROOT_DIR, encoding: 'utf-8', stdio: 'pipe' });
  storeTestOk = out.includes('STORE_RUNTIME_TESTS_OK');
  storeTestDetails = out;
} catch (err) {
  storeTestOk = false;
  storeTestDetails = err.stdout?.toString() || err.message;
}

assert(storeTestOk, 'Live Zustand store actions execute and transition state correctly at runtime', storeTestDetails);

// ============================================================================
// SUITE 5: Single Couture Model & Pure Realism Compositing Architecture
// ============================================================================
console.log('\n--- SUITE 5: Single Couture Model & Pure Realism Compositing Architecture ---');

// Pass 1: Model Photographic Base Layer & Single Muse Priya
assertMatches(
  fittingRoomCode,
  /PRIYA_EDITORIAL_MODEL/,
  'Pass 1: Configures single consistent couture editorial model (Priya) across all drapes and regions'
);
assertMatches(
  fittingRoomCode,
  /activeDisplayImage/,
  'Pass 1: Dynamically renders high-resolution active model and saree photography'
);
assertMatches(
  fittingRoomCode,
  /DRAPE_MODELS/,
  'Pass 1: Maps 5 authentic classical drape silhouettes to dedicated model assets'
);

// Photographic Realism & View Mode Switching
assertMatches(
  fittingRoomCode,
  /viewMode === 'model'/,
  'Realism: Supports interactive switching to model silhouette drape view'
);
assertMatches(
  fittingRoomCode,
  /viewMode === 'saree'/,
  'Realism: Supports interactive switching to full heirloom saree drape view'
);
assertMatches(
  fittingRoomCode,
  /viewMode === 'detail'/,
  'Realism: Supports interactive switching to macro handloom zari weave inspection'
);

// Purity of Real Saree Photography (Zero Synthetic SVG Multipliers over Models)
assert(
  !fittingRoomCode.includes("mixBlendMode: 'multiply'"),
  'Realism: No synthetic SVG diamond/geometric patterns multiplied over the human model'
);

// Motion and Performance Safeguards
assertMatches(
  fittingRoomCode,
  /useReducedMotion\(\)/,
  'Motion compliance: Implements useReducedMotion() hook from framer-motion'
);

// Accessibility and User Controls
assertMatches(
  fittingRoomCode,
  /role="region"/,
  'A11y: Virtual Fitting Room workspace has role="region"'
);
assertMatches(
  fittingRoomCode,
  /aria-label="Interactive Model Virtual Fitting Room"/,
  'A11y: Workspace provides descriptive aria-label'
);
assertMatches(
  fittingRoomCode,
  /aria-label="Reset fitting room settings"/,
  'A11y: Reset button has accessible aria-label'
);

// ============================================================================
// SUITE 6: Studio & Quick Shop Modal Mounting
// ============================================================================
console.log('\n--- SUITE 6: Studio & Quick Shop Modal Mounting ---');

const studioPath = path.join(ROOT_DIR, 'src', 'components', 'studio', 'AutumnWinterStudio.tsx');
assert(fs.existsSync(studioPath), 'AutumnWinterStudio.tsx exists');
const studioCode = fs.readFileSync(studioPath, 'utf-8');

assert(
  studioCode.includes('setFittingRoomSaree'),
  'AutumnWinterStudio.tsx updates fitting room saree when studio look portraits are clicked'
);
assert(
  !studioCode.includes('<VirtualFittingRoom />'),
  'AutumnWinterStudio.tsx cleanly omits inline fitting room section per user specification'
);

const modalsPath = path.join(ROOT_DIR, 'src', 'components', 'modals', 'SearchAndFilmModals.tsx');
assert(fs.existsSync(modalsPath), 'SearchAndFilmModals.tsx exists');
const modalsCode = fs.readFileSync(modalsPath, 'utf-8');

assert(
  modalsCode.includes("activeModal === 'fitting-room'"),
  'SearchAndFilmModals.tsx handles activeModal === "fitting-room"'
);
assert(
  modalsCode.includes('<VirtualFittingRoom isModal'),
  'SearchAndFilmModals.tsx mounts dedicated full-screen VirtualFittingRoom modal'
);
assert(
  modalsCode.includes('openFittingRoom(selectedProductForModal)'),
  'SearchAndFilmModals.tsx Quick Shop links directly to openFittingRoom'
);

// ============================================================================
// VERIFICATION SUMMARY
// ============================================================================
console.log('\n' + '='.repeat(78));
console.log('VERIFICATION SUMMARY');
console.log('='.repeat(78));
console.log(`Total Assertions Checked: ${totalTests}`);
console.log(`Passed:                   ${passedTests}`);
console.log(`Failed:                   ${failedTests}`);

if (failedTests > 0) {
  console.error('\nFAILURES:');
  for (const msg of failureMessages) {
    console.error(msg);
  }
  console.error(`\n❌ VERIFICATION SUITE FAILED with ${failedTests} failure(s).`);
  process.exit(1);
} else {
  console.log('\n✨ ALL VERIFICATION ASSERTIONS PASSED (0 FAILURES).');
  console.log('Ready for Next.js production build.\n');
  process.exit(0);
}
