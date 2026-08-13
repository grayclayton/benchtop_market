import React, { useState } from 'react';
import { useMarket } from '../context/MarketContext';
import { X, Award, DollarSign, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function SponsorPledgeModal() {
  const { isSponsorModalOpen, setIsSponsorModalOpen, activeStartupForSponsor, addSponsorMatch } = useMarket();

  const [sponsorName, setSponsorName] = useState('Breakthrough Energy Ventures');
  const [pledgeAmount, setPledgeAmount] = useState('10000');
  const [pledgeNotice, setPledgeNotice] = useState(null);

  if (!isSponsorModalOpen || !activeStartupForSponsor) return null;

  const handleSubmitPledge = (e) => {
    e.preventDefault();
    const amount = parseFloat(pledgeAmount);
    if (isNaN(amount) || amount <= 0) return;

    addSponsorMatch(activeStartupForSponsor.id, sponsorName, amount);
    setPledgeNotice(`Grant match of $${amount.toLocaleString()} USD successfully pledged by ${sponsorName}! Added to lab escrow.`);
    setTimeout(() => {
      setPledgeNotice(null);
      setIsSponsorModalOpen(false);
    }, 2500);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsSponsorModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '28px', maxWidth: '540px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(5, 150, 105, 0.1)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HeartHandshake size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A' }}>
                  Pledge Sponsor Matching Grant
                </h3>
                <span className="badge badge-emerald">1:1 Grant Match</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Fund independent lab testing for {activeStartupForSponsor.name} with 0% equity dilution
              </p>
            </div>
          </div>

          <button onClick={() => setIsSponsorModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Campaign Target Overview */}
        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '14px', marginBottom: '20px', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <strong style={{ color: '#0F172A' }}>Campaign Milestone:</strong>
            <span style={{ color: 'var(--accent-blue)', fontWeight: '700' }}>{activeStartupForSponsor.milestone.title}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            <span>Target Testing Cost: ${activeStartupForSponsor.testingLab.escrowTarget.toLocaleString()} USD</span>
            <span>Collected So Far: ${activeStartupForSponsor.testingLab.escrowCollected.toLocaleString()} USD</span>
          </div>
        </div>

        {pledgeNotice && (
          <div style={{ background: 'rgba(5, 150, 105, 0.12)', border: '1px solid var(--accent-emerald)', borderRadius: '6px', padding: '10px 14px', color: 'var(--accent-emerald)', fontSize: '0.8rem', marginBottom: '16px', textAlign: 'center', fontWeight: '600' }}>
            {pledgeNotice}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmitPledge} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
              Sponsoring Organization / VC Name
            </label>
            <input
              type="text"
              required
              value={sponsorName}
              onChange={(e) => setSponsorName(e.target.value)}
              placeholder="e.g. Breakthrough Energy, Tesla Clean Energy, ARPA-E..."
              style={{ width: '100%', padding: '10px 14px', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '0.85rem', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
              Matching Grant Amount (USD)
            </label>
            <select
              value={pledgeAmount}
              onChange={(e) => setPledgeAmount(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}
            >
              <option value="5000">$5,000 USD (Bronze Sponsor)</option>
              <option value="10000">$10,000 USD (Silver Sponsor)</option>
              <option value="25000">$25,000 USD (Gold Sponsor)</option>
              <option value="50000">$50,000 USD (Platinum Lead Patron)</option>
            </select>
          </div>

          <div style={{ background: 'rgba(37, 99, 235, 0.05)', border: '1px solid rgba(37, 99, 235, 0.2)', borderRadius: '6px', padding: '10px 12px', fontSize: '0.75rem', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={16} />
            <span>Direct Grant Escrow: Funds route 100% directly to {activeStartupForSponsor.testingLab.name}.</span>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px', fontSize: '0.9rem', fontWeight: '700', background: 'var(--gradient-yes)' }}
          >
            Confirm Grant Match Pledge →
          </button>
        </form>

      </div>
    </div>
  );
}
