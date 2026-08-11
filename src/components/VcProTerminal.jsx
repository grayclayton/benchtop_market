import React from 'react';
import { useMarket } from '../context/MarketContext';
import { Briefcase, Star, Mail } from 'lucide-react';

export default function VcProTerminal() {
  const { startups, setSelectedStartupId, setIsVcPro } = useMarket();

  return (
    <div className="glass-panel" style={{ padding: '28px', marginBottom: '28px', background: '#FFFFFF', border: '1px solid rgba(124, 58, 237, 0.3)', boxShadow: '0 4px 20px rgba(124, 58, 237, 0.08)' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '46px', height: '46px', borderRadius: '14px', background: 'linear-gradient(135deg, #7C3AED 0%, #2563EB 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
            <Briefcase size={26} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0F172A' }}>
                Investor Pro Intelligence Terminal
              </h2>
              <span className="badge badge-purple">Core Product</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              The core product. Live crowd-belief scores, lab-verified milestones, and startup due diligence — powered by real prediction trading.
            </p>
          </div>
        </div>

        <button onClick={() => setIsVcPro(false)} className="btn btn-secondary" style={{ fontSize: '0.8rem' }}>
          Exit Investor Terminal
        </button>
      </div>

      {/* Value Proposition & Subscription Tiers */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        
        {/* Investor Pro Tier */}
        <div style={{ background: '#FFFFFF', border: '2px solid rgba(37, 99, 235, 0.3)', borderRadius: 'var(--radius-md)', padding: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--accent-blue)' }}>Investor Pro</span>
            <span style={{ fontSize: '1.1rem', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)' }}>$399/mo</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--accent-emerald)', fontWeight: '700' }}>✓</span>
              <span>Live crowd-belief scores from real trading</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--accent-emerald)', fontWeight: '700' }}>✓</span>
              <span>Lab-verified milestone gate telemetry</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--accent-emerald)', fontWeight: '700' }}>✓</span>
              <span>Deal flow alerts & founder intros</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--accent-emerald)', fontWeight: '700' }}>✓</span>
              <span>Anti-fraud collateral & oracle tracking</span>
            </div>
          </div>
        </div>

        {/* Institutional API Tier */}
        <div style={{ background: '#FFFFFF', border: '2px solid rgba(124, 58, 237, 0.3)', borderRadius: 'var(--radius-md)', padding: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--accent-purple)' }}>Institutional API</span>
            <span style={{ fontSize: '1.1rem', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--accent-purple)' }}>$799/mo</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--accent-emerald)', fontWeight: '700' }}>✓</span>
              <span>Everything in Investor Pro</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--accent-emerald)', fontWeight: '700' }}>✓</span>
              <span>Raw telemetry API & bulk data export</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--accent-emerald)', fontWeight: '700' }}>✓</span>
              <span>Custom milestone alerts & watchlists</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--accent-emerald)', fontWeight: '700' }}>✓</span>
              <span>Priority sponsor matching placement</span>
            </div>
          </div>
        </div>

      </div>

      {/* Grid of VC Deal Flow Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
        {startups.map(startup => {
          const yesProb = Math.round(startup.market.yesPrice * 100);
          const vc = startup.investorIntel || startup.vcIntel || {
            score: 90,
            riskRating: 'MEDIUM',
            leadInvestor: 'Stealth Angels',
            founderStakedCollateral: 2500,
            sentimentIndex: 75,
            tags: ['Early Milestone']
          };

          return (
            <div key={startup.id} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)', padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              
              <div>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: startup.logoBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontWeight: '800', fontSize: '0.75rem' }}>
                      {startup.ticker.substring(0, 2)}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#0F172A' }}>{startup.name}</h3>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{startup.category}</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-amber)', fontSize: '0.9rem', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>
                      <Star size={14} fill="var(--accent-amber)" /> {vc.score}/100
                    </div>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>TECH SCORE</span>
                  </div>
                </div>

                {/* Milestone Summary */}
                {startup.story && (
                  <p style={{ fontSize: '0.82rem', color: 'var(--accent-blue)', fontWeight: '600', marginBottom: '6px', lineHeight: 1.3 }}>
                    {startup.story.headline} — {startup.story.subtitle}
                  </p>
                )}
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: 1.4 }}>
                  <strong style={{ color: '#0F172A' }}>Milestone:</strong> {startup.milestone.title}
                </p>

                {/* Telemetry Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px', fontSize: '0.75rem' }}>
                  <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '8px', borderRadius: '6px' }}>
                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>CROWD BELIEF</span>
                    <strong style={{ color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>{yesProb}% Bullish</strong>
                  </div>
                  <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '8px', borderRadius: '6px' }}>
                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>RISK RATING</span>
                    <strong style={{ color: 'var(--accent-purple)', fontSize: '0.85rem' }}>{vc.riskRating}</strong>
                  </div>
                  <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '8px', borderRadius: '6px' }}>
                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>LEAD INVESTOR</span>
                    <strong style={{ color: '#0F172A' }}>{vc.leadInvestor}</strong>
                  </div>
                  <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '8px', borderRadius: '6px' }}>
                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>FOUNDER STAKE</span>
                    <strong style={{ color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>${vc.founderStakedCollateral} Staked</strong>
                  </div>
                </div>

                {/* Founder & Team Dossier (VC Pro Exclusive) */}
                {vc.team && (
                  <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '10px 12px', marginBottom: '14px', fontSize: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontWeight: '700', color: '#0F172A' }}>👤 {vc.team.founder} ({vc.team.role})</span>
                      <span style={{ fontSize: '0.68rem', color: 'var(--accent-blue)', fontWeight: '600' }}>{vc.team.teamSize}</span>
                    </div>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '8px', lineHeight: 1.3 }}>
                      {vc.team.bio}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '0.7rem', borderTop: '1px solid #E2E8F0', paddingTop: '6px' }}>
                      <div><strong style={{ color: 'var(--accent-purple)' }}>📜 Patents:</strong> {vc.team.patentsFiled.join(', ')}</div>
                      <div><strong style={{ color: 'var(--accent-emerald)' }}>💰 Open Round:</strong> {vc.team.openRound}</div>
                    </div>
                  </div>
                )}

                {/* Deal Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {vc.tags.map((tag, i) => (
                    <span key={i} style={{ fontSize: '0.68rem', padding: '3px 8px', background: 'rgba(124, 58, 237, 0.1)', border: '1px solid rgba(124, 58, 237, 0.25)', borderRadius: '4px', color: 'var(--accent-purple)', fontWeight: '600' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px', paddingTop: '12px', borderTop: '1px solid #E2E8F0' }}>
                <button
                  onClick={() => { setSelectedStartupId(startup.id); setIsVcPro(false); }}
                  className="btn btn-secondary"
                  style={{ flex: 1, fontSize: '0.75rem', padding: '6px' }}
                >
                  View Market
                </button>
                <button
                  onClick={() => alert(`Direct Founder Message Channel initialized for ${vc.team?.founder || startup.name} (${vc.team?.founderEmail || 'contact@startup.com'}). Sending VC inquiry...`)}
                  className="btn btn-primary"
                  style={{ flex: 1, fontSize: '0.75rem', padding: '6px', background: 'var(--gradient-brand)' }}
                >
                  <Mail size={13} /> Message Founder
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
