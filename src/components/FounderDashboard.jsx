import React, { useState } from 'react';
import { useMarket } from '../context/MarketContext';
import { 
  Rocket, 
  FlaskConical, 
  DollarSign, 
  Award, 
  Mail, 
  PlusCircle, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  ExternalLink, 
  MessageSquare,
  Clock
} from 'lucide-react';

export default function FounderDashboard() {
  const { startups, userState, setIsCreateModalOpen, setInspectingCertificate } = useMarket();
  
  // Find founder's campaign (e.g. WSEI Lithium)
  const myCampaign = startups.find(s => s.id === 'wsei-lithium-bench-01') || startups[0];
  const escrowPercent = Math.min(100, Math.round((myCampaign.testingLab.escrowCollected / myCampaign.testingLab.escrowTarget) * 100));

  const [activeTabSection, setActiveTabSection] = useState('CAMPAIGNS'); // 'CAMPAIGNS', 'MESSAGES', 'LAB_REPORTS'
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Mock investor messages sent to founder
  const founderMessages = [
    {
      id: 1,
      sender: "Sarah Lin (Breakthrough Energy Ventures)",
      time: "2 hours ago",
      subject: "Inquiry regarding WSEI Flow-Cell Array Scale-Up Test",
      body: "Hi Dr. Gray, we reviewed your 200-cycle beaker cell proof gate data (1.77M Li/Na selectivity). Our investment committee is interested in leading your Seed round once the flow-cell array benchmark is completed. Can we schedule a technical call this Thursday?",
      read: false
    },
    {
      id: 2,
      sender: "Marcus Vance (Clean Energy Accelerator)",
      time: "1 day ago",
      subject: "Sponsor Grant Match Confirmation ($8,500 Released)",
      body: "Dr. Clayton, we have approved the matching grant funds for your lab testing escrow. The 20% intake fee has been released to the testing laboratory.",
      read: true
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header Banner */}
      <div className="glass-panel" style={{ 
        padding: '28px', 
        borderRadius: 'var(--radius-lg)', 
        background: 'linear-gradient(135deg, #FFFFFF 0%, #EFF6FF 100%)', 
        border: '1px solid rgba(37, 99, 235, 0.25)', 
        boxShadow: '0 4px 20px rgba(37, 99, 235, 0.06)' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)' }}>
              <Rocket size={26} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#0F172A' }}>
                  Founder Workspace — {myCampaign.name}
                </h1>
                <span className="badge badge-cyan">Startup Portal</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Manage active milestone campaigns, track lab testing fund escrow, and connect directly with investors.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn btn-primary"
            style={{ padding: '10px 18px', fontSize: '0.85rem' }}
          >
            <PlusCircle size={16} /> List New Milestone ($0)
          </button>

        </div>

        {/* Quick Founder Telemetry Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #E2E8F0' }}>
          
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-sm)', padding: '14px' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', display: 'block' }}>Testing Capital Raised</span>
            <div style={{ fontSize: '1.3rem', fontWeight: '900', color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>
              ${myCampaign.testingLab.escrowCollected.toLocaleString()} USD
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>2.5% Escrow Cut + Sponsors</span>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-sm)', padding: '14px' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', display: 'block' }}>Crowd Belief Score</span>
            <div style={{ fontSize: '1.3rem', fontWeight: '900', color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)' }}>
              {Math.round(myCampaign.market.yesPrice * 100)}% YES
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>2,410 Active Predictors</span>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-sm)', padding: '14px' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', display: 'block' }}>Accredited Lab Gates</span>
            <div style={{ fontSize: '1.3rem', fontWeight: '900', color: 'var(--accent-purple)', fontFamily: 'var(--font-mono)' }}>
              7 / 7 PASSED
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Zero Toxic Chlorine Byproducts</span>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-sm)', padding: '14px' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', display: 'block' }}>Investor Inquiries</span>
            <div style={{ fontSize: '1.3rem', fontWeight: '900', color: '#0F172A', fontFamily: 'var(--font-mono)' }}>
              2 New Messages
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--accent-blue)', fontWeight: '600' }}>Breakthrough Energy + CleanTech</span>
          </div>

        </div>
      </div>

      {/* Navigation Sub-Tabs & Launch CTA */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setActiveTabSection('CAMPAIGNS')}
            className={`btn ${activeTabSection === 'CAMPAIGNS' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.85rem', padding: '8px 16px' }}
          >
            <Rocket size={15} /> Active Milestone Campaign
          </button>
          <button
            onClick={() => setActiveTabSection('MESSAGES')}
            className={`btn ${activeTabSection === 'MESSAGES' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.85rem', padding: '8px 16px' }}
          >
            <MessageSquare size={15} /> Investor Messages Inbox (2)
          </button>
          <button
            onClick={() => setInspectingCertificate(myCampaign)}
            className="btn btn-secondary"
            style={{ fontSize: '0.85rem', padding: '8px 16px' }}
          >
            <ShieldCheck size={15} color="var(--accent-blue)" /> IPFS Lab Certificate
          </button>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="btn btn-primary"
          style={{ padding: '10px 20px', fontSize: '0.85rem', background: 'var(--gradient-brand)' }}
        >
          <PlusCircle size={16} /> List Startup Campaign ($0)
        </button>
      </div>

      {/* Primary Founder Launch Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #EFF6FF 0%, #ECFDF5 100%)',
        border: '1px solid rgba(37, 99, 235, 0.25)',
        borderRadius: 'var(--radius-md)',
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge badge-cyan">Freemium Startup Portal</span>
            <span className="badge badge-emerald">1:1 Sponsor Matching</span>
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0F172A', marginBottom: '4px' }}>
            Ready to Fund Your Next Hardware Milestone Test?
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
            Define your benchmark protocol, set your lab testing cost target, and receive 1:1 sponsor grant matching with 0% equity dilution.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="btn btn-primary"
          style={{ padding: '12px 24px', fontSize: '0.9rem', fontWeight: '700' }}
        >
          <PlusCircle size={18} /> List Startup ($0) →
        </button>
      </div>

      {/* SECTION 1: ACTIVE CAMPAIGN DETAILED BREAKDOWN */}
      {activeTabSection === 'CAMPAIGNS' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          
          {/* Main Campaign Card */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: myCampaign.logoBg, color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>
                  {myCampaign.ticker.substring(0, 2)}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0F172A' }}>{myCampaign.name}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-blue)', fontWeight: '600' }}>{myCampaign.milestone.title}</span>
                </div>
              </div>
              <span className="badge badge-emerald">ACTIVE FUNDING</span>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
              {myCampaign.milestone.description}
            </p>

            {/* Lab Escrow Progress */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: '700', marginBottom: '6px' }}>
                <span style={{ color: '#0F172A' }}>Lab Testing Escrow Collection</span>
                <span style={{ color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>
                  ${myCampaign.testingLab.escrowCollected.toLocaleString()} / ${myCampaign.testingLab.escrowTarget.toLocaleString()} ({escrowPercent}%)
                </span>
              </div>
              
              <div style={{ width: '100%', height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px' }}>
                <div style={{ width: `${escrowPercent}%`, height: '100%', background: 'var(--gradient-yes)', transition: 'width 0.5s ease' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span>✓ 20% Initial Intake Fee ($6,000) Released to Lab</span>
                <span>80% Final Payout Held Pending Test Resolution</span>
              </div>
            </div>

            {/* Sponsor Matching Contributions */}
            <div>
              <h4 style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>
                Sponsor Matching Grants
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {myCampaign.testingLab.matchingSponsors.map((sponsor, idx) => (
                  <div key={idx} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.825rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Award size={15} color="var(--accent-blue)" />
                      <strong style={{ color: '#0F172A' }}>{sponsor.name}</strong>
                    </div>
                    <span style={{ fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)' }}>
                      +${sponsor.amount.toLocaleString()} USD
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sidebar: Testing Lab Info & Founder IP */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)', padding: '20px' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>
                Accredited Testing Facility
              </h4>
              <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#0F172A', marginBottom: '4px' }}>
                {myCampaign.testingLab.name}
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: '12px' }}>
                {myCampaign.testingLab.accreditation}
              </p>
              <button 
                onClick={() => setInspectingCertificate(myCampaign)}
                className="btn btn-secondary" 
                style={{ width: '100%', padding: '8px', fontSize: '0.78rem' }}
              >
                Inspect Telemetry Gates →
              </button>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)', padding: '20px' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>
                Founder Intellectual Property
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.78rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0F172A', fontWeight: '600' }}>
                  <CheckCircle2 size={14} color="var(--accent-emerald)" /> WSEI Wave-Synchronized Intercalation
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0F172A', fontWeight: '600' }}>
                  <CheckCircle2 size={14} color="var(--accent-emerald)" /> Self-Cleaning Graphene Electrode
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* SECTION 2: INVESTOR MESSAGES INBOX */}
      {activeTabSection === 'MESSAGES' && (
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)', padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', marginBottom: '16px' }}>
            Direct Investor Inquiries Inbox
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {founderMessages.map(msg => (
              <div 
                key={msg.id}
                onClick={() => setSelectedMessage(msg)}
                style={{ 
                  background: selectedMessage?.id === msg.id ? '#F0F9FF' : '#F8FAFC', 
                  border: selectedMessage?.id === msg.id ? '2px solid var(--accent-blue)' : '1px solid #E2E8F0', 
                  borderRadius: 'var(--radius-md)', 
                  padding: '16px', 
                  cursor: 'pointer' 
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <strong style={{ fontSize: '0.9rem', color: '#0F172A' }}>{msg.sender}</strong>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{msg.time}</span>
                </div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-blue)', marginBottom: '6px' }}>{msg.subject}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{msg.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
