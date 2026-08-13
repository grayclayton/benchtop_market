import React, { useState } from 'react';
import { useMarket } from '../context/MarketContext';
import { PlusCircle, X, FlaskConical } from 'lucide-react';

export default function CreateCampaignModal() {
  const { isCreateModalOpen, setIsCreateModalOpen, createCampaign } = useMarket();

  const [formData, setFormData] = useState({
    name: '',
    ticker: '',
    category: 'Clean Tech / DLE',
    tagline: '',
    milestoneTitle: '',
    milestoneDescription: '',
    targetMetric: '',
    labName: '',
    escrowTarget: '25000',
    deadline: '2026-12-31',
    leadInvestor: 'Seed Angel Network'
  });

  if (!isCreateModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.ticker || !formData.milestoneTitle) return;
    createCampaign(formData);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsCreateModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '28px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--gradient-brand)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FlaskConical size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A' }}>
                  List Startup Milestone Campaign
                </h3>
                <span className="badge badge-emerald">$0 Listing Fee</span>
                <span className="badge badge-purple">Verified Founder</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                List your milestone. Attract crowd belief and sponsor grants to fund testing.
              </p>
            </div>
          </div>

          <button onClick={() => setIsCreateModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Anti-Fraud Protection Notice */}
        <div style={{ background: 'linear-gradient(135deg, #ECFDF5 0%, #F0F9FF 100%)', border: '1px solid rgba(5, 150, 105, 0.25)', borderRadius: '8px', padding: '12px 14px', marginBottom: '20px', fontSize: '0.78rem', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.1rem' }}>🛡️</span>
          <div>
            <strong style={{ color: 'var(--accent-emerald)', display: 'block' }}>Anti-Fraud Protocol Active:</strong>
            <span>Escrow funds route 100% directly to accredited testing labs (never founder personal accounts). Requires $2,500 staked collateral bond.</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: '600' }}>Startup Name</label>
              <input
                type="text"
                required
                placeholder="e.g. WSEI Lithium Extraction"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ width: '100%', padding: '10px', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '6px', color: '#0F172A', fontSize: '0.85rem', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: '600' }}>Ticker Symbol</label>
              <input
                type="text"
                required
                maxLength="6"
                placeholder="e.g. WSEI"
                value={formData.ticker}
                onChange={(e) => setFormData({ ...formData, ticker: e.target.value })}
                style={{ width: '100%', padding: '10px', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '6px', color: '#0F172A', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: '600' }}>Sector / Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                style={{ width: '100%', padding: '10px', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '6px', color: '#0F172A', fontSize: '0.85rem', outline: 'none' }}
              >
                <option value="Clean Tech / DLE">Clean Tech / DLE</option>
                <option value="Battery Tech">Battery Tech</option>
                <option value="Synthetic Biotech">Synthetic Biotech</option>
                <option value="Robotics & AI">Robotics & AI</option>
                <option value="Quantum Computing">Quantum Computing</option>
                <option value="Clean Energy">Clean Energy</option>
                <option value="Space Tech">Space Tech</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: '600' }}>Tagline Pitch</label>
              <input
                type="text"
                placeholder="Short startup tagline..."
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                style={{ width: '100%', padding: '10px', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '6px', color: '#0F172A', fontSize: '0.85rem', outline: 'none' }}
              />
            </div>
          </div>

          {/* Your Story Section */}
          <div style={{ marginBottom: '14px', paddingTop: '14px', borderTop: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <div style={{ width: '3px', height: '16px', background: 'var(--gradient-brand)', borderRadius: '2px' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Your Story — What Hooks Interest</span>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: '600' }}>The Problem You're Solving</label>
              <textarea
                rows="2"
                placeholder="e.g. The world needs 3× more lithium by 2030 but current extraction methods are slow, expensive, and carbon-intensive..."
                value={formData.storyProblem || ''}
                onChange={(e) => setFormData({ ...formData, storyProblem: e.target.value })}
                style={{ width: '100%', padding: '10px', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '6px', color: '#0F172A', fontSize: '0.85rem', outline: 'none', resize: 'vertical' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: '600' }}>Your Solution (How It Works)</label>
              <textarea
                rows="2"
                placeholder="e.g. Our device uses ocean waves to power electrochemical lithium extraction — no pumps, no membranes, no external energy..."
                value={formData.storySolution || ''}
                onChange={(e) => setFormData({ ...formData, storySolution: e.target.value })}
                style={{ width: '100%', padding: '10px', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '6px', color: '#0F172A', fontSize: '0.85rem', outline: 'none', resize: 'vertical' }}
              />
            </div>
          </div>

          {/* Milestone Section */}
          <div style={{ marginBottom: '14px', paddingTop: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <div style={{ width: '3px', height: '16px', background: 'var(--gradient-yes)', borderRadius: '2px' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent-emerald)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>The Milestone — What Sells The Product</span>
            </div>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: '600' }}>Milestone Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Solid-State Battery 1,000 Cycle Benchmark"
              value={formData.milestoneTitle}
              onChange={(e) => setFormData({ ...formData, milestoneTitle: e.target.value })}
              style={{ width: '100%', padding: '10px', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '6px', color: '#0F172A', fontSize: '0.85rem', outline: 'none' }}
            />
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: '600' }}>Milestone Protocol Description</label>
            <textarea
              rows="2"
              placeholder="Detailed description of the technical benchmark protocol..."
              value={formData.milestoneDescription}
              onChange={(e) => setFormData({ ...formData, milestoneDescription: e.target.value })}
              style={{ width: '100%', padding: '10px', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '6px', color: '#0F172A', fontSize: '0.85rem', outline: 'none', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: '600' }}>Target Verification Metric</label>
              <input
                type="text"
                placeholder="e.g. >450 Wh/kg @ 1000 cycles"
                value={formData.targetMetric}
                onChange={(e) => setFormData({ ...formData, targetMetric: e.target.value })}
                style={{ width: '100%', padding: '10px', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '6px', color: '#0F172A', fontSize: '0.85rem', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: '600' }}>Target Test Lab</label>
              <input
                type="text"
                placeholder="e.g. TÜV SÜD / NREL"
                value={formData.labName}
                onChange={(e) => setFormData({ ...formData, labName: e.target.value })}
                style={{ width: '100%', padding: '10px', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '6px', color: '#0F172A', fontSize: '0.85rem', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: '600' }}>Lab Cost Target (USD)</label>
              <input
                type="number"
                min="1000"
                step="1000"
                value={formData.escrowTarget}
                onChange={(e) => setFormData({ ...formData, escrowTarget: e.target.value })}
                style={{ width: '100%', padding: '10px', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '6px', color: '#0F172A', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: '600' }}>Target Deadline Date</label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                style={{ width: '100%', padding: '10px', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '6px', color: '#0F172A', fontSize: '0.85rem', outline: 'none' }}
              />
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '0.95rem' }}>
            <PlusCircle size={18} /> Launch Campaign ($0 Freemium)
          </button>
        </form>

      </div>
    </div>
  );
}
