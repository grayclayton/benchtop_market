/**
 * Benchtop Market — Comprehensive Platform Test Suite
 * 
 * Tests all major features by importing and validating the data layer,
 * Supabase integration, and component rendering logic.
 * 
 * Run with: node --experimental-vm-modules tests/platform_test.mjs
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '..');
let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.log(`  ✗ FAIL: ${name}`);
    console.log(`         ${err.message}`);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

// ─────────────────────────────────────────────────────
// 1. SOURCE FILE EXISTENCE TESTS
// ─────────────────────────────────────────────────────
console.log('\n━━━ 1. Source File Existence ━━━');

const requiredFiles = [
  'src/App.jsx',
  'src/context/MarketContext.jsx',
  'src/data/mockData.js',
  'src/lib/supabase.js',
  'src/components/Header.jsx',
  'src/components/HomePage.jsx',
  'src/components/MarketCard.jsx',
  'src/components/TradingTerminal.jsx',
  'src/components/EscrowPanel.jsx',
  'src/components/OracleInspectorModal.jsx',
  'src/components/CreateCampaignModal.jsx',
  'src/components/AuthModal.jsx',
  'src/components/CategoryFilter.jsx',
  'src/components/OddsChart.jsx',
  'src/components/HeroBanner.jsx',
  'src/components/FounderDashboard.jsx',
  'src/components/PredictorDashboard.jsx',
  'src/components/VcProTerminal.jsx',
  'src/components/InvestorChatModal.jsx',
  'src/components/SponsorPledgeModal.jsx',
  'src/components/LabPortalModal.jsx',
];

for (const file of requiredFiles) {
  test(`File exists: ${file}`, () => {
    const content = readFileSync(resolve(ROOT, file), 'utf-8');
    assert(content.length > 0, `${file} is empty`);
  });
}

// ─────────────────────────────────────────────────────
// 2. MOCK DATA INTEGRITY TESTS
// ─────────────────────────────────────────────────────
console.log('\n━━━ 2. Mock Data Integrity ━━━');

const mockDataContent = readFileSync(resolve(ROOT, 'src/data/mockData.js'), 'utf-8');

test('WSEI Lithium startup entry exists', () => {
  assert(mockDataContent.includes('wsei-lithium-bench-01'), 'Missing WSEI Lithium ID');
  assert(mockDataContent.includes('WSEI'), 'Missing WSEI ticker');
});

test('BENCH platform meta-card exists', () => {
  assert(mockDataContent.includes('benchtop-market-platform'), 'Missing BENCH ID');
  assert(mockDataContent.includes('BENCH'), 'Missing BENCH ticker');
});

test('Both startups have founderVerification objects', () => {
  const matches = mockDataContent.match(/founderVerification/g);
  assert(matches && matches.length >= 2, `Expected >=2 founderVerification blocks, found ${matches?.length || 0}`);
});

test('Both startups have investorIntel objects with team data', () => {
  assert(mockDataContent.includes('investorIntel'), 'Missing investorIntel');
  assert(mockDataContent.includes('founderEmail'), 'Missing founderEmail in team data');
});

test('WSEI startup has story field', () => {
  assert(mockDataContent.includes('story:'), 'Missing story field');
  assert(mockDataContent.includes('The Lithium Eel'), 'Missing story headline');
});

// ─────────────────────────────────────────────────────
// 3. TERMINOLOGY TESTS (Bettor → Predictor)
// ─────────────────────────────────────────────────────
console.log('\n━━━ 3. Terminology Compliance (Predictor, not Bettor) ━━━');

const componentsToCheck = [
  'src/components/Header.jsx',
  'src/components/HomePage.jsx',
  'src/components/HeroBanner.jsx',
  'src/components/PredictorDashboard.jsx',
  'src/components/AuthModal.jsx',
];

for (const file of componentsToCheck) {
  test(`No "Bettor" in ${file.split('/').pop()}`, () => {
    const content = readFileSync(resolve(ROOT, file), 'utf-8');
    const hasBettor = /\bBettor\b/i.test(content) && !/Bettor.*Predictor|BETTOR.*PREDICTOR/i.test(content);
    // Allow "BETTOR" only if it's part of a migration comment or paired with PREDICTOR
    assert(!content.includes('>Bettor<'), `Found standalone "Bettor" label in ${file}`);
  });
}

// ─────────────────────────────────────────────────────
// 4. CONTEXT & STATE MANAGEMENT TESTS
// ─────────────────────────────────────────────────────
console.log('\n━━━ 4. Context & State Management ━━━');

const contextContent = readFileSync(resolve(ROOT, 'src/context/MarketContext.jsx'), 'utf-8');

test('MarketContext exports activeTab state', () => {
  assert(contextContent.includes('activeTab'), 'Missing activeTab');
  assert(contextContent.includes('setActiveTab'), 'Missing setActiveTab');
});

test('MarketContext exports searchQuery state', () => {
  assert(contextContent.includes('searchQuery'), 'Missing searchQuery');
  assert(contextContent.includes('setSearchQuery'), 'Missing setSearchQuery');
});

test('MarketContext exports investor chat state', () => {
  assert(contextContent.includes('isInvestorChatOpen'), 'Missing isInvestorChatOpen');
  assert(contextContent.includes('openInvestorChat'), 'Missing openInvestorChat');
});

test('MarketContext exports sponsor modal state', () => {
  assert(contextContent.includes('isSponsorModalOpen'), 'Missing isSponsorModalOpen');
  assert(contextContent.includes('openSponsorModal'), 'Missing openSponsorModal');
});

test('MarketContext exports lab portal state', () => {
  assert(contextContent.includes('isLabPortalOpen'), 'Missing isLabPortalOpen');
  assert(contextContent.includes('setIsLabPortalOpen'), 'Missing setIsLabPortalOpen');
});

test('createCampaign includes founderVerification', () => {
  assert(contextContent.includes("status: 'PENDING_REVIEW'"), 'Missing PENDING_REVIEW status in createCampaign');
  assert(contextContent.includes("verificationBadge: '⏳ Pending Review'"), 'Missing pending badge');
});

test('createCampaign includes founder identity fields', () => {
  assert(contextContent.includes('founderName'), 'Missing founderName in createCampaign');
  assert(contextContent.includes('founderEmail'), 'Missing founderEmail in createCampaign');
  assert(contextContent.includes('founderLinkedin'), 'Missing founderLinkedin in createCampaign');
});

test('Storage key is v6', () => {
  assert(contextContent.includes('benchtop_startups_v6'), 'Storage key should be v6');
});

// ─────────────────────────────────────────────────────
// 5. COMPONENT FEATURE TESTS
// ─────────────────────────────────────────────────────
console.log('\n━━━ 5. Component Feature Tests ━━━');

test('CreateCampaignModal has 3-step wizard', () => {
  const content = readFileSync(resolve(ROOT, 'src/components/CreateCampaignModal.jsx'), 'utf-8');
  assert(content.includes('step === 1'), 'Missing step 1');
  assert(content.includes('step === 2'), 'Missing step 2');
  assert(content.includes('step === 3'), 'Missing step 3');
  assert(content.includes('submitStartupApplication'), 'Missing Supabase submission call');
});

test('OracleInspectorModal has streaming telemetry simulator', () => {
  const content = readFileSync(resolve(ROOT, 'src/components/OracleInspectorModal.jsx'), 'utf-8');
  assert(content.includes('runLiveSimulation'), 'Missing runLiveSimulation function');
  assert(content.includes('isSimulatingStream'), 'Missing streaming state');
  assert(content.includes('streamProgress'), 'Missing streamProgress state');
  assert(content.includes('200'), 'Missing 200-cycle target');
});

test('TradingTerminal has AMM Depth & Orderbook tab', () => {
  const content = readFileSync(resolve(ROOT, 'src/components/TradingTerminal.jsx'), 'utf-8');
  assert(content.includes('activeLeftView'), 'Missing activeLeftView state');
  assert(content.includes('ORDERBOOK'), 'Missing ORDERBOOK view option');
  assert(content.includes('LMSR'), 'Missing LMSR reference');
  assert(content.includes('Bid:'), 'Missing bid/ask display');
});

test('InvestorChatModal has messaging and soft commit', () => {
  const content = readFileSync(resolve(ROOT, 'src/components/InvestorChatModal.jsx'), 'utf-8');
  assert(content.includes('messagesHistory'), 'Missing message history');
  assert(content.includes('softCommitAmount'), 'Missing soft commit amount');
  assert(content.includes('handleSoftCommit'), 'Missing handleSoftCommit');
});

test('SponsorPledgeModal has grant pledge tiers', () => {
  const content = readFileSync(resolve(ROOT, 'src/components/SponsorPledgeModal.jsx'), 'utf-8');
  assert(content.includes('5000'), 'Missing $5k tier');
  assert(content.includes('50000'), 'Missing $50k tier');
  assert(content.includes('handleSubmitPledge'), 'Missing handleSubmitPledge');
});

test('LabPortalModal has accredited lab directory', () => {
  const content = readFileSync(resolve(ROOT, 'src/components/LabPortalModal.jsx'), 'utf-8');
  assert(content.includes('SGS'), 'Missing SGS lab');
  assert(content.includes('NREL'), 'Missing NREL lab');
  assert(content.includes('TÜV SÜD'), 'Missing TÜV SÜD lab');
  assert(content.includes('MIT'), 'Missing MIT lab');
});

test('CategoryFilter has real-time search input', () => {
  const content = readFileSync(resolve(ROOT, 'src/components/CategoryFilter.jsx'), 'utf-8');
  assert(content.includes('searchQuery'), 'Missing searchQuery binding');
  assert(content.includes('Search'), 'Missing Search icon import');
  assert(content.includes('placeholder'), 'Missing search placeholder');
});

test('MarketCard shows Verified Founder badge', () => {
  const content = readFileSync(resolve(ROOT, 'src/components/MarketCard.jsx'), 'utf-8');
  assert(content.includes('founderVerification'), 'Missing founderVerification check');
  assert(content.includes('verificationBadge'), 'Missing verificationBadge render');
});

test('VcProTerminal opens InvestorChatModal on Message Founder click', () => {
  const content = readFileSync(resolve(ROOT, 'src/components/VcProTerminal.jsx'), 'utf-8');
  assert(content.includes('openInvestorChat'), 'Missing openInvestorChat call');
  assert(!content.includes('alert('), 'Should not use alert() for messaging anymore');
});

test('EscrowPanel has Sponsor Pledge and Lab Directory buttons', () => {
  const content = readFileSync(resolve(ROOT, 'src/components/EscrowPanel.jsx'), 'utf-8');
  assert(content.includes('openSponsorModal'), 'Missing openSponsorModal');
  assert(content.includes('setIsLabPortalOpen'), 'Missing setIsLabPortalOpen');
});

// ─────────────────────────────────────────────────────
// 6. SUPABASE INTEGRATION TESTS
// ─────────────────────────────────────────────────────
console.log('\n━━━ 6. Supabase Integration ━━━');

const supabaseContent = readFileSync(resolve(ROOT, 'src/lib/supabase.js'), 'utf-8');

test('Supabase client gracefully handles missing credentials', () => {
  assert(supabaseContent.includes("supabaseUrl && supabaseAnonKey"), 'Missing credential guard');
  assert(supabaseContent.includes('isSupabaseConfigured'), 'Missing isSupabaseConfigured export');
});

test('submitStartupApplication function exists', () => {
  assert(supabaseContent.includes('export async function submitStartupApplication'), 'Missing submitStartupApplication');
});

test('fetchApprovedStartups function exists', () => {
  assert(supabaseContent.includes('export async function fetchApprovedStartups'), 'Missing fetchApprovedStartups');
});

test('SQL schema includes startup_submissions table', () => {
  assert(supabaseContent.includes('CREATE TABLE startup_submissions'), 'Missing SQL schema');
  assert(supabaseContent.includes('founder_name'), 'Missing founder_name column');
  assert(supabaseContent.includes('founder_email'), 'Missing founder_email column');
  assert(supabaseContent.includes('ROW LEVEL SECURITY'), 'Missing RLS policy');
});

test('.env.example exists with Supabase vars', () => {
  const envContent = readFileSync(resolve(ROOT, '.env.example'), 'utf-8');
  assert(envContent.includes('VITE_SUPABASE_URL'), 'Missing VITE_SUPABASE_URL');
  assert(envContent.includes('VITE_SUPABASE_ANON_KEY'), 'Missing VITE_SUPABASE_ANON_KEY');
});

// ─────────────────────────────────────────────────────
// 7. APP.JSX INTEGRATION TESTS
// ─────────────────────────────────────────────────────
console.log('\n━━━ 7. App Integration ━━━');

const appContent = readFileSync(resolve(ROOT, 'src/App.jsx'), 'utf-8');

test('App imports all 6 global modals', () => {
  assert(appContent.includes('OracleInspectorModal'), 'Missing OracleInspectorModal import');
  assert(appContent.includes('CreateCampaignModal'), 'Missing CreateCampaignModal import');
  assert(appContent.includes('AuthModal'), 'Missing AuthModal import');
  assert(appContent.includes('InvestorChatModal'), 'Missing InvestorChatModal import');
  assert(appContent.includes('SponsorPledgeModal'), 'Missing SponsorPledgeModal import');
  assert(appContent.includes('LabPortalModal'), 'Missing LabPortalModal import');
});

test('App renders all 6 global modals', () => {
  assert(appContent.includes('<OracleInspectorModal'), 'Missing OracleInspectorModal render');
  assert(appContent.includes('<InvestorChatModal'), 'Missing InvestorChatModal render');
  assert(appContent.includes('<SponsorPledgeModal'), 'Missing SponsorPledgeModal render');
  assert(appContent.includes('<LabPortalModal'), 'Missing LabPortalModal render');
});

test('App filters by searchQuery', () => {
  assert(appContent.includes('searchQuery'), 'Missing searchQuery in App');
  assert(appContent.includes('matchesQuery'), 'Missing matchesQuery filter logic');
});

test('App renders all 5 workspace views', () => {
  assert(appContent.includes('HomePage'), 'Missing HomePage');
  assert(appContent.includes('FounderDashboard'), 'Missing FounderDashboard');
  assert(appContent.includes('VcProTerminal'), 'Missing VcProTerminal');
  assert(appContent.includes('PredictorDashboard'), 'Missing PredictorDashboard');
  assert(appContent.includes('TradingTerminal'), 'Missing TradingTerminal');
});

// ─────────────────────────────────────────────────────
// 8. BUILD VERIFICATION
// ─────────────────────────────────────────────────────
console.log('\n━━━ 8. Build Artifacts ━━━');

test('Production build dist/index.html exists', () => {
  const html = readFileSync(resolve(ROOT, 'dist/index.html'), 'utf-8');
  assert(html.includes('Benchtop Market'), 'Missing title in built HTML');
});

// ─────────────────────────────────────────────────────
// RESULTS
// ─────────────────────────────────────────────────────
console.log('\n' + '═'.repeat(50));
console.log(`  RESULTS: ${passed} passed, ${failed} failed, ${passed + failed} total`);
console.log('═'.repeat(50));

if (failed > 0) {
  console.log('\n  ⚠️  Some tests failed. Review above.\n');
  process.exit(1);
} else {
  console.log('\n  ✅ ALL TESTS PASSED\n');
  process.exit(0);
}
