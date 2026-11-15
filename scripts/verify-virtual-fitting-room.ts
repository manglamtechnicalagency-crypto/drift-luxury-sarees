/**
 * Verification script for Milestone 2: Interactive Model Virtual Fitting Room
 * Validates store actions, model image assets, 5 drapes, 48 sarees, colorways, and modal contracts.
 */
import fs from 'fs';
import path from 'path';
import { useStore } from '../src/store/useStore';
import { ALL_SAREES } from '../src/data/collections/registry';
import { DRAPE_MODELS } from '../src/components/fitting-room/VirtualFittingRoom';
import { DrapeStyleId, TextileMotif } from '../src/data/collections/types';
import { getSareeColorways } from '../src/data/collections/colorways';

function runVerification() {
  console.log('==============================================================================');
  console.log('DRIFT LUXURY SAREE STOREFRONT');
  console.log('Milestone 2: Interactive Model Virtual Fitting Room Verification');
  console.log('==============================================================================');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition: boolean, testName: string) {
    totalTests++;
    if (condition) {
      console.log(`  ✓ ${testName}`);
      passedTests++;
    } else {
      console.error(`  ✗ FAIL: ${testName}`);
      process.exitCode = 1;
    }
  }

  // 1. Photographic Base & Fallback Assets on Disk
  console.log('\n[Suite 1] Verifying 5 Model Photographic Base & Fallback Assets on Disk...');
  const drapes: DrapeStyleId[] = ['nivi', 'seedha-pallu', 'nauvari-kashta', 'atpoure', 'modern-cocktail'];
  for (const drape of drapes) {
    const meta = DRAPE_MODELS[drape];
    assert(Boolean(meta), `DRAPE_MODELS contains definition for "${drape}"`);

    // Primary model image assertion
    const localImagePath = path.join(process.cwd(), 'public', meta.image);
    const imageExists = fs.existsSync(localImagePath);
    const imageStat = imageExists ? fs.statSync(localImagePath) : null;
    assert(imageExists && (imageStat?.size || 0) > 0, `Model primary asset exists and is non-empty (${meta.image}, ${imageStat?.size} bytes)`);

    // Fallback image assertion
    const localFallbackPath = path.join(process.cwd(), 'public', meta.fallbackImage);
    const fallbackExists = fs.existsSync(localFallbackPath);
    const fallbackStat = fallbackExists ? fs.statSync(localFallbackPath) : null;
    assert(fallbackExists && (fallbackStat?.size || 0) > 0, `Model fallback asset exists and is non-empty (${meta.fallbackImage}, ${fallbackStat?.size} bytes)`);
  }

  // 2. Zustand Store Fitting Room State & Action Contract
  console.log('\n[Suite 2] Verifying Zustand Store State & Actions...');
  const state = useStore.getState();

  assert(state.fittingRoomSaree !== null, 'Initial fittingRoomSaree is initialized');
  assert(state.fittingRoomDrape === 'nivi', 'Initial fittingRoomDrape defaults to "nivi"');
  assert(state.fittingRoomColorwayIndex === 0, 'Initial fittingRoomColorwayIndex defaults to 0');
  assert(state.fittingRoomLighting === 'chandelier', 'Initial fittingRoomLighting defaults to "chandelier"');

  // Test setFittingRoomDrape
  useStore.getState().setFittingRoomDrape('seedha-pallu');
  assert(useStore.getState().fittingRoomDrape === 'seedha-pallu', 'setFittingRoomDrape updates to "seedha-pallu"');

  // Test setFittingRoomLighting
  useStore.getState().setFittingRoomLighting('candlelight');
  assert(useStore.getState().fittingRoomLighting === 'candlelight', 'setFittingRoomLighting updates to "candlelight"');

  // Test setFittingRoomMotif
  useStore.getState().setFittingRoomMotif('waves');
  assert(useStore.getState().fittingRoomMotif === 'waves', 'setFittingRoomMotif updates to "waves"');

  // Test setFittingRoomColorway
  useStore.getState().setFittingRoomColorway(2);
  assert(useStore.getState().fittingRoomColorwayIndex === 2, 'setFittingRoomColorway updates to 2');

  // Test setFittingRoomSaree
  const targetSaree = ALL_SAREES[12]; // Kanchipuram or Gujarati
  useStore.getState().setFittingRoomSaree(targetSaree);
  const updatedState = useStore.getState();
  assert(updatedState.fittingRoomSaree?.id === targetSaree.id, `setFittingRoomSaree updates active saree to ${targetSaree.name}`);
  assert(updatedState.fittingRoomColorwayIndex === 0, 'setFittingRoomSaree resets colorway index to 0');

  // Test openFittingRoom action
  const weddingSaree = ALL_SAREES[24];
  useStore.getState().openFittingRoom(weddingSaree, 'nauvari-kashta');
  const openedState = useStore.getState();
  assert(openedState.activeModal === 'fitting-room', 'openFittingRoom opens "fitting-room" modal');
  assert(openedState.fittingRoomSaree?.id === weddingSaree.id, `openFittingRoom sets saree to ${weddingSaree.name}`);
  assert(openedState.fittingRoomDrape === 'nauvari-kashta', 'openFittingRoom sets drape to "nauvari-kashta"');

  // Reset modal
  useStore.getState().setActiveModal('none');
  assert(useStore.getState().activeModal === 'none', 'Modal cleanly resets to "none"');

  // 3. Catalog 48 Sarees Fitting Compatibility
  console.log('\n[Suite 3] Verifying All 48 Catalog Sarees Fitting Compatibility...');
  let validSarees = 0;
  for (const saree of ALL_SAREES) {
    const cws = getSareeColorways(saree);
    const hasColorways = cws.length >= 3;
    const hasDrapes = (saree.supportedDrapes?.length || 0) >= 1;
    const has4Tone = cws.every((cw) => cw.palette.length === 4 && cw.pairing && cw.pairing.body && cw.pairing.border && cw.pairing.pallu && cw.pairing.zari);
    if (hasColorways && hasDrapes && has4Tone) {
      validSarees++;
    }
  }
  assert(validSarees === ALL_SAREES.length, `All ${ALL_SAREES.length} catalog sarees have complete colorways, 4-tone pairings, and supported drapes`);

  console.log('\n==============================================================================');
  console.log(`TOTAL CHECKS: ${totalTests} | PASSED: ${passedTests} | FAILED: ${totalTests - passedTests}`);
  if (passedTests === totalTests) {
    console.log('✅ ALL FITTING ROOM TESTS PASSED WITH 100% SUCCESS.');
  }
  console.log('==============================================================================');
}

runVerification();
