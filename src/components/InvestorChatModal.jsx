import React, { useState } from 'react';
import { useMarket } from '../context/MarketContext';
import { 
  X, 
  MessageSquare, 
  Send, 
  Briefcase, 
  CheckCircle2, 
  DollarSign, 
  Building 
} from 'lucide-react';

export default function InvestorChatModal() {
  const { isInvestorChatOpen, setIsInvestorChatOpen, activeStartupForChat } = useMarket();

  const [messageText, setMessageText] = useState('');
  const [softCommitAmount, setSoftCommitAmount] = useState('50000');
  const [messagesHistory, setMessagesHistory] = useState([
    {
      sender: 'Dr. Clayton Gray (Founder)',
      time: '10:14 AM',
      text: 'Welcome to the WSEI Lithium due diligence channel! Happy to answer technical questions regarding our 7-gate bench test results or upcoming flow-cell array scale-up.',
      isFounder: true
    }
  ]);
  const [sentNotice, setSentNotice] = useState(null);

  if (!isInvestorChatOpen || !activeStartupForChat) return null;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    setMessagesHistory(prev => [
      ...prev,
      {
        sender: 'Investor Pro Subscriber',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: messageText,
        isFounder: false
      }
    ]);

    setMessageText('');
    setSentNotice('Message delivered to founder! You will receive an email copy at your registered address.');
    setTimeout(() => setSentNotice(null), 3000);
  };

  const handleSoftCommit = () => {
    const amount = parseFloat(softCommitAmount) || 50000;
    setMessagesHistory(prev => [
      ...prev,
      {
        sender: 'Investor Pro Subscriber',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `💰 SOFT COMMITMENT NOTICE: Submitted a non-binding soft commitment of $${amount.toLocaleString()} USD for the upcoming Seed round.`,
        isFounder: false,
        isCommit: true
      }
    ]);
    setSentNotice(`Soft commitment of $${amount.toLocaleString()} USD recorded! Founder notified.`);
    setTimeout(() => setSentNotice(null), 3500);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsInvestorChatOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '28px', maxWidth: '620px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #7C3AED 0%, #2563EB 100%)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageSquare size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A' }}>
                  Direct Founder Chat — {activeStartupForChat.name}
                </h3>
                <span className="badge badge-purple">Investor Pro</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Direct due diligence channel with {activeStartupForChat.investorIntel?.team?.founder || 'Founder'}
              </p>
            </div>
          </div>

          <button onClick={() => setIsInvestorChatOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Startup Overview Pill */}
        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '12px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
          <div>
            <strong style={{ color: '#0F172A' }}>Open Round:</strong> {activeStartupForChat.investorIntel?.team?.openRound || 'Seed Round'}
          </div>
          <span style={{ color: 'var(--accent-blue)', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>
            Score: {activeStartupForChat.investorIntel?.score || 94}/100
          </span>
        </div>

        {/* Chat Messages Feed */}
        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '14px', height: '240px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
          {messagesHistory.map((msg, idx) => (
            <div 
              key={idx}
              style={{
                alignSelf: msg.isFounder ? 'flex-start' : 'flex-end',
                maxWidth: '85%',
                background: msg.isCommit ? '#ECFDF5' : msg.isFounder ? '#FFFFFF' : 'var(--gradient-brand)',
                color: msg.isCommit ? '#0F172A' : msg.isFounder ? '#0F172A' : '#FFFFFF',
                border: msg.isCommit ? '1px solid var(--accent-emerald)' : msg.isFounder ? '1px solid #E2E8F0' : 'none',
                borderRadius: '12px',
                padding: '10px 14px',
                fontSize: '0.825rem',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
              }}
            >
              <div style={{ fontSize: '0.68rem', opacity: 0.8, marginBottom: '4px', fontWeight: '700', display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                <span>{msg.sender}</span>
                <span>{msg.time}</span>
              </div>
              <p style={{ margin: 0, lineHeight: 1.45 }}>{msg.text}</p>
            </div>
          ))}
        </div>

        {sentNotice && (
          <div style={{ background: 'rgba(5, 150, 105, 0.12)', border: '1px solid var(--accent-emerald)', borderRadius: '6px', padding: '8px 12px', color: 'var(--accent-emerald)', fontSize: '0.78rem', marginBottom: '14px', textAlign: 'center', fontWeight: '600' }}>
            {sentNotice}
          </div>
        )}

        {/* Send Message Input */}
        <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <input
            type="text"
            required
            placeholder="Type technical question or due diligence inquiry..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            style={{ flex: 1, padding: '10px 14px', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem', outline: 'none' }}
          />
          <button type="submit" className="btn btn-primary" style={{ padding: '10px 18px', fontSize: '0.85rem' }}>
            <Send size={15} /> Send
          </button>
        </form>

        {/* Soft Commitment Action Box */}
        <div style={{ background: 'rgba(5, 150, 105, 0.05)', border: '1px solid rgba(5, 150, 105, 0.25)', borderRadius: '8px', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent-emerald)', display: 'block' }}>Soft Seed Commitment</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Non-binding interest indication</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <select
              value={softCommitAmount}
              onChange={(e) => setSoftCommitAmount(e.target.value)}
              style={{ padding: '6px 10px', background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}
            >
              <option value="25000">$25,000</option>
              <option value="50000">$50,000</option>
              <option value="100000">$100,000</option>
              <option value="250000">$250,000</option>
            </select>
            <button
              onClick={handleSoftCommit}
              className="btn btn-primary"
              style={{ padding: '6px 12px', fontSize: '0.78rem', background: 'var(--gradient-yes)' }}
            >
              Submit Soft Commit
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
