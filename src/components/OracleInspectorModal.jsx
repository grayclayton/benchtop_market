import React, { useState } from 'react';
import { useMarket } from '../context/MarketContext';
import { ShieldCheck, X, FileCheck, ExternalLink, Activity, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function OracleInspectorModal() {
  const { inspectingCertificate, setInspectingCertificate, resolveMarket } = useMarket();

  const [resolutionNotice, setResolutionNotice] = useState(null);

  if (!inspectingCertificate) return null;

  const startup = inspectingCertificate;
  const cert = startup.certificate;
  const lab = startup.testingLab;

  const handleResolve = (outcome) => {
    resolveMarket(startup.id, outcome);
    setResolutionNotice(`Simulated Oracle Resolution: Market resolved to ${outcome}! Winner payouts & lab escrow unlocked.`);
    setTimeout(() => {
      setResolutionNotice(null);
      setInspectingCertificate(null);
    }, 2500);
  };

  return (
    <div className="modal-overlay" onClick={() => setInspectingCertificate(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '28px' }}>
        
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(2, 132, 199, 0.1)', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A' }}>
                Lab Certificate & Cryptographic Inspector
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                IPFS Cryptographic Proof & Optimistic Oracle Dispute State
              </p>
            </div>
          </div>

          <button 
            onClick={() => setInspectingCertificate(null)}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '6px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Startup & Milestone Overview */}
        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)', padding: '16px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0F172A' }}>
              {startup.name} (${startup.ticker})
            </h4>
            <span className={`badge ${cert.verificationStatus === 'VERIFIED_PASS' ? 'badge-emerald' : cert.verificationStatus === 'VERIFIED_FAIL' ? 'badge-amber' : 'badge-cyan'}`}>
              {cert.verificationStatus}
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Milestone: <strong style={{ color: '#0F172A' }}>{startup.milestone.title}</strong>
          </p>
        </div>

        {/* Cryptographic Hash & IPFS Box */}
        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)', padding: '16px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: 'var(--accent-blue)', fontSize: '0.85rem', fontWeight: '700' }}>
            <FileCheck size={16} /> Cryptographic Proof Signature
          </div>

          <div style={{ marginBottom: '12px' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: '600' }}>
              SHA-256 TEST CERTIFICATE HASH
            </span>
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '8px 12px', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-blue)', wordBreak: 'break-all', fontWeight: '600' }}>
              {cert.hash}
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: '600' }}>
              DECENTRALIZED STORAGE URI
            </span>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '8px 12px', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span>{cert.ipfsUri}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--accent-blue)', cursor: 'pointer', fontWeight: '700' }}>
                Inspect <ExternalLink size={12} />
              </span>
            </div>
          </div>
        </div>

        {/* Raw Telemetry Data Box */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700' }}>
            <Activity size={15} color="var(--accent-emerald)" /> Verified Lab Telemetry Stream ({lab.name})
          </h4>

          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '12px', maxHeight: '160px', overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E2E8F0', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '6px' }}>Gate / Sample</th>
                  <th style={{ padding: '6px' }}>Measured Metric</th>
                  <th style={{ padding: '6px' }}>Target Threshold</th>
                  <th style={{ padding: '6px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {cert.telemetry.map((t, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={{ padding: '6px', fontFamily: 'var(--font-mono)', fontWeight: '600' }}>
                      {t.gate || (t.cycle !== undefined ? `Cycle ${t.cycle}` : t.sample || (t.hour !== undefined ? `Hour ${t.hour}` : `Point ${idx + 1}`))}
                    </td>
                    <td style={{ padding: '6px', color: '#0F172A', fontFamily: 'var(--font-mono)', fontWeight: '700' }}>
                      {t.measured || (t.energyDensity ? `${t.energyDensity} Wh/kg` : t.specificity ? `${t.specificity}% Spec` : t.peakTorqueNmKg ? `${t.peakTorqueNmKg} Nm/kg` : t.tesla ? `${t.tesla} Tesla` : JSON.stringify(t))}
                    </td>
                    <td style={{ padding: '6px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {t.target || '—'}
                    </td>
                    <td style={{ padding: '6px', color: t.pass !== false ? 'var(--accent-emerald)' : 'var(--accent-rose)', fontWeight: '700' }}>
                      {t.pass !== false ? '✓ PASS' : '✗ FAIL'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Oracle Resolution Controls (Simulator Tool) */}
        <div style={{ background: 'rgba(124, 58, 237, 0.05)', border: '1px solid rgba(124, 58, 237, 0.25)', borderRadius: 'var(--radius-md)', padding: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--accent-purple)', fontWeight: '700', fontSize: '0.9rem' }}>
            <AlertTriangle size={16} /> Oracle Resolution Simulator
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
            Simulate published lab benchmark output to resolve the prediction market and release winner payouts ($1.00/share) & remaining 80% lab escrow.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <button 
              onClick={() => handleResolve('YES')}
              className="btn btn-yes"
              style={{ fontSize: '0.825rem', padding: '10px' }}
            >
              <CheckCircle2 size={16} /> Resolve YES (Milestone Passed)
            </button>
            <button 
              onClick={() => handleResolve('NO')}
              className="btn btn-no"
              style={{ fontSize: '0.825rem', padding: '10px' }}
            >
              <X size={16} /> Resolve NO (Milestone Failed)
            </button>
          </div>

          {resolutionNotice && (
            <div style={{ marginTop: '12px', padding: '8px 12px', background: 'rgba(5, 150, 105, 0.15)', border: '1px solid var(--accent-emerald)', borderRadius: '6px', color: 'var(--accent-emerald)', fontSize: '0.8rem', textAlign: 'center', fontWeight: '600' }}>
              {resolutionNotice}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
