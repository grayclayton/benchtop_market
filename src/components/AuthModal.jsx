import React, { useState } from 'react';
import { useMarket } from '../context/MarketContext';
import { 
  X, 
  User, 
  Wallet, 
  ShieldCheck, 
  Mail, 
  Sparkles, 
  TrendingUp, 
  Briefcase, 
  LogOut, 
  PlusCircle, 
  CheckCircle2, 
  Lock 
} from 'lucide-react';

export default function AuthModal() {
  const { 
    userState, 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    loginUser, 
    logoutUser, 
    topUpBalance 
  } = useMarket();

  const [activeMode, setActiveMode] = useState('PROFILE'); // 'PROFILE' or 'SIGNIN'
  const [emailInput, setEmailInput] = useState('');
  const [roleInput, setRoleInput] = useState('FOUNDER & INVESTOR');

  if (!isAuthModalOpen) return null;

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!emailInput) return;
    const namePart = emailInput.split('@')[0];
    loginUser({
      name: namePart.charAt(0).toUpperCase() + namePart.slice(1),
      handle: `@${namePart}`,
      email: emailInput,
      role: roleInput,
      authMethod: 'EMAIL_MAGIC_LINK',
      walletAddress: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`
    });
    setActiveMode('PROFILE');
  };

  const handleWalletConnect = (walletName) => {
    loginUser({
      name: `${walletName} User`,
      handle: `@${walletName.toLowerCase()}_trader`,
      email: `${walletName.toLowerCase()}@web3auth.io`,
      role: roleInput,
      authMethod: 'WEB3_WALLET',
      walletAddress: `0x71C8${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`
    });
    setActiveMode('PROFILE');
  };

  const handleSocialConnect = (provider) => {
    loginUser({
      name: `${provider} Account`,
      handle: `@${provider.toLowerCase()}_user`,
      email: `user@${provider.toLowerCase()}.com`,
      role: roleInput,
      authMethod: `${provider.toUpperCase()}_OAUTH`,
      walletAddress: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`
    });
    setActiveMode('PROFILE');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(6px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '560px',
        width: '100%',
        background: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        padding: '28px',
        position: 'relative',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
        border: '1px solid #E2E8F0',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: '#F1F5F9',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-muted)'
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
            <User size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A' }}>
              {userState.isAuthenticated && activeMode === 'PROFILE' ? 'User Account & Profile' : 'Sign In to Benchtop Market'}
            </h2>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {userState.isAuthenticated && activeMode === 'PROFILE' ? 'Manage your prediction portfolio and identity' : 'Web2 Socials + Web3 Non-Custodial Wallet Authentication'}
            </span>
          </div>
        </div>

        {/* View Switcher Tabs (If Authenticated) */}
        {userState.isAuthenticated && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', background: '#F8FAFC', padding: '4px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <button
              onClick={() => setActiveMode('PROFILE')}
              className={`btn ${activeMode === 'PROFILE' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 1, padding: '6px', fontSize: '0.8rem', borderRadius: '6px' }}
            >
              My Profile
            </button>
            <button
              onClick={() => setActiveMode('SIGNIN')}
              className={`btn ${activeMode === 'SIGNIN' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 1, padding: '6px', fontSize: '0.8rem', borderRadius: '6px' }}
            >
              Switch Account
            </button>
          </div>
        )}

        {/* MODE 1: ACTIVE USER PROFILE */}
        {userState.isAuthenticated && activeMode === 'PROFILE' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            {/* Identity Card */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)', padding: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A' }}>{userState.name}</h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)', fontWeight: '600' }}>
                    {userState.handle} • {userState.email}
                  </span>
                </div>
                <span className="badge badge-purple">{userState.role}</span>
              </div>

              {/* Account Role Selector */}
              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Switch Active Persona & View</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
                  <button
                    onClick={() => {
                      loginUser({ ...userState, role: 'STARTUP FOUNDER' });
                      setActiveTab('HOME');
                    }}
                    className={`btn ${userState.role === 'STARTUP FOUNDER' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ fontSize: '0.75rem', padding: '6px', justifyContent: 'center' }}
                  >
                    🚀 Founder
                  </button>
                  <button
                    onClick={() => {
                      loginUser({ ...userState, role: 'INVESTOR PRO' });
                      setActiveTab('INVESTOR');
                    }}
                    className={`btn ${userState.role === 'INVESTOR PRO' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ fontSize: '0.75rem', padding: '6px', justifyContent: 'center' }}
                  >
                    💼 Investor
                  </button>
                  <button
                    onClick={() => {
                      loginUser({ ...userState, role: 'BETTOR / PREDICTOR' });
                      setActiveTab('BETTING');
                    }}
                    className={`btn ${userState.role === 'BETTOR / PREDICTOR' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ fontSize: '0.75rem', padding: '6px', justifyContent: 'center' }}
                  >
                    📈 Bettor
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-muted)', paddingTop: '10px', marginTop: '12px', borderTop: '1px solid #E2E8F0' }}>
                <Wallet size={14} color="var(--accent-emerald)" />
                <span>Embedded Web3 Address:</span>
                <strong style={{ color: '#0F172A', fontFamily: 'var(--font-mono)' }}>{userState.walletAddress}</strong>
              </div>
            </div>

            {/* Balance & Portfolio Overview */}
            <div style={{ background: 'linear-gradient(135deg, #ECFDF5 0%, #F0F9FF 100%)', border: '1px solid rgba(5, 150, 105, 0.25)', borderRadius: 'var(--radius-md)', padding: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>Available Paper Balance</span>
                  <div style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>
                    ${userState.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                </div>

                <button
                  onClick={() => topUpBalance(5000)}
                  className="btn btn-primary"
                  style={{ padding: '8px 14px', fontSize: '0.8rem', background: 'var(--gradient-yes)' }}
                >
                  <PlusCircle size={15} /> Add $5,000 Funds
                </button>
              </div>

              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                Used to paper-trade on deep tech milestones and fund startup lab testing escrows.
              </p>
            </div>

            {/* User Positions & Activity Summary */}
            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>
                Active Prediction Holdings ({userState.positions ? userState.positions.length : 0})
              </h4>
              {(!userState.positions || userState.positions.length === 0) ? (
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '14px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  No active prediction positions yet. Explore markets to place your first trade!
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {userState.positions.map((pos, idx) => (
                    <div key={idx} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                      <div>
                        <strong style={{ color: pos.outcome === 'YES' ? 'var(--accent-emerald)' : 'var(--accent-crimson)' }}>
                          {pos.outcome} ({pos.shares.toFixed(1)} Shares)
                        </strong>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Avg Price: ${pos.avgPrice.toFixed(2)}</span>
                      </div>
                      <span style={{ fontWeight: '800', fontFamily: 'var(--font-mono)', color: '#0F172A' }}>
                        ${pos.investedUsd.toFixed(2)} USD
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Logout Action */}
            <div style={{ paddingTop: '14px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Authenticated via {userState.authMethod}</span>
              <button
                onClick={logoutUser}
                className="btn btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.75rem', color: 'var(--accent-crimson)', borderColor: 'rgba(239, 68, 68, 0.3)' }}
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>

          </div>
        )}

        {/* MODE 2: SIGN IN / REGISTER SELECTION */}
        {(!userState.isAuthenticated || activeMode === 'SIGNIN') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Role Selection */}
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>Select Your Account Role</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setRoleInput('FOUNDER & INVESTOR')}
                  style={{
                    padding: '8px',
                    borderRadius: '6px',
                    border: roleInput === 'FOUNDER & INVESTOR' ? '2px solid var(--accent-blue)' : '1px solid #CBD5E1',
                    background: roleInput === 'FOUNDER & INVESTOR' ? 'rgba(37, 99, 235, 0.08)' : '#F8FAFC',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    color: '#0F172A',
                    cursor: 'pointer'
                  }}
                >
                  Founder
                </button>
                <button
                  type="button"
                  onClick={() => setRoleInput('INVESTOR PRO')}
                  style={{
                    padding: '8px',
                    borderRadius: '6px',
                    border: roleInput === 'INVESTOR PRO' ? '2px solid var(--accent-purple)' : '1px solid #CBD5E1',
                    background: roleInput === 'INVESTOR PRO' ? 'rgba(124, 58, 237, 0.08)' : '#F8FAFC',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    color: '#0F172A',
                    cursor: 'pointer'
                  }}
                >
                  Investor Pro
                </button>
                <button
                  type="button"
                  onClick={() => setRoleInput('BETTOR / PREDICTOR')}
                  style={{
                    padding: '8px',
                    borderRadius: '6px',
                    border: roleInput === 'BETTOR / PREDICTOR' ? '2px solid var(--accent-emerald)' : '1px solid #CBD5E1',
                    background: roleInput === 'BETTOR / PREDICTOR' ? 'rgba(5, 150, 105, 0.08)' : '#F8FAFC',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    color: '#0F172A',
                    cursor: 'pointer'
                  }}
                >
                  Bettor
                </button>
              </div>
            </div>

            {/* Option A: Web2 Socials */}
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>Option A: Web2 Social & Email (Auto-Generated Wallet)</label>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                <button
                  onClick={() => handleSocialConnect('Google')}
                  className="btn btn-secondary"
                  style={{ padding: '10px', fontSize: '0.825rem', justifyContent: 'center' }}
                >
                  Continue with Google
                </button>
                <button
                  onClick={() => handleSocialConnect('GitHub')}
                  className="btn btn-secondary"
                  style={{ padding: '10px', fontSize: '0.825rem', justifyContent: 'center' }}
                >
                  Continue with GitHub
                </button>
              </div>

              <form onSubmit={handleEmailSubmit} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  required
                  placeholder="Enter work or personal email..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  style={{ flex: 1, padding: '10px', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '0.85rem', outline: 'none' }}
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '10px 16px', fontSize: '0.85rem' }}>
                  Magic Link →
                </button>
              </form>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '4px 0' }}>
              <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>OR</span>
              <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
            </div>

            {/* Option B: Web3 Native Wallet */}
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>Option B: Web3 Native Wallet (SIWE)</label>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  onClick={() => handleWalletConnect('MetaMask')}
                  className="btn btn-secondary"
                  style={{ padding: '12px', fontSize: '0.85rem', justifyContent: 'space-between', background: '#F8FAFC' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Wallet size={18} color="var(--accent-amber)" />
                    <span style={{ fontWeight: '700', color: '#0F172A' }}>MetaMask Wallet</span>
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--accent-blue)' }}>SIWE Sign In</span>
                </button>

                <button
                  onClick={() => handleWalletConnect('WalletConnect')}
                  className="btn btn-secondary"
                  style={{ padding: '12px', fontSize: '0.85rem', justifyContent: 'space-between', background: '#F8FAFC' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShieldCheck size={18} color="var(--accent-blue)" />
                    <span style={{ fontWeight: '700', color: '#0F172A' }}>WalletConnect / Rainbow / Coinbase</span>
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--accent-blue)' }}>QR Code</span>
                </button>
              </div>
            </div>

            <div style={{ background: 'rgba(37, 99, 235, 0.05)', border: '1px solid rgba(37, 99, 235, 0.2)', borderRadius: '8px', padding: '10px 12px', fontSize: '0.75rem', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lock size={14} />
              <span>Privy / Dynamic non-custodial wallet infrastructure automatically provisions on sign in.</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
