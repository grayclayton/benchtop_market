import React from 'react';
import { useMarket } from '../context/MarketContext';
import MarketCard from './MarketCard';
import { 
  FlaskConical, 
  TrendingUp, 
  Briefcase, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  PlusCircle, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  Target 
} from 'lucide-react';

export default function HomePage() {
  const { startups, setActiveTab, setSelectedStartupId, setIsCreateModalOpen, platformStats } = useMarket();

  // Show top featured startups on the home page
  const featuredStartups = startups.slice(0, 3);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
      
      {/* Hero Section — Story & Mission First */}
      <section className="glass-panel" style={{ 
        padding: '40px', 
        borderRadius: 'var(--radius-lg)', 
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%)', 
        borderColor: '#E2E8F0', 
        boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle Decorative Accent Glow */}
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, rgba(255,255,255,0) 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '920px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <span className="badge badge-cyan" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
              <Sparkles size={14} /> Accelerated Innovation Protocol
            </span>
            <span className="badge badge-purple" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
              <ShieldCheck size={14} /> $0 Startup Freemium
            </span>
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', lineHeight: 1.2, color: '#0F172A', letterSpacing: '-0.8px', marginBottom: '18px' }}>
            Funding the Process of Innovation for Deep Tech Startups.
          </h1>

          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '28px', maxWidth: '850px' }}>
            Deep tech breakthroughs shouldn't stall in the lab. Benchtop Market helps early-stage startups acquire non-dilutive capital for milestone testing by combining community prediction trading with corporate sponsor matching grants.
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
            <button 
              onClick={() => setActiveTab('BETTING')} 
              className="btn btn-primary" 
              style={{ padding: '14px 26px', fontSize: '0.95rem', fontWeight: '700' }}
            >
              <TrendingUp size={18} /> Explore Prediction Markets <ArrowRight size={16} />
            </button>

            <button 
              onClick={() => setActiveTab('INVESTOR')} 
              className="btn btn-secondary" 
              style={{ padding: '14px 24px', fontSize: '0.95rem', fontWeight: '700' }}
            >
              <Briefcase size={18} /> Investor Pro Terminal
            </button>

            <button 
              onClick={() => setIsCreateModalOpen(true)} 
              className="btn btn-secondary" 
              style={{ padding: '14px 22px', fontSize: '0.95rem', fontWeight: '600', color: 'var(--accent-blue)', borderColor: 'rgba(37, 99, 235, 0.3)' }}
            >
              <PlusCircle size={18} /> List Startup ($0)
            </button>
          </div>

        </div>
      </section>

      {/* 3-Step Process: How We Help Startups Acquire Testing Capital */}
      <section style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-lg)', padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,0.02)' }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 32px auto' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>
            How Benchtop Market Accelerates Testing Capital
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            A transparent three-step protocol that turns scientific milestones into funded lab tests.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          
          {/* Step 1 */}
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)', padding: '22px', position: 'relative' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1rem', marginBottom: '14px' }}>
              1
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0F172A', marginBottom: '6px' }}>
              Startups List For $0
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Founders submit their physical milestone and lab benchmark protocol. No upfront fees, no equity dilution, and no friction.
            </p>
          </div>

          {/* Step 2 */}
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)', padding: '22px', position: 'relative' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(5, 150, 105, 0.1)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1rem', marginBottom: '14px' }}>
              2
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0F172A', marginBottom: '6px' }}>
              Community & Sponsors Fund Testing
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Everyday traders predict milestone outcomes (generating a 2.5% lab escrow cut), while corporate sponsors provide 1:1 matching grants.
            </p>
          </div>

          {/* Step 3 */}
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)', padding: '22px', position: 'relative' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(124, 58, 237, 0.1)', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1rem', marginBottom: '14px' }}>
              3
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0F172A', marginBottom: '6px' }}>
              Verified Lab Resolution
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Accredited labs execute the test. Results log to IPFS, paying out winning betters and giving startups verified proof to close seed rounds.
            </p>
          </div>

        </div>
      </section>

      {/* Feature Cards Portal Grid: Betting vs Investors vs Startups */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        
        {/* Portal Card 1: Prediction Market (Betting) */}
        <div style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F9FF 100%)', border: '1px solid rgba(37, 99, 235, 0.25)', borderRadius: 'var(--radius-md)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 16px rgba(37, 99, 235, 0.05)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(37, 99, 235, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-blue)' }}>
                <TrendingUp size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A' }}>Prediction Market</h3>
                <span style={{ fontSize: '0.72rem', color: 'var(--accent-blue)', fontWeight: '600' }}>For Bettors & Domain Experts</span>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '20px' }}>
              Monetize your technical expertise. Trade YES/NO prediction shares on real physical milestones, crowdsource due diligence, and earn high payouts on verified lab results.
            </p>
          </div>

          <button 
            onClick={() => setActiveTab('BETTING')} 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '12px', fontSize: '0.875rem' }}
          >
            Enter Betting Terminal <ArrowRight size={15} />
          </button>
        </div>

        {/* Portal Card 2: Investor Pro Terminal */}
        <div style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F3FF 100%)', border: '1px solid rgba(124, 58, 237, 0.25)', borderRadius: 'var(--radius-md)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 16px rgba(124, 58, 237, 0.05)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(124, 58, 237, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-purple)' }}>
                <Briefcase size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A' }}>Investor Pro Terminal</h3>
                <span style={{ fontSize: '0.72rem', color: 'var(--accent-purple)', fontWeight: '600' }}>$399/mo Institutional SaaS</span>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '20px' }}>
              Streamline hardware due diligence with live crowd belief scores, granular 7-gate electrochemistry telemetry, founder dossiers, and direct founder messaging channels.
            </p>
          </div>

          <button 
            onClick={() => setActiveTab('INVESTOR')} 
            className="btn btn-secondary" 
            style={{ width: '100%', padding: '12px', fontSize: '0.875rem', borderColor: 'rgba(124, 58, 237, 0.3)', color: 'var(--accent-purple)' }}
          >
            Open Investor Terminal <ArrowRight size={15} />
          </button>
        </div>

        {/* Portal Card 3: List Your Startup */}
        <div style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #ECFDF5 100%)', border: '1px solid rgba(5, 150, 105, 0.25)', borderRadius: 'var(--radius-md)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 16px rgba(5, 150, 105, 0.05)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(5, 150, 105, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-emerald)' }}>
                <PlusCircle size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A' }}>List Your Startup ($0)</h3>
                <span style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontWeight: '600' }}>Freemium Onboarding</span>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '20px' }}>
              Acquire lab testing capital with zero upfront cost. Tell your startup story, define your benchmark protocol, and connect directly with deep tech investors.
            </p>
          </div>

          <button 
            onClick={() => setIsCreateModalOpen(true)} 
            className="btn btn-secondary" 
            style={{ width: '100%', padding: '12px', fontSize: '0.875rem', borderColor: 'rgba(5, 150, 105, 0.3)', color: 'var(--accent-emerald)' }}
          >
            Launch Campaign ($0) <ArrowRight size={15} />
          </button>
        </div>

      </section>

      {/* Featured Milestone Showcase Cards */}
      <section style={{ marginTop: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0F172A' }}>
              Featured Startup Testing Campaigns
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Select a milestone card below to trade prediction shares or inspect verified lab certificates.
            </p>
          </div>

          <button 
            onClick={() => setActiveTab('BETTING')} 
            className="btn btn-secondary" 
            style={{ fontSize: '0.8rem' }}
          >
            View All Markets →
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
          {featuredStartups.map(startup => (
            <div 
              key={startup.id}
              onClick={() => { setSelectedStartupId(startup.id); setActiveTab('BETTING'); }}
              style={{ cursor: 'pointer' }}
            >
              <MarketCard startup={startup} />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
