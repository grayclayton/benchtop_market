import React from 'react';
import { useMarket } from '../context/MarketContext';
import { X, Award, ShieldCheck, CheckCircle2, FileCheck, ExternalLink, Building2 } from 'lucide-react';

export default function LabPortalModal() {
  const { isLabPortalOpen, setIsLabPortalOpen } = useMarket();

  if (!isLabPortalOpen) return null;

  // Mock list of accredited testing laboratories
  const accreditedLabs = [
    {
      name: "SGS Industrial & Electrochemical Metrology",
      location: "Geneva / Houston Facility",
      accreditation: "ISO/IEC 17025 Accredited & ICP-OES / ICP-MS Calibrated",
      activeCampaigns: 4,
      totalTestingFunded: "$240,000 USD",
      status: "VERIFIED_ORACLE",
      badge: "ISO 17025"
    },
    {
      name: "TÜV SÜD Battery & Energy Materials Core",
      location: "Munich Core Labs",
      accreditation: "Proof-Grade Battery & Direct Lithium Extraction Validation",
      activeCampaigns: 3,
      totalTestingFunded: "$185,000 USD",
      status: "VERIFIED_ORACLE",
      badge: "TÜV SÜD"
    },
    {
      name: "NREL National Renewable Energy Laboratory",
      location: "Golden, Colorado Facility",
      accreditation: "US DOE Clean Energy Accelerator Verified Oracle",
      activeCampaigns: 6,
      totalTestingFunded: "$450,000 USD",
      status: "VERIFIED_ORACLE",
      badge: "DOE NREL"
    },
    {
      name: "MIT Engine Hardware & Electrochemical Core",
      location: "Cambridge, MA Core Facility",
      accreditation: "Academic Core Metrology & Cryo-EM / Micro-CT Characterization",
      activeCampaigns: 2,
      totalTestingFunded: "$120,000 USD",
      status: "VERIFIED_ORACLE",
      badge: "MIT CORE"
    }
  ];

  return (
    <div className="modal-overlay" onClick={() => setIsLabPortalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '28px', maxWidth: '640px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(5, 150, 105, 0.1)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Award size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A' }}>
                  Accredited Testing Labs & Oracle Network
                </h3>
                <span className="badge badge-emerald">Oracle Partner Network</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Independent accredited 3rd-party labs that execute physical benchmarks & sign IPFS certificates.
              </p>
            </div>
          </div>

          <button onClick={() => setIsLabPortalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Labs Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '360px', overflowY: 'auto' }}>
          {accreditedLabs.map((lab, idx) => (
            <div key={idx} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Building2 size={16} color="var(--accent-blue)" />
                  <strong style={{ fontSize: '0.95rem', color: '#0F172A' }}>{lab.name}</strong>
                </div>
                <span className="badge badge-purple" style={{ fontSize: '0.68rem' }}>{lab.badge}</span>
              </div>

              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                {lab.accreditation} • {lab.location}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', borderTop: '1px solid #E2E8F0', paddingTop: '8px' }}>
                <span style={{ color: 'var(--accent-emerald)', fontWeight: '600' }}>
                  ✓ Verified Oracle • {lab.activeCampaigns} Active Campaigns
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '800', color: '#0F172A' }}>
                  Total Funded: {lab.totalTestingFunded}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          <span>Are you an accredited testing facility?</span>
          <button className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '6px 12px' }}>
            Apply to Join Lab Network →
          </button>
        </div>

      </div>
    </div>
  );
}
