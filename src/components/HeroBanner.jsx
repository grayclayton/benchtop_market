import React from 'react';
import { FlaskConical, ShieldCheck, TrendingUp, Layers, Award, Briefcase } from 'lucide-react';

export default function HeroBanner() {
  return (
    <div className="glass-panel" style={{ padding: '28px 32px', marginBottom: '28px', background: 'linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%)', borderColor: '#E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '32px', alignItems: 'center' }}>
        
        {/* Left Column: Hero Text */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span className="badge badge-cyan">
              <FlaskConical size={12} /> Deep Tech Milestone Prediction
            </span>
            <span className="badge badge-purple">
              <ShieldCheck size={12} /> Investor Deal Flow Intelligence
            </span>
          </div>

          <h2 style={{ fontSize: '1.9rem', fontWeight: '800', lineHeight: 1.25, marginBottom: '12px', letterSpacing: '-0.5px', color: '#0F172A' }}>
            Crowdsourced Due Diligence for Deep Tech Milestones.
          </h2>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>
            Traders generate live crowd-belief scores on physical startup milestones. <strong style={{ color: '#0F172A' }}>Investor subscribers get real-time intelligence</strong>, and sponsor matching plus trading escrow fund the bench testing that resolves every market.
          </p>

          {/* Key Value Pill Highlights */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.825rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(5, 150, 105, 0.15)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>✓</div>
              <span><strong>$0 Startup Fee</strong> (Freemium)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(37, 99, 235, 0.15)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>✓</div>
              <span><strong>Live Crowd Belief Scores</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(124, 58, 237, 0.15)', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>✓</div>
              <span><strong>Investor Intelligence & Sponsor Matching</strong></span>
            </div>
          </div>
        </div>

        {/* Right Column: Economics & Fee Routing Diagram */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)', padding: '18px 22px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.5px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Revenue & Funding Model
            </span>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)', fontWeight: '700' }}>PER TRADE + SUBS</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            
            {/* 97% Payout Pool */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC', padding: '8px 12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <TrendingUp size={16} color="var(--accent-blue)" />
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#0F172A' }}>Winning Predictors Pool</span>
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: '800', fontFamily: 'var(--font-mono)', color: '#0F172A' }}>97.0%</span>
            </div>

            {/* 2.5% Startup Testing Fund */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(5, 150, 105, 0.08)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(5, 150, 105, 0.25)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Award size={16} color="var(--accent-emerald)" />
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--accent-emerald)' }}>2.5% → Startup Testing Fund</span>
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)' }}>2.5%</span>
            </div>

            {/* 0.5% Platform Ops */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(124, 58, 237, 0.08)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(124, 58, 237, 0.25)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Layers size={16} color="var(--accent-purple)" />
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--accent-purple)' }}>Platform Protocol Fee</span>
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--accent-purple)' }}>0.5%</span>
            </div>

            {/* Investor Pro Subscriptions */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(37, 99, 235, 0.08)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(37, 99, 235, 0.25)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Briefcase size={16} color="var(--accent-blue)" />
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--accent-blue)' }}>Investor Pro Subscriptions</span>
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)' }}>$399/mo</span>
            </div>

            {/* Sponsor Matching Grants */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(5, 150, 105, 0.08)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(5, 150, 105, 0.25)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Award size={16} color="var(--accent-emerald)" />
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--accent-emerald)' }}>Sponsor Matching Grants</span>
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)' }}>Direct</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

