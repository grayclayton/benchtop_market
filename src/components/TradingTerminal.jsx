import React, { useState } from 'react';
import { useMarket } from '../context/MarketContext';
import OddsChart from './OddsChart';
import { TrendingUp, ShieldCheck, DollarSign, Award, AlertCircle, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function TradingTerminal() {
  const { activeStartup, userState, executeTrade, setInspectingCertificate, setIsVcPro } = useMarket();
  
  const [selectedOutcome, setSelectedOutcome] = useState('YES');
  const [tradeAmount, setTradeAmount] = useState('100');
  const [tradeFeedback, setTradeFeedback] = useState(null);

  const [activeLeftView, setActiveLeftView] = useState('CHART'); // 'CHART' or 'ORDERBOOK'

  if (!activeStartup) return null;

  const currentPrice = selectedOutcome === 'YES' ? activeStartup.market.yesPrice : activeStartup.market.noPrice;
  const numAmount = parseFloat(tradeAmount) || 0;
  
  // Math calculations according to economics model
  const labEscrowCut = numAmount * 0.025;
  const platformCut = numAmount * 0.005;
  const netTradePool = numAmount * 0.97;
  const sharesBought = currentPrice > 0 ? (netTradePool / currentPrice) : 0;
  const potentialPayout = sharesBought * 1.00;
  const potentialProfit = potentialPayout - numAmount;
  const returnPercentage = numAmount > 0 ? Math.round((potentialProfit / numAmount) * 100) : 0;

  const handleTrade = (e) => {
    e.preventDefault();
    setTradeFeedback(null);
    const res = executeTrade(activeStartup.id, selectedOutcome, tradeAmount);
    setTradeFeedback(res);
    setTimeout(() => setTradeFeedback(null), 4000);
  };

  // Find user's active positions in this startup
  const userPositions = userState.positions.filter(p => p.startupId === activeStartup.id);

  return (
    <div className="glass-panel" style={{ padding: '28px', marginBottom: '28px', background: '#FFFFFF', borderColor: '#E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
      
      {/* Top Banner: Startup Info */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '16px',
            background: activeStartup.logoBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '800',
            fontSize: '1.2rem',
            color: '#FFF',
            boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
          }}>
            {activeStartup.ticker.substring(0, 2)}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0F172A' }}>
                {activeStartup.name}
              </h2>
              <span className="badge badge-cyan">${activeStartup.ticker}</span>
              <span className="badge badge-purple">{activeStartup.category}</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              {activeStartup.story ? `${activeStartup.story.headline} — ` : ''}{activeStartup.tagline}
            </p>
          </div>
        </div>

        <button 
          onClick={() => setInspectingCertificate(activeStartup)}
          className="btn btn-secondary"
          style={{ fontSize: '0.825rem' }}
        >
          <ShieldCheck size={16} color="var(--accent-blue)" />
          Inspect Test Certificate & IPFS Hash
        </button>
      </div>

      {/* Grid: Odds Chart (Left) + Trade Order Entry (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '28px', alignItems: 'start' }}>
        
        {/* Left Column: Probability History Chart & Milestone Details */}
        <div>
          {/* Sub-Tabs: Chart vs Orderbook */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
            <button
              onClick={() => setActiveLeftView('CHART')}
              className={`btn ${activeLeftView === 'CHART' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.78rem', padding: '6px 14px', borderRadius: '6px' }}
            >
              📈 Probability Chart
            </button>
            <button
              onClick={() => setActiveLeftView('ORDERBOOK')}
              className={`btn ${activeLeftView === 'ORDERBOOK' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.78rem', padding: '6px 14px', borderRadius: '6px' }}
            >
              📊 LMSR AMM Depth & Orderbook
            </button>
          </div>

          {activeLeftView === 'CHART' ? (
            <OddsChart 
              history={activeStartup.market.history} 
              yesPrice={activeStartup.market.yesPrice}
              noPrice={activeStartup.market.noPrice}
            />
          ) : (
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)', padding: '20px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0F172A' }}>
                  LMSR Liquidity Depth & Orderbook (b = 2,500)
                </h4>
                <span className="badge badge-cyan">Automated Market Maker</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px', fontSize: '0.78rem' }}>
                <div style={{ background: '#ECFDF5', border: '1px solid rgba(5, 150, 105, 0.25)', padding: '10px', borderRadius: '8px' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>YES BID / ASK SPREAD</span>
                  <strong style={{ color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)', fontSize: '0.95rem' }}>
                    Bid: ${(activeStartup.market.yesPrice - 0.01).toFixed(2)} | Ask: ${activeStartup.market.yesPrice.toFixed(2)}
                  </strong>
                </div>

                <div style={{ background: '#FFF1F2', border: '1px solid rgba(225, 29, 72, 0.25)', padding: '10px', borderRadius: '8px' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>NO BID / ASK SPREAD</span>
                  <strong style={{ color: 'var(--accent-crimson)', fontFamily: 'var(--font-mono)', fontSize: '0.95rem' }}>
                    Bid: ${(activeStartup.market.noPrice - 0.01).toFixed(2)} | Ask: ${activeStartup.market.noPrice.toFixed(2)}
                  </strong>
                </div>
              </div>

              {/* Depth Visualizer */}
              <div style={{ fontSize: '0.75rem' }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Liquidity Pool Depth (b = 2,500)</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--yes-color)', fontWeight: '700', marginBottom: '2px' }}>
                      <span>YES Reserve Depth</span>
                      <span>${(activeStartup.market.totalVolume * 0.78).toLocaleString()} USD</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '78%', height: '100%', background: 'var(--gradient-yes)' }} />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--no-color)', fontWeight: '700', marginBottom: '2px' }}>
                      <span>NO Reserve Depth</span>
                      <span>${(activeStartup.market.totalVolume * 0.22).toLocaleString()} USD</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '22%', height: '100%', background: 'var(--gradient-no)' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Startup Story */}
          {activeStartup.story && (
            <div style={{ marginTop: '20px', background: 'linear-gradient(135deg, #F0F9FF 0%, #F5F3FF 100%)', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)', padding: '20px', position: 'relative', overflow: 'hidden' }}>
              {/* Decorative accent */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--gradient-brand)' }} />
              
              <div style={{ paddingLeft: '12px' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0F172A', marginBottom: '4px', letterSpacing: '-0.3px' }}>
                  {activeStartup.story.headline}
                </h3>
                <p style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--accent-blue)', marginBottom: '14px' }}>
                  {activeStartup.story.subtitle}
                </p>
                
                <div style={{ marginBottom: '14px' }}>
                  <h4 style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>The Problem</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {activeStartup.story.problem}
                  </p>
                </div>
                
                <div style={{ marginBottom: '14px' }}>
                  <h4 style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>The Solution</h4>
                  <p style={{ fontSize: '0.85rem', color: '#0F172A', lineHeight: 1.6, fontWeight: '500' }}>
                    {activeStartup.story.solution}
                  </p>
                </div>

                {/* Key Stats Row */}
                {activeStartup.story.keyStats && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginTop: '16px' }}>
                    {activeStartup.story.keyStats.map((stat, idx) => (
                      <div key={idx} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '10px 12px', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600', marginBottom: '4px' }}>{stat.label}</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)' }}>{stat.value}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Milestone Target & Verification Protocol Card */}
          <div style={{ marginTop: '20px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)', padding: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)' }}>
                Prediction Milestone & Test Protocol
              </h4>
              <span className="badge badge-emerald">Simple Trader View</span>
            </div>
            
            <p style={{ fontSize: '1rem', fontWeight: '800', color: '#0F172A', marginBottom: '6px' }}>
              {activeStartup.milestone.title}
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '14px' }}>
              {activeStartup.milestone.traderSummary || activeStartup.milestone.description}
            </p>

            {/* Quick Status Pill Highlights */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
              <div style={{ padding: '6px 12px', background: 'rgba(5, 150, 105, 0.1)', border: '1px solid rgba(5, 150, 105, 0.25)', borderRadius: '8px', color: 'var(--accent-emerald)', fontSize: '0.78rem', fontWeight: '700' }}>
                ✓ All 7 Lab Gates Passed
              </div>
              <div style={{ padding: '6px 12px', background: 'rgba(37, 99, 235, 0.1)', border: '1px solid rgba(37, 99, 235, 0.25)', borderRadius: '8px', color: 'var(--accent-blue)', fontSize: '0.78rem', fontWeight: '700' }}>
                ✓ Seawater Purity Verified
              </div>
              <div style={{ padding: '6px 12px', background: 'rgba(124, 58, 237, 0.1)', border: '1px solid rgba(124, 58, 237, 0.25)', borderRadius: '8px', color: 'var(--accent-purple)', fontSize: '0.78rem', fontWeight: '700' }}>
                ✓ Zero Toxic Chlorine (Safe)
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', fontSize: '0.8rem', marginBottom: '16px' }}>
              <div style={{ background: '#FFFFFF', padding: '8px 12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>TARGET METRIC</span>
                <strong style={{ color: 'var(--accent-blue)' }}>{activeStartup.milestone.targetMetric}</strong>
              </div>
              <div style={{ background: '#FFFFFF', padding: '8px 12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>ACCREDITED LAB</span>
                <strong style={{ color: 'var(--accent-emerald)' }}>{activeStartup.testingLab.name}</strong>
              </div>
              <div style={{ background: '#FFFFFF', padding: '8px 12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>DEADLINE</span>
                <strong style={{ color: 'var(--accent-amber)' }}>{activeStartup.milestone.deadline}</strong>
              </div>
            </div>

            {/* Investor Pro Teaser Banner */}
            <div style={{ background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.06) 0%, rgba(37, 99, 235, 0.06) 100%)', border: '1px solid rgba(124, 58, 237, 0.25)', borderRadius: '8px', padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--accent-purple)', display: 'block' }}>
                  Need raw electrochemistry telemetry?
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Detailed ion selectivity (1.77M×), Faradaic efficiency data, and ICP-OES lab certificates are available on the Investor Pro Terminal.
                </span>
              </div>
              <button onClick={() => setIsVcPro(true)} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                Investor Pro View →
              </button>
            </div>

          </div>
        </div>

        {/* Right Column: Interactive Prediction Trading Terminal */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)', padding: '22px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#0F172A' }}>
            <TrendingUp size={18} color="var(--accent-blue)" /> Buy Prediction Shares
          </h3>

          {/* Signal Contribution Note */}
          <div style={{ background: 'rgba(37, 99, 235, 0.06)', border: '1px solid rgba(37, 99, 235, 0.2)', borderRadius: '8px', padding: '10px 14px', marginBottom: '14px', fontSize: '0.78rem', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={14} />
            <span>Your trade contributes to the <strong>crowd belief score</strong> and funds testing.</span>
          </div>

          {/* YES / NO Outcome Toggle */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '18px' }}>
            <button
              onClick={() => setSelectedOutcome('YES')}
              className={`btn ${selectedOutcome === 'YES' ? 'btn-yes' : 'btn-secondary'}`}
              style={{ padding: '14px', flexDirection: 'column', gap: '2px' }}
            >
              <span style={{ fontSize: '0.75rem', opacity: 0.9 }}>PREDICT</span>
              <strong style={{ fontSize: '1.1rem' }}>YES ${activeStartup.market.yesPrice.toFixed(2)}</strong>
              <span style={{ fontSize: '0.75rem' }}>{Math.round(activeStartup.market.yesPrice * 100)}% Probability</span>
            </button>

            <button
              onClick={() => setSelectedOutcome('NO')}
              className={`btn ${selectedOutcome === 'NO' ? 'btn-no' : 'btn-secondary'}`}
              style={{ padding: '14px', flexDirection: 'column', gap: '2px' }}
            >
              <span style={{ fontSize: '0.75rem', opacity: 0.9 }}>PREDICT</span>
              <strong style={{ fontSize: '1.1rem' }}>NO ${activeStartup.market.noPrice.toFixed(2)}</strong>
              <span style={{ fontSize: '0.75rem' }}>{Math.round(activeStartup.market.noPrice * 100)}% Probability</span>
            </button>
          </div>

          <form onSubmit={handleTrade}>
            {/* Amount Input */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                <span>Trade Amount (USD)</span>
                <span>Available: <strong style={{ color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>${userState.balance.toFixed(2)}</strong></span>
              </div>

              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontWeight: '700' }}>$</span>
                <input
                  type="number"
                  min="5"
                  max={userState.balance}
                  value={tradeAmount}
                  onChange={(e) => setTradeAmount(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 30px',
                    background: '#F8FAFC',
                    border: '1px solid #CBD5E1',
                    borderRadius: '8px',
                    color: '#0F172A',
                    fontSize: '1.1rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: '700',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Quick Amount Buttons */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '18px' }}>
              {['50', '100', '250', '500', '1000'].map(preset => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setTradeAmount(preset)}
                  className="btn btn-secondary"
                  style={{ flex: 1, padding: '6px 0', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}
                >
                  ${preset}
                </button>
              ))}
            </div>

            {/* Fee Split & Payout Calculation Box */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '14px', marginBottom: '18px', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Estimated Shares:</span>
                <strong style={{ fontFamily: 'var(--font-mono)', color: '#0F172A' }}>{sharesBought.toFixed(2)} Shares</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Payout if {selectedOutcome} Wins:</span>
                <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)' }}>
                  ${potentialPayout.toFixed(2)} (+{returnPercentage}%)
                </strong>
              </div>

              {/* Protocol Fee Routing Highlight */}
              <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.725rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-emerald)', fontWeight: '600' }}>
                  <span>✓ 2.5% → Startup Testing Fund:</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>+${labEscrowCut.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>✓ 0.5% Platform Protocol Fee:</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>+${platformCut.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Trade Action Button */}
            <button
              type="submit"
              className={`btn ${selectedOutcome === 'YES' ? 'btn-yes' : 'btn-no'}`}
              style={{ width: '100%', padding: '14px', fontSize: '1rem', fontWeight: '800' }}
            >
              Confirm Buy {selectedOutcome} Shares (${numAmount})
            </button>
          </form>

          {/* Trade Feedback Alert */}
          {tradeFeedback && (
            <div style={{
              marginTop: '12px',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '0.825rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: tradeFeedback.success ? 'rgba(5, 150, 105, 0.1)' : 'rgba(225, 29, 72, 0.1)',
              border: `1px solid ${tradeFeedback.success ? 'rgba(5, 150, 105, 0.3)' : 'rgba(225, 29, 72, 0.3)'}`,
              color: tradeFeedback.success ? 'var(--accent-emerald)' : 'var(--accent-rose)'
            }}>
              {tradeFeedback.success ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              {tradeFeedback.message}
            </div>
          )}

          {/* User Active Positions in this startup */}
          {userPositions.length > 0 && (
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #E2E8F0' }}>
              <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                Your Position in {activeStartup.ticker}
              </h4>
              {userPositions.map((pos, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F8FAFC', padding: '8px 12px', borderRadius: '6px', fontSize: '0.8rem', border: '1px solid #E2E8F0' }}>
                  <span style={{ fontWeight: '700', color: pos.outcome === 'YES' ? 'var(--yes-color)' : 'var(--no-color)' }}>
                    {pos.outcome} ({pos.shares.toFixed(1)} Shares)
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: '#0F172A', fontWeight: '600' }}>
                    Invested: ${pos.investedUsd.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
