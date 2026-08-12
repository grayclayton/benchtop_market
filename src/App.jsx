import React from 'react';
import { MarketProvider, useMarket } from './context/MarketContext';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import CategoryFilter from './components/CategoryFilter';
import MarketCard from './components/MarketCard';
import TradingTerminal from './components/TradingTerminal';
import EscrowPanel from './components/EscrowPanel';
import HomePage from './components/HomePage';
import VcProTerminal from './components/VcProTerminal';
import OracleInspectorModal from './components/OracleInspectorModal';
import CreateCampaignModal from './components/CreateCampaignModal';
import { FlaskConical, ShieldCheck, TrendingUp, Award, Layers } from 'lucide-react';

function MainAppContent() {
  const { startups, activeCategory, activeTab } = useMarket();

  // Filter startups by category
  const filteredStartups = startups.filter(s => {
    if (activeCategory === 'ALL') return true;
    return s.category === activeCategory;
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Header */}
      <Header />

      {/* Main Body */}
      <main style={{ flex: 1, maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '24px' }}>
        
        {activeTab === 'HOME' && <HomePage />}

        {activeTab === 'INVESTOR' && <VcProTerminal />}

        {activeTab === 'BETTING' && (
          <>
            {/* Hero Explainer Banner */}
            <HeroBanner />

            {/* Main Interactive Trading Terminal for Active Startup */}
            <TradingTerminal />

            {/* Direct Grant Lab Escrow Transparency Panel */}
            <EscrowPanel />

            {/* Category Filter Pills */}
            <div style={{ marginTop: '36px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0F172A' }}>
                  Featured Deep Tech Milestone Markets
                </h3>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                  Explore active milestone campaigns, probability odds, and direct lab funding progress.
                </p>
              </div>
            </div>

            <CategoryFilter />

            {/* Startup Directory Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px', marginBottom: '40px' }}>
              {filteredStartups.map(startup => (
                <MarketCard key={startup.id} startup={startup} />
              ))}
            </div>
          </>
        )}

      </main>

      {/* Global Modals */}
      <OracleInspectorModal />
      <CreateCampaignModal />

      {/* Footer */}
      <footer className="glass-panel" style={{ borderRadius: 0, borderBottom: 0, borderLeft: 0, borderRight: 0, padding: '24px', marginTop: 'auto', textAlign: 'center', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FlaskConical size={18} color="var(--accent-cyan)" />
            <span style={{ color: '#FFF', fontWeight: '700' }}>Benchtop Market Protocol</span>
            <span>— Investor-Only Freemium Engine</span>
          </div>

          <div style={{ display: 'flex', gap: '20px', fontSize: '0.78rem' }}>
            <span>97.0% Winner Pool</span>
            <span>2.5% Startup Testing Fund</span>
            <span>0.5% Protocol Fee</span>
            <span>IPFS Oracle Resolution</span>
          </div>

          <div>
            Built with React, Vite & Modern Web Standards
          </div>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <MarketProvider>
      <MainAppContent />
    </MarketProvider>
  );
}
