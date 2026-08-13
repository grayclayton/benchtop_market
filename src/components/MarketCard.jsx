import React from 'react';
import { useMarket } from '../context/MarketContext';
import { ShieldCheck, Award, ArrowRight } from 'lucide-react';

export default function MarketCard({ startup }) {
  const { selectedStartupId, setSelectedStartupId, setInspectingCertificate, setActiveTab } = useMarket();

  const isSelected = selectedStartupId === startup.id;
  const escrowPercent = Math.min(100, Math.round((startup.testingLab.escrowCollected / startup.testingLab.escrowTarget) * 100));

  const yesProbability = Math.round(startup.market.yesPrice * 100);
  const noProbability = Math.round(startup.market.noPrice * 100);

  const handleCardClick = () => {
    setSelectedStartupId(startup.id);
    setActiveTab('BETTING');
  };

  return (
    <div 
      className={`glass-card-interactive ${isSelected ? 'selected' : ''}`}
      onClick={handleCardClick}
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justify: 'space-between',
        background: '#FFFFFF',
        borderColor: isSelected ? 'var(--accent-blue)' : '#E2E8F0',
        boxShadow: isSelected ? '0 0 20px rgba(37, 99, 235, 0.2)' : '0 2px 8px rgba(0,0,0,0.03)'
      }}
    >
      <div>
        {/* Top Header: Logo, Ticker, Category */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: startup.logoBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '0.85rem',
              color: '#FFF',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}>
              {startup.ticker.substring(0, 2)}
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0F172A', lineHeight: 1.2 }}>
                {startup.name}
              </h3>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                ${startup.ticker}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
            <span className="badge badge-cyan">{startup.category}</span>
            {startup.founderVerification && (
              <span className="badge badge-purple" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>
                {startup.founderVerification.verificationBadge || '🛡️ Verified Founder'}
              </span>
            )}
          </div>
        </div>

        {/* Story Headline (if available) */}
        {startup.story && (
          <p style={{ fontSize: '0.8rem', color: 'var(--accent-blue)', fontWeight: '600', marginBottom: '6px' }}>
            {startup.story.subtitle}
          </p>
        )}

        {/* Milestone Title */}
        <h4 style={{ fontSize: '0.925rem', fontWeight: '700', marginBottom: '8px', color: '#0F172A', lineHeight: 1.4 }}>
          {startup.milestone.title}
        </h4>

        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {startup.story ? startup.story.problem : startup.milestone.description}
        </p>

        {/* Accredited Lab Badge */}
        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
            <Award size={15} color="var(--accent-emerald)" flexShrink={0} />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {startup.testingLab.name}
            </span>
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)', fontWeight: '700', flexShrink: 0 }}>
            {startup.testingLab.intakeReleased ? 'Protocol Locked' : 'Pending'}
          </span>
        </div>

        {/* Lab Escrow Progress Meter (2.5% trade fee accumulation) */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem', marginBottom: '4px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Lab Funding Escrow (2.5% Cut)</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: 'var(--accent-emerald)' }}>
              ${startup.testingLab.escrowCollected.toLocaleString()} / ${startup.testingLab.escrowTarget.toLocaleString()} ({escrowPercent}%)
            </span>
          </div>
          <div style={{ width: '100%', height: '6px', background: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${escrowPercent}%`, height: '100%', background: 'var(--gradient-yes)', transition: 'width 0.5s ease' }} />
          </div>
        </div>

        {/* YES / NO Probability Split Bar */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: '700', marginBottom: '6px' }}>
            <span style={{ color: 'var(--yes-color)' }}>YES ${startup.market.yesPrice.toFixed(2)} ({yesProbability}%)</span>
            <span style={{ color: 'var(--no-color)' }}>NO ${startup.market.noPrice.toFixed(2)} ({noProbability}%)</span>
          </div>
          <div style={{ display: 'flex', height: '10px', borderRadius: '5px', overflow: 'hidden', gap: '2px' }}>
            <div style={{ width: `${yesProbability}%`, background: 'var(--gradient-yes)', transition: 'width 0.4s ease' }} />
            <div style={{ width: `${noProbability}%`, background: 'var(--gradient-no)', transition: 'width 0.4s ease' }} />
          </div>
        </div>
      </div>

      {/* Card Footer: Volume & Actions */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Vol: <strong style={{ color: '#0F172A', fontFamily: 'var(--font-mono)' }}>${startup.market.totalVolume.toLocaleString()}</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button 
              onClick={(e) => { e.stopPropagation(); setInspectingCertificate(startup); }}
              className="btn btn-secondary" 
              style={{ fontSize: '0.725rem', padding: '5px 9px' }}
            >
              <ShieldCheck size={13} color="var(--accent-blue)" /> Certificate
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); handleCardClick(); }}
              className="btn btn-primary" 
              style={{ fontSize: '0.725rem', padding: '5px 10px' }}
            >
              Trade <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
