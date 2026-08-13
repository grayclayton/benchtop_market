import React from 'react';
import { useMarket } from '../context/MarketContext';
import { 
  TrendingUp, 
  DollarSign, 
  Award, 
  CheckCircle2, 
  ArrowUpRight, 
  PlusCircle, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';

export default function BettorDashboard() {
  const { userState, startups, setSelectedStartupId, setActiveTab, topUpBalance } = useMarket();

  const totalPositionsCount = userState.positions ? userState.positions.length : 0;
  const totalInvestedUsd = userState.positions 
    ? userState.positions.reduce((sum, p) => sum + p.investedUsd, 0)
    : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header Banner */}
      <div className="glass-panel" style={{ 
        padding: '28px', 
        borderRadius: 'var(--radius-lg)', 
        background: 'linear-gradient(135deg, #FFFFFF 0%, #ECFDF5 100%)', 
        border: '1px solid rgba(5, 150, 105, 0.25)', 
        boxShadow: '0 4px 20px rgba(5, 150, 105, 0.06)' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--gradient-yes)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)' }}>
              <TrendingUp size={26} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#0F172A' }}>
                  Bettor & Domain Expert Workspace
                </h1>
                <span className="badge badge-emerald">Predictor Portal</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Track your active prediction holdings, trade history, and claim payouts on verified lab milestones.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => topUpBalance(5000)}
              className="btn btn-primary"
              style={{ padding: '10px 18px', fontSize: '0.85rem', background: 'var(--gradient-yes)' }}
            >
              <PlusCircle size={16} /> Add $5,000 Paper Funds
            </button>
            
            <button
              onClick={() => setActiveTab('BETTING')}
              className="btn btn-secondary"
              style={{ padding: '10px 16px', fontSize: '0.85rem' }}
            >
              Explore Markets →
            </button>
          </div>

        </div>

        {/* Telemetry Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #E2E8F0' }}>
          
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-sm)', padding: '14px' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', display: 'block' }}>Available Balance</span>
            <div style={{ fontSize: '1.3rem', fontWeight: '900', color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>
              ${userState.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Liquid Trading Balance</span>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-sm)', padding: '14px' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', display: 'block' }}>Active Positions</span>
            <div style={{ fontSize: '1.3rem', fontWeight: '900', color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)' }}>
              {totalPositionsCount} Holdings
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Invested: ${totalInvestedUsd.toFixed(2)} USD</span>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-sm)', padding: '14px' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', display: 'block' }}>Historical Win Rate</span>
            <div style={{ fontSize: '1.3rem', fontWeight: '900', color: 'var(--accent-purple)', fontFamily: 'var(--font-mono)' }}>
              88.4%
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Domain Reputation Score: High</span>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-sm)', padding: '14px' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', display: 'block' }}>Lab Escrow Contribution</span>
            <div style={{ fontSize: '1.3rem', fontWeight: '900', color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>
              ${(totalInvestedUsd * 0.025).toFixed(2)} USD
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>2.5% Direct Testing Cut</span>
          </div>

        </div>
      </div>

      {/* Active Holdings Section */}
      <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)', padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', marginBottom: '16px' }}>
          My Active Prediction Holdings ({totalPositionsCount})
        </h3>

        {(!userState.positions || userState.positions.length === 0) ? (
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)', padding: '32px', textAlign: 'center' }}>
            <TrendingUp size={32} color="var(--accent-blue)" style={{ marginBottom: '12px' }} />
            <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#0F172A', marginBottom: '6px' }}>
              No Active Prediction Positions Yet
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 16px auto' }}>
              Explore deep tech startup markets to place your first YES/NO prediction trade and earn payouts when lab benchmarks pass.
            </p>
            <button
              onClick={() => setActiveTab('BETTING')}
              className="btn btn-primary"
              style={{ padding: '10px 20px', fontSize: '0.85rem' }}
            >
              Browse Prediction Markets →
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {userState.positions.map((pos, idx) => {
              const startup = startups.find(s => s.id === pos.startupId) || startups[0];
              const currentPrice = pos.outcome === 'YES' ? startup.market.yesPrice : startup.market.noPrice;
              const currentValue = pos.shares * currentPrice;
              const profitLoss = currentValue - pos.investedUsd;

              return (
                <div key={idx} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: startup.logoBg, color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.78rem' }}>
                      {startup.ticker.substring(0, 2)}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0F172A' }}>{startup.name}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{startup.milestone.title}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <div>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block', fontWeight: '600' }}>OUTCOME</span>
                      <span className={`badge ${pos.outcome === 'YES' ? 'badge-emerald' : 'badge-crimson'}`}>
                        {pos.outcome} ({pos.shares.toFixed(1)} Shares)
                      </span>
                    </div>

                    <div>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block', fontWeight: '600' }}>INVESTED</span>
                      <span style={{ fontSize: '0.9rem', fontWeight: '800', fontFamily: 'var(--font-mono)', color: '#0F172A' }}>
                        ${pos.investedUsd.toFixed(2)}
                      </span>
                    </div>

                    <div>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block', fontWeight: '600' }}>UNREALIZED P&L</span>
                      <span style={{ fontSize: '0.9rem', fontWeight: '800', fontFamily: 'var(--font-mono)', color: profitLoss >= 0 ? 'var(--accent-emerald)' : 'var(--accent-crimson)' }}>
                        {profitLoss >= 0 ? '+' : ''}${profitLoss.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => { setSelectedStartupId(startup.id); setActiveTab('BETTING'); }}
                      className="btn btn-secondary"
                      style={{ fontSize: '0.75rem', padding: '6px 12px' }}
                    >
                      Trade →
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
