import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_STARTUPS, PLATFORM_STATS } from '../data/mockData';

const MarketContext = createContext();

const STORAGE_KEY_STARTUPS = 'benchtop_startups_v5';
const STORAGE_KEY_USER = 'benchtop_user_v1';

export function MarketProvider({ children }) {
  // Startups state
  const [startups, setStartups] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_STARTUPS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.some(s => s.id === 'aerosolid-01' || !s.story)) {
          return INITIAL_STARTUPS;
        }
        if (parsed.length > 0) return parsed;
      } catch (e) { console.error(e); }
    }
    return INITIAL_STARTUPS;
  });

  // User account state
  const [userState, setUserState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_USER);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return {
      isAuthenticated: true,
      name: "Dr. Clayton Gray",
      handle: "@clayton_gray",
      email: "clayton@wsei-lithium.com",
      role: "FOUNDER & INVESTOR",
      walletAddress: "0x71C8...4e9A",
      authMethod: "GOOGLE_WEB3",
      balance: 10000.00, // $10,000 starting paper balance
      positions: [],
      tradesHistory: []
    };
  });

  // Global platform statistics
  const [platformStats, setPlatformStats] = useState(PLATFORM_STATS);

  // Active view states
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedStartupId, setSelectedStartupId] = useState('wsei-lithium-bench-01');
  const [activeTab, setActiveTab] = useState('HOME'); // 'HOME', 'BETTING', 'INVESTOR'
  const [inspectingCertificate, setInspectingCertificate] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const isVcPro = activeTab === 'INVESTOR';
  const setIsVcPro = (val) => {
    setActiveTab(val ? 'INVESTOR' : 'BETTING');
  };

  const loginUser = (authData) => {
    setUserState(prev => ({
      ...prev,
      isAuthenticated: true,
      name: authData.name || 'Anonymous Predictor',
      handle: authData.handle || `@user_${Math.floor(Math.random()*10000)}`,
      email: authData.email || 'user@benchtopmarket.org',
      role: authData.role || 'BETTOR',
      walletAddress: authData.walletAddress || `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`,
      authMethod: authData.authMethod || 'EMAIL'
    }));
    setIsAuthModalOpen(false);
  };

  const logoutUser = () => {
    setUserState(prev => ({
      ...prev,
      isAuthenticated: false,
      name: '',
      handle: '',
      email: '',
      walletAddress: ''
    }));
  };

  const topUpBalance = (amountUsd = 5000) => {
    setUserState(prev => ({
      ...prev,
      balance: prev.balance + amountUsd
    }));
  };

  // Persist to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_STARTUPS, JSON.stringify(startups));
  }, [startups]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(userState));
  }, [userState]);

  // Selected startup object getter
  const activeStartup = startups.find(s => s.id === selectedStartupId) || startups[0];

  /**
   * Execute trade on prediction market AMM
   */
  const executeTrade = (startupId, outcome, amountUsd) => {
    const tradeAmount = parseFloat(amountUsd);
    if (isNaN(tradeAmount) || tradeAmount <= 0) return { success: false, message: 'Invalid trade amount' };
    if (userState.balance < tradeAmount) return { success: false, message: 'Insufficient USD balance' };

    // Fee breakdown according to financial model (economics_model.md)
    const protocolFee = tradeAmount * 0.03;      // 3.0% total take-rate
    const labEscrowAlloc = tradeAmount * 0.025;   // 2.5% to Direct Grant Escrow
    const platformOpsAlloc = tradeAmount * 0.005; // 0.5% to Platform Operations
    const payoutPoolAmount = tradeAmount * 0.97;  // 97% to Winner Payout Pool

    setStartups(prevStartups => {
      return prevStartups.map(s => {
        if (s.id !== startupId) return s;

        const currentPrice = outcome === 'YES' ? s.market.yesPrice : s.market.noPrice;
        
        // Calculate shares purchased (Shares = Net Payout Pool / Price)
        const sharesBought = payoutPoolAmount / currentPrice;

        // Dynamic price impact (constant product AMM mock adjustment)
        const priceImpact = Math.min(0.12, (tradeAmount / 20000) * 0.05);
        let newYesPrice, newNoPrice;

        if (outcome === 'YES') {
          newYesPrice = Math.min(0.99, Math.max(0.01, s.market.yesPrice + priceImpact));
          newNoPrice = Math.min(0.99, Math.max(0.01, 1 - newYesPrice));
        } else {
          newNoPrice = Math.min(0.99, Math.max(0.01, s.market.noPrice + priceImpact));
          newYesPrice = Math.min(0.99, Math.max(0.01, 1 - newNoPrice));
        }

        // Round prices to 2 decimals
        newYesPrice = Math.round(newYesPrice * 100) / 100;
        newNoPrice = Math.round(newNoPrice * 100) / 100;

        // Update history for chart
        const newHistoryPoint = {
          time: `Trade #${s.market.totalTrades + 1}`,
          probability: Math.round(newYesPrice * 100)
        };

        const updatedHistory = [...s.market.history, newHistoryPoint].slice(-10);

        return {
          ...s,
          testingLab: {
            ...s.testingLab,
            escrowCollected: s.testingLab.escrowCollected + labEscrowAlloc
          },
          market: {
            ...s.market,
            yesPrice: newYesPrice,
            noPrice: newNoPrice,
            totalVolume: s.market.totalVolume + tradeAmount,
            totalTrades: s.market.totalTrades + 1,
            history: updatedHistory
          }
        };
      });
    });

    // Update user balance & position
    setUserState(prev => {
      const currentPrice = outcome === 'YES' ? activeStartup.market.yesPrice : activeStartup.market.noPrice;
      const sharesBought = payoutPoolAmount / currentPrice;

      const existingIndex = prev.positions.findIndex(p => p.startupId === startupId && p.outcome === outcome);
      let updatedPositions = [...prev.positions];

      if (existingIndex >= 0) {
        const existing = updatedPositions[existingIndex];
        const newTotalShares = existing.shares + sharesBought;
        const newTotalInvested = existing.investedUsd + tradeAmount;
        updatedPositions[existingIndex] = {
          ...existing,
          shares: newTotalShares,
          investedUsd: newTotalInvested,
          avgPrice: newTotalInvested / newTotalShares
        };
      } else {
        updatedPositions.push({
          startupId,
          startupName: activeStartup.name,
          ticker: activeStartup.ticker,
          outcome,
          shares: sharesBought,
          avgPrice: currentPrice,
          investedUsd: tradeAmount
        });
      }

      const tradeRecord = {
        id: `trade-${Date.now()}`,
        startupId,
        startupName: activeStartup.name,
        outcome,
        amountUsd: tradeAmount,
        shares: sharesBought,
        price: currentPrice,
        timestamp: new Date().toLocaleTimeString()
      };

      return {
        ...prev,
        balance: prev.balance - tradeAmount,
        positions: updatedPositions,
        tradesHistory: [tradeRecord, ...prev.tradesHistory]
      };
    });

    // Update platform stats
    setPlatformStats(prev => ({
      ...prev,
      totalTradingVolume: prev.totalTradingVolume + tradeAmount,
      testingFundTotal: prev.testingFundTotal + labEscrowAlloc
    }));

    return { success: true, message: `Trade executed! Bought ${outcome} shares.` };
  };

  /**
   * Add VC / Sponsor matching grant to lab escrow
   */
  const addSponsorMatch = (startupId, sponsorName, amountUsd) => {
    const amount = parseFloat(amountUsd);
    if (isNaN(amount) || amount <= 0) return;

    setStartups(prev => prev.map(s => {
      if (s.id !== startupId) return s;
      return {
        ...s,
        testingLab: {
          ...s.testingLab,
          escrowCollected: s.testingLab.escrowCollected + amount,
          matchingSponsors: [
            ...s.testingLab.matchingSponsors,
            { name: sponsorName || 'Anonymous Sponsor', amount }
          ]
        }
      };
    }));

    setPlatformStats(prev => ({
      ...prev,
      testingFundTotal: prev.testingFundTotal + amount
    }));
  };

  /**
   * Oracle Resolution Simulator
   */
  const resolveMarket = (startupId, winningOutcome) => {
    setStartups(prev => prev.map(s => {
      if (s.id !== startupId) return s;
      return {
        ...s,
        market: {
          ...s.market,
          status: 'RESOLVED',
          yesPrice: winningOutcome === 'YES' ? 1.0 : 0.0,
          noPrice: winningOutcome === 'NO' ? 1.0 : 0.0
        },
        certificate: {
          ...s.certificate,
          verificationStatus: winningOutcome === 'YES' ? 'VERIFIED_PASS' : 'VERIFIED_FAIL'
        },
        testingLab: {
          ...s.testingLab,
          finalReleased: true
        }
      };
    }));

    // Resolve user payouts (Winning shares pay out $1.00 each)
    setUserState(prev => {
      let payoutTotal = 0;
      const remainingPositions = prev.positions.filter(p => {
        if (p.startupId === startupId) {
          if (p.outcome === winningOutcome) {
            payoutTotal += p.shares * 1.00; // $1 per winning share
          }
          return false; // remove resolved position
        }
        return true;
      });

      return {
        ...prev,
        balance: prev.balance + payoutTotal,
        positions: remainingPositions
      };
    });
  };

  /**
   * Create New Startup Campaign ($0 Freemium Model)
   */
  const createCampaign = (newCampaignData) => {
    const newId = `startup-${Date.now()}`;
    const newEntry = {
      id: newId,
      name: newCampaignData.name,
      ticker: newCampaignData.ticker.toUpperCase(),
      category: newCampaignData.category,
      tagline: newCampaignData.tagline,
      story: newCampaignData.storyProblem ? {
        headline: newCampaignData.name,
        subtitle: newCampaignData.tagline,
        problem: newCampaignData.storyProblem,
        solution: newCampaignData.storySolution || '',
        novelty: '',
        keyStats: []
      } : null,
      logoBg: 'linear-gradient(135deg, #00F2FE 0%, #9900F0 100%)',
      milestone: {
        title: newCampaignData.milestoneTitle,
        description: newCampaignData.milestoneDescription,
        targetMetric: newCampaignData.targetMetric,
        deadline: newCampaignData.deadline,
        stage: 'Intake Protocol Pending'
      },
      testingLab: {
        name: newCampaignData.labName,
        accreditation: 'Certified Independent Benchmarking Lab',
        location: 'Global Test Hub',
        escrowTarget: parseFloat(newCampaignData.escrowTarget) || 20000,
        escrowCollected: 0,
        intakeReleased: false,
        finalReleased: false,
        matchingSponsors: []
      },
      market: {
        yesPrice: 0.50,
        noPrice: 0.50,
        totalVolume: 0,
        totalTrades: 0,
        status: 'ACTIVE',
        history: [{ time: 'Launch', probability: 50 }]
      },
      certificate: {
        hash: `0x${Math.random().toString(16).substring(2)}${Math.random().toString(16).substring(2)}`,
        ipfsUri: `ipfs://Qm${Math.random().toString(36).substring(2, 15)}`,
        verificationStatus: 'IN_TESTING',
        livenessDaysRemaining: 7,
        telemetry: [
          { point: 1, val: 50 },
          { point: 2, val: 75 },
          { point: 3, val: 100 }
        ]
      },
      vcIntel: {
        score: 90,
        riskRating: 'MEDIUM',
        leadInvestor: newCampaignData.leadInvestor || 'Stealth Angels',
        founderStakedCollateral: 2500,
        sentimentIndex: 75,
        tags: ['New Freemium Campaign', 'Early Milestone']
      }
    };

    setStartups(prev => [newEntry, ...prev]);
    setSelectedStartupId(newId);
    setIsCreateModalOpen(false);
  };

  /**
   * Reset demo data helper
   */
  const resetDemoState = () => {
    localStorage.removeItem(STORAGE_KEY_STARTUPS);
    localStorage.removeItem(STORAGE_KEY_USER);
    setStartups(INITIAL_STARTUPS);
    setUserState({
      balance: 10000.00,
      positions: [],
      tradesHistory: []
    });
    setPlatformStats(PLATFORM_STATS);
  };

  return (
    <MarketContext.Provider value={{
      startups,
      userState,
      platformStats,
      activeCategory,
      setActiveCategory,
      selectedStartupId,
      setSelectedStartupId,
      activeStartup,
      activeTab,
      setActiveTab,
      isVcPro,
      setIsVcPro,
      isInvestorPro: isVcPro,
      setIsInvestorPro: setIsVcPro,
      inspectingCertificate,
      setInspectingCertificate,
      isCreateModalOpen,
      setIsCreateModalOpen,
      isAuthModalOpen,
      setIsAuthModalOpen,
      loginUser,
      logoutUser,
      topUpBalance,
      executeTrade,
      addSponsorMatch,
      resolveMarket,
      createCampaign,
      resetDemoState
    }}>
      {children}
    </MarketContext.Provider>
  );
}

export function useMarket() {
  return useContext(MarketContext);
}
