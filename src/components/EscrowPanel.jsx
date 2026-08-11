import React, { useState } from 'react';
import { useMarket } from '../context/MarketContext';
import { Award, ShieldCheck, DollarSign, PlusCircle, CheckCircle2, Lock, Landmark, UserCheck } from 'lucide-react';

export default function EscrowPanel() {
  const { activeStartup, addSponsorMatch } = useMarket();

  const [sponsorName, setSponsorName] = useState('');
  const [matchAmount, setMatchAmount] = useState('1000');
  const [matchSuccess, setMatchSuccess] = useState(false);

  if (!activeStartup) return null;

  const lab = activeStartup.testingLab;
  const escrowPercent = Math.min(100, Math.round((lab.escrowCollected / lab.escrowTarget) * 100));

  const handleAddSponsor = (e) => {
    e.preventDefault();
    if (!matchAmount || parseFloat(matchAmount) <= 0) return;
    addSponsorMatch(activeStartup.id, sponsorName, matchAmount);
    setMatchSuccess(true);
    setSponsorName('');
    setTimeout(() => setMatchSuccess(false), 4000);
  };

  return (
    <div className="glass-panel" style={{ padding: '28px', marginBottom: '28px', background: '#FFFFFF', borderColor: '#E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
      
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(5, 150, 105, 0.1)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Landmark size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A' }}>
              Startup Testing Fund
            </h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              Sponsor grants and trading escrow fund startup bench testing.
            </p>
          </div>
        </div>

        <span className="badge badge-emerald">
          <ShieldCheck size={14} /> Sponsor + Trade Funded
        </span>
      </div>

      {/* Grid: Lab Info & Progress (Left) + Sponsor Matching Widget (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '28px', alignItems: 'start' }}>
        
        {/* Left Column: Escrow Meter & Accredited Lab Details */}
        <div>
          
          {/* Progress Bar Container */}
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)', padding: '20px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                TESTING FUND PROGRESS (SPONSORS + TRADING ESCROW)
              </span>
              <span style={{ fontSize: '1.2rem', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)' }}>
                ${lab.escrowCollected.toLocaleString()} / ${lab.escrowTarget.toLocaleString()} ({escrowPercent}%)
              </span>
            </div>

            <div style={{ width: '100%', height: '12px', background: '#E2E8F0', borderRadius: '6px', overflow: 'hidden', marginBottom: '14px' }}>
              <div style={{ width: `${escrowPercent}%`, height: '100%', background: 'var(--gradient-yes)', transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }} />
            </div>

            {/* Escrow Release Protocol Stages */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.8rem' }}>
              
              {/* Stage 1 */}
              <div style={{ background: 'rgba(5, 150, 105, 0.08)', border: '1px solid rgba(5, 150, 105, 0.25)', borderRadius: '8px', padding: '10px 12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-emerald)', fontWeight: '700', marginBottom: '4px' }}>
                  <CheckCircle2 size={14} /> Stage 1: Sponsor Matching (Primary)
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Investors and industry sponsors contribute directly to fund startup testing.
                </p>
              </div>

              {/* Stage 2 */}
              <div style={{ background: lab.finalReleased ? 'rgba(5, 150, 105, 0.08)' : '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '10px 12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: lab.finalReleased ? 'var(--accent-emerald)' : 'var(--text-muted)', fontWeight: '700', marginBottom: '4px' }}>
                  {lab.finalReleased ? <CheckCircle2 size={14} /> : <Lock size={14} />} Stage 2: Trading Escrow (2.5% Supplement)
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Every trade adds 2.5% to the testing fund automatically.
                </p>
              </div>

            </div>
          </div>

          {/* Accredited Lab Details Card */}
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)', padding: '18px' }}>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px', fontWeight: '700' }}>
              Accredited Facility Details
            </h4>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontWeight: '800' }}>
                <Award size={24} />
              </div>
              <div>
                <h5 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0F172A' }}>{lab.name}</h5>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: '600' }}>{lab.accreditation}</span>
              </div>
            </div>

            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              Location: <strong style={{ color: '#0F172A' }}>{lab.location}</strong>
            </p>
          </div>

        </div>

        {/* Right Column: Investor / Sponsor Matching Grant Widget */}
        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)', padding: '22px' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', color: '#0F172A' }}>
            <UserCheck size={18} color="var(--accent-blue)" /> Investor & Industry Sponsor Grants
          </h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '18px', lineHeight: 1.4 }}>
            Investors and industry sponsors contribute directly to fund startup bench testing. This is the primary funding mechanism.
          </p>

          {/* Existing Sponsors List */}
          {lab.matchingSponsors.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px', fontWeight: '600' }}>
                ACTIVE MATCHING SPONSORS
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {lab.matchingSponsors.map((sp, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '6px 10px', borderRadius: '6px' }}>
                    <span style={{ color: '#0F172A', fontWeight: '600' }}>{sp.name}</span>
                    <span style={{ color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)', fontWeight: '700' }}>+${sp.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form to Add Matching Grant */}
          <form onSubmit={handleAddSponsor}>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Sponsor / VC Name</label>
              <input
                type="text"
                placeholder="e.g. Founders Fund Lab Grant"
                value={sponsorName}
                onChange={(e) => setSponsorName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  background: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  color: '#0F172A',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Grant Match Amount (USD)</label>
              <input
                type="number"
                min="100"
                step="100"
                value={matchAmount}
                onChange={(e) => setMatchAmount(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  background: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  color: '#0F172A',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: '700',
                  outline: 'none'
                }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '10px', fontSize: '0.85rem' }}>
              <PlusCircle size={16} /> Contribute Matching Escrow
            </button>
          </form>

          {matchSuccess && (
            <div style={{ marginTop: '10px', padding: '8px 12px', background: 'rgba(5, 150, 105, 0.1)', border: '1px solid rgba(5, 150, 105, 0.3)', borderRadius: '6px', color: 'var(--accent-emerald)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={14} /> Matching grant added to lab escrow!
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
