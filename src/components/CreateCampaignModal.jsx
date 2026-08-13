import React, { useState } from 'react';
import { useMarket } from '../context/MarketContext';
import { PlusCircle, X, FlaskConical, User, Rocket, Target, CheckCircle2 } from 'lucide-react';
import { submitStartupApplication, isSupabaseConfigured } from '../lib/supabase';

export default function CreateCampaignModal() {
  const { isCreateModalOpen, setIsCreateModalOpen, createCampaign } = useMarket();

  const [step, setStep] = useState(1); // 1: Founder, 2: Story, 3: Milestone
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [formData, setFormData] = useState({
    // Founder Identity
    founderName: '',
    founderRole: 'Founder & CEO',
    founderEmail: '',
    founderLinkedin: '',
    teamSize: '1-3',
    // Startup Identity
    name: '',
    ticker: '',
    category: 'Clean Tech / DLE',
    tagline: '',
    // Story
    storyHeadline: '',
    storyProblem: '',
    storySolution: '',
    // Milestone
    milestoneTitle: '',
    milestoneDescription: '',
    targetMetric: '',
    labName: '',
    escrowTarget: '25000',
    deadline: '2027-06-30'
  });

  if (!isCreateModalOpen) return null;

  const update = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const canAdvance = () => {
    if (step === 1) return formData.founderName && formData.founderEmail && formData.name && formData.ticker;
    if (step === 2) return formData.storyProblem;
    return formData.milestoneTitle;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canAdvance()) return;

    setIsSubmitting(true);

    // Save to Supabase if configured
    const { error } = await submitStartupApplication(formData);
    if (error && isSupabaseConfigured()) {
      console.error('Supabase submission error:', error);
    }

    // Always create locally so the card appears immediately
    createCampaign({
      ...formData,
      storyHeadline: formData.storyHeadline || formData.name
    });

    setIsSubmitting(false);
    setSubmitSuccess(true);

    setTimeout(() => {
      setSubmitSuccess(false);
      setStep(1);
      setFormData({
        founderName: '', founderRole: 'Founder & CEO', founderEmail: '', founderLinkedin: '', teamSize: '1-3',
        name: '', ticker: '', category: 'Clean Tech / DLE', tagline: '',
        storyHeadline: '', storyProblem: '', storySolution: '',
        milestoneTitle: '', milestoneDescription: '', targetMetric: '', labName: '', escrowTarget: '25000', deadline: '2027-06-30'
      });
    }, 2500);
  };

  const inputStyle = {
    width: '100%', padding: '10px 14px', background: '#F8FAFC', border: '1px solid #CBD5E1',
    borderRadius: '8px', color: '#0F172A', fontSize: '0.875rem', outline: 'none'
  };

  const labelStyle = {
    fontSize: '0.75rem', color: '#64748B', display: 'block', marginBottom: '5px', fontWeight: '600', letterSpacing: '0.3px'
  };

  return (
    <div className="modal-overlay" onClick={() => { setIsCreateModalOpen(false); setStep(1); }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '0', maxWidth: '580px', overflow: 'hidden' }}>
        
        {/* Header */}
        <div style={{ padding: '24px 28px 20px', borderBottom: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'var(--gradient-brand)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FlaskConical size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0F172A', marginBottom: '2px' }}>
                  Apply to List Your Startup
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#64748B', margin: 0 }}>
                  Free listing • Direct lab escrow • 0% equity dilution
                </p>
              </div>
            </div>
            <button onClick={() => { setIsCreateModalOpen(false); setStep(1); }} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '4px' }}>
              <X size={20} />
            </button>
          </div>

          {/* Step Indicator */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '18px' }}>
            {[
              { num: 1, label: 'You & Your Startup', icon: User },
              { num: 2, label: 'Your Story', icon: Rocket },
              { num: 3, label: 'The Milestone', icon: Target }
            ].map(s => (
              <button
                key={s.num}
                onClick={() => { if (s.num < step) setStep(s.num); }}
                style={{
                  flex: 1, padding: '8px 12px', borderRadius: '8px', border: 'none',
                  background: step === s.num ? '#0F172A' : step > s.num ? '#ECFDF5' : '#F1F5F9',
                  color: step === s.num ? '#FFF' : step > s.num ? '#059669' : '#94A3B8',
                  fontSize: '0.72rem', fontWeight: '700', cursor: s.num < step ? 'pointer' : 'default',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  transition: 'all 0.2s ease'
                }}
              >
                {step > s.num ? <CheckCircle2 size={13} /> : <s.icon size={13} />}
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Success State */}
        {submitSuccess ? (
          <div style={{ padding: '48px 28px', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#ECFDF5', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={32} color="#059669" />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>Application Submitted!</h3>
            <p style={{ fontSize: '0.875rem', color: '#64748B', maxWidth: '360px', margin: '0 auto' }}>
              Your startup card is live in the directory. Our team will review and verify your application within 48 hours.
            </p>
          </div>
        ) : (

        <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); setStep(step + 1); }} style={{ padding: '24px 28px 28px' }}>

          {/* ── Step 1: Founder & Startup Identity ── */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <div style={{ width: '3px', height: '18px', background: 'var(--gradient-brand)', borderRadius: '2px' }} />
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0F172A' }}>About You</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Your Full Name *</label>
                  <input type="text" required placeholder="e.g. Dr. Jane Chen" value={formData.founderName}
                    onChange={(e) => update('founderName', e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Role / Title</label>
                  <input type="text" placeholder="e.g. Founder & CTO" value={formData.founderRole}
                    onChange={(e) => update('founderRole', e.target.value)} style={inputStyle} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input type="email" required placeholder="you@startup.com" value={formData.founderEmail}
                    onChange={(e) => update('founderEmail', e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>LinkedIn Profile</label>
                  <input type="url" placeholder="https://linkedin.com/in/..." value={formData.founderLinkedin}
                    onChange={(e) => update('founderLinkedin', e.target.value)} style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Team Size</label>
                <select value={formData.teamSize} onChange={(e) => update('teamSize', e.target.value)} style={inputStyle}>
                  <option value="Solo Founder">Solo Founder</option>
                  <option value="1-3">1–3 People</option>
                  <option value="4-10">4–10 People</option>
                  <option value="10+">10+ People</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                <div style={{ width: '3px', height: '18px', background: 'var(--gradient-yes)', borderRadius: '2px' }} />
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0F172A' }}>About Your Startup</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Startup Name *</label>
                  <input type="text" required placeholder="e.g. NovaBatt Energy" value={formData.name}
                    onChange={(e) => update('name', e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Ticker Symbol *</label>
                  <input type="text" required maxLength="6" placeholder="e.g. NOVA" value={formData.ticker}
                    onChange={(e) => update('ticker', e.target.value.toUpperCase())} style={{ ...inputStyle, fontFamily: 'var(--font-mono)', fontWeight: '700', letterSpacing: '1px' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Sector</label>
                  <select value={formData.category} onChange={(e) => update('category', e.target.value)} style={inputStyle}>
                    <option value="Clean Tech / DLE">Clean Tech / DLE</option>
                    <option value="Battery Tech">Battery Tech</option>
                    <option value="Synthetic Biotech">Synthetic Biotech</option>
                    <option value="Robotics & AI">Robotics & AI</option>
                    <option value="Quantum Computing">Quantum Computing</option>
                    <option value="Clean Energy">Clean Energy</option>
                    <option value="Space Tech">Space Tech</option>
                    <option value="Advanced Materials">Advanced Materials</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>One-Line Tagline</label>
                  <input type="text" placeholder="What you do, in 10 words" value={formData.tagline}
                    onChange={(e) => update('tagline', e.target.value)} style={inputStyle} />
                </div>
              </div>
            </div>
          )}

          {/* ── Step 2: Your Story ── */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <div style={{ width: '3px', height: '18px', background: 'var(--gradient-brand)', borderRadius: '2px' }} />
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0F172A' }}>Tell the story that hooks interest</span>
              </div>

              <p style={{ fontSize: '0.78rem', color: '#64748B', margin: '0 0 4px', lineHeight: 1.5 }}>
                Predictors and investors will read this to decide whether to buy YES or NO shares on your milestone. Be specific about the physics, chemistry, or engineering — this audience is technical.
              </p>

              <div>
                <label style={labelStyle}>The Problem You're Solving *</label>
                <textarea
                  rows="4" required
                  placeholder="What real-world problem does your technology solve? Why does it matter? Why hasn't anyone solved it yet?&#10;&#10;e.g. 'The world needs 3× more lithium by 2030 for EV batteries, but mining from brine takes 18 months and wastes 2 million liters of water per tonne...'"
                  value={formData.storyProblem}
                  onChange={(e) => update('storyProblem', e.target.value)}
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }}
                />
              </div>

              <div>
                <label style={labelStyle}>Your Solution (How It Works)</label>
                <textarea
                  rows="4"
                  placeholder="Describe your technical approach in plain language. What makes it different from existing approaches?&#10;&#10;e.g. 'Our device uses ocean wave energy to power intercalation-based lithium extraction. Unlike thermal evaporation, we can produce battery-grade lithium carbonate in hours instead of months...'"
                  value={formData.storySolution}
                  onChange={(e) => update('storySolution', e.target.value)}
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }}
                />
              </div>

              <div style={{ background: '#F0F9FF', border: '1px solid rgba(37, 99, 235, 0.2)', borderRadius: '8px', padding: '10px 14px', fontSize: '0.75rem', color: '#1E40AF', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <Rocket size={14} style={{ marginTop: '2px', flexShrink: 0 }} />
                <span><strong>Tip:</strong> The best-performing cards tell a concrete story about a physical thing you built and tested. Avoid vague claims — predictors reward specificity.</span>
              </div>
            </div>
          )}

          {/* ── Step 3: The Milestone ── */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <div style={{ width: '3px', height: '18px', background: 'var(--gradient-yes)', borderRadius: '2px' }} />
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0F172A' }}>Define your testable milestone</span>
              </div>

              <p style={{ fontSize: '0.78rem', color: '#64748B', margin: '0 0 4px', lineHeight: 1.5 }}>
                This is the physical benchmark test that predictors will trade on. It must be objectively verifiable by an independent lab.
              </p>

              <div>
                <label style={labelStyle}>Milestone Title *</label>
                <input type="text" required
                  placeholder="e.g. 1,000-Cycle Solid-State Cell Benchmark at NREL"
                  value={formData.milestoneTitle}
                  onChange={(e) => update('milestoneTitle', e.target.value)} style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Benchmark Protocol Description</label>
                <textarea rows="3"
                  placeholder="Describe exactly what will be tested, how success is measured, and what constitutes a pass vs. fail..."
                  value={formData.milestoneDescription}
                  onChange={(e) => update('milestoneDescription', e.target.value)}
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Target Pass Metric</label>
                  <input type="text" placeholder="e.g. >450 Wh/kg @ 1000 cycles"
                    value={formData.targetMetric}
                    onChange={(e) => update('targetMetric', e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Preferred Testing Lab</label>
                  <input type="text" placeholder="e.g. NREL, SGS, TÜV SÜD"
                    value={formData.labName}
                    onChange={(e) => update('labName', e.target.value)} style={inputStyle} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Estimated Lab Testing Cost (USD)</label>
                  <input type="number" min="1000" step="1000"
                    value={formData.escrowTarget}
                    onChange={(e) => update('escrowTarget', e.target.value)}
                    style={{ ...inputStyle, fontFamily: 'var(--font-mono)' }} />
                </div>
                <div>
                  <label style={labelStyle}>Target Completion Date</label>
                  <input type="date" value={formData.deadline}
                    onChange={(e) => update('deadline', e.target.value)} style={inputStyle} />
                </div>
              </div>

              {/* Anti-Fraud Notice */}
              <div style={{ background: '#ECFDF5', border: '1px solid rgba(5, 150, 105, 0.25)', borderRadius: '8px', padding: '10px 14px', fontSize: '0.75rem', color: '#065F46', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ fontSize: '1rem', flexShrink: 0 }}>🛡️</span>
                <span>Escrow funds route 100% directly to accredited testing labs — never to founder personal accounts. Verified founders stake a $2,500 collateral bond.</span>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '22px' }}>
            {step > 1 && (
              <button type="button" onClick={() => setStep(step - 1)}
                className="btn btn-secondary"
                style={{ padding: '12px 20px', fontSize: '0.875rem' }}>
                ← Back
              </button>
            )}

            <button type="submit" disabled={!canAdvance() || isSubmitting}
              className="btn btn-primary"
              style={{
                flex: 1, padding: '12px', fontSize: '0.9rem', fontWeight: '700',
                background: canAdvance() ? (step === 3 ? 'var(--gradient-yes)' : 'var(--gradient-brand)') : '#CBD5E1',
                opacity: canAdvance() ? 1 : 0.5
              }}>
              {isSubmitting ? 'Submitting...' : step === 3 ? '🚀 Submit Application' : 'Continue →'}
            </button>
          </div>

        </form>
        )}

      </div>
    </div>
  );
}
