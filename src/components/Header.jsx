import React from 'react';
import { useMarket } from '../context/MarketContext';
import { ShieldCheck, TrendingUp, FlaskConical, DollarSign, PlusCircle, RotateCcw, Briefcase } from 'lucide-react';

export default function Header() {
  const { 
    userState, 
    platformStats, 
    isVcPro, 
    setIsVcPro, 
    setIsCreateModalOpen,
    resetDemoState 
  } = useMarket();

  return (
    <header className="glass-panel" style={{ borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0, padding: '16px 24px', position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255, 255, 255, 0.95)', borderBottom: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Brand Logo & Tagline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)' }}>
            <FlaskConical size={24} strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.5px', color: '#0F172A' }}>
                BENCHTOP
              </h1>
              <span className="badge badge-cyan">MARKET</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Deep Tech Due Diligence & Testing Fund Protocol
            </p>
          </div>
        </div>

        {/* Live Protocol Telemetry Counter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', background: '#F8FAFC', padding: '8px 16px', borderRadius: 'var(--radius-full)', border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={16} color="var(--accent-blue)" />
            <div>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block', fontWeight: '600' }}>24H TRADING VOLUME</span>
              <span style={{ fontSize: '0.875rem', fontWeight: '800', fontFamily: 'var(--font-mono)', color: '#0F172A' }}>
                ${platformStats.totalTradingVolume.toLocaleString()}
              </span>
            </div>
          </div>
          <div style={{ width: '1px', height: '24px', background: '#E2E8F0' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FlaskConical size={16} color="var(--accent-emerald)" />
            <div>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block', fontWeight: '600' }}>STARTUP TESTING FUND (2.5% + SPONSORS)</span>
              <span style={{ fontSize: '0.875rem', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)' }}>
                ${platformStats.testingFundTotal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Right Actions: User Wallet, VC Pro Switch & Launch Modal */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          {/* User Wallet Balance */}
          <div style={{ background: 'rgba(5, 150, 105, 0.08)', border: '1px solid rgba(5, 150, 105, 0.25)', borderRadius: 'var(--radius-sm)', padding: '6px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DollarSign size={16} color="var(--accent-emerald)" />
            <div>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block', fontWeight: '600' }}>PORTFOLIO BALANCE</span>
              <span style={{ fontSize: '0.9rem', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)' }}>
                ${userState.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* VC Pro Toggle */}
          <button 
            onClick={() => setIsVcPro(!isVcPro)}
            className={`btn ${isVcPro ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.8rem', padding: '8px 12px' }}
            title="Toggle Institutional VC Intelligence View"
          >
            <Briefcase size={15} />
            {isVcPro ? 'VC Pro Active' : 'VC Terminal'}
          </button>

          {/* Startup Launch Button */}
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="btn btn-primary"
            style={{ fontSize: '0.8rem', padding: '8px 14px' }}
          >
            <PlusCircle size={16} />
            List Startup ($0)
          </button>

          {/* Reset Demo State Button */}
          <button 
            onClick={resetDemoState}
            className="btn btn-secondary"
            style={{ padding: '8px', color: 'var(--text-muted)' }}
            title="Reset Demo Simulation State"
          >
            <RotateCcw size={15} />
          </button>
        </div>

      </div>
    </header>
  );
}
