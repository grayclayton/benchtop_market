export const INITIAL_STARTUPS = [
  {
    id: "wsei-lithium-bench-01",
    name: "WSEI Lithium (H2 Gen)",
    ticker: "WSEI",
    category: "Clean Tech / DLE",
    tagline: "Wave-powered ocean lithium extraction — no pumps, no membranes, just the ocean.",
    story: {
      headline: "The Lithium Eel",
      subtitle: "Harvesting lithium from seawater using nothing but ocean waves.",
      problem: "The world needs 3× more lithium by 2030 for batteries and EVs. Today's supply comes from brine evaporation ponds (slow, land-intensive) and hard-rock mining (high-carbon). Meanwhile, the ocean holds 230 billion tonnes of dissolved lithium — 10,000× current reserves — but no technology can extract it economically.",
      solution: "The Lithium Eel is a modular marine device that uses Wave-Synchronized Electrochemical Intercalation (WSEI). Ocean waves flex a piezoelectric core, generating voltage that drives lithium ions into a solid-state selective electrode. No pumps. No membranes. No external power. The ocean does the work.",
      novelty: "Traditional direct lithium extraction tries to force seawater through nano-scale filters — but that requires 5,800–32,600 Pa of pressure against a 10 Pa wave budget. WSEI sidesteps filtration entirely. Instead, it uses open millimetric flow channels lined with lithium-sieve/LMO composite electrodes. An AC voltage synchronized with wave flexure alternately adsorbs lithium from seawater and desorbs it into a concentrate stream.",
      keyStats: [
        { label: "Ocean Lithium Reserve", value: "230 billion tonnes" },
        { label: "Bench Test Result", value: "All 7 gates PASSED" },
        { label: "Li/Na Selectivity", value: "1.77 million ×" },
        { label: "Faradaic Efficiency", value: "99.25%" }
      ],
      sourceRepo: "C:\\Users\\clayg\\source\\repos\\h2_gen\\modular_array_lithium"
    },
    logoBg: "linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%)",
    milestone: {
      title: "WSEI Beaker-Cell 200-Cycle Proof Gate",
      simpleMetric: "Pass All 7 Lab Quality & Safety Gates (Li Purity, Zero Toxic Byproducts)",
      technicalMetric: "Li/Na Selectivity ≥ 1e5x, Faradaic Efficiency ≥ 90%, Mn dissolution ≤ 0.10 µmol/m²",
      traderSummary: "Will WSEI's 200-cycle bench test meet all lab safety, lithium purity, and extraction efficiency standards?",
      description: "100 cm² beaker-cell electrochemical lithium extraction benchmark using synthetic seawater. Measures ion selectivity, energy efficiency, structural stability, and safety.",
      targetMetric: "100% Pass across 7 Lab Gates",
      deadline: "2026-09-30",
      stage: "Lab Telemetry Verification",
      testDirectory: "C:\\Users\\clayg\\source\\repos\\h2_gen\\modular_array_lithium\\bench_test"
    },
    testingLab: {
      name: "H2 Gen Modular Array Lithium Bench Lab",
      accreditation: "Proof-Grade Electrochemical & ICP-OES / ICP-MS Metrology",
      location: "C:\\Users\\clayg\\source\\repos\\h2_gen\\modular_array_lithium\\bench_test",
      escrowTarget: 30000,
      escrowCollected: 28500,
      intakeReleased: true, // 20% release done
      finalReleased: false,
      matchingSponsors: [
        { name: "Breakthrough Energy Ventures", amount: 10000 },
        { name: "DOE Clean Energy Accelerator", amount: 8500 }
      ]
    },
    market: {
      yesPrice: 0.94,
      noPrice: 0.06,
      totalVolume: 1140000, // 2.5% of 1.14M = $28,500
      totalTrades: 2410,
      status: "ACTIVE",
      history: [
        { time: "Cycle 20", probability: 65 },
        { time: "Cycle 60", probability: 72 },
        { time: "Cycle 100", probability: 80 },
        { time: "Cycle 140", probability: 86 },
        { time: "Cycle 180", probability: 91 },
        { time: "Cycle 200", probability: 94 }
      ]
    },
    certificate: {
      hash: "0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b",
      ipfsUri: "ipfs://QmWSEILithiumBeakerCellBenchTestProof",
      verificationStatus: "VERIFIED_PASS",
      livenessDaysRemaining: 2,
      testDirectory: "C:\\Users\\clayg\\source\\repos\\h2_gen\\modular_array_lithium\\bench_test",
      telemetry: [
        { gate: "Li/Na Selectivity", measured: "1,772,110x", target: ">= 100,000x", pass: true },
        { gate: "Li Faradaic Efficiency", measured: "99.25%", target: ">= 90.0%", pass: true },
        { gate: "Li Molar Purity", measured: "98.66%", target: ">= 90.0%", pass: true },
        { gate: "Li Enrichment", measured: "15.02x", target: ">= 10.0x", pass: true },
        { gate: "Mn Dissolution Rate", measured: "0.007 μmol/m²-cyc", target: "<= 0.10 μmol/m²-cyc", pass: true },
        { gate: "Hypochlorite (Cl2)", measured: "0.00 mg/L", target: "<= 0.10 mg/L", pass: true },
        { gate: "Recovered Li Signal", measured: "2,707.1 μg/L", target: ">= 20.0 μg/L", pass: true }
      ]
    },
    founderVerification: {
      status: "VERIFIED_FOUNDER",
      level: "LEVEL_3_LAB_PASSED",
      tierLabel: "Level 3 Verified Founder",
      isIdentityVerified: true,
      isCorporateEntityVerified: true,
      isCollateralBondStaked: true,
      stakedAmount: 2500,
      isPatentVerified: true,
      verificationBadge: "🛡️ Verified Founder"
    },
    investorIntel: {
      score: 94,
      riskRating: "LOW-MEDIUM",
      leadInvestor: "Stealth Energy Angel Syndicate",
      founderStakedCollateral: 2500,
      sentimentIndex: 88,
      tags: ["Clean Tech / DLE", "Wave Energy", "7/7 Gates Passed", "Patent Pending"],
      team: {
        founder: "Dr. Clayton Gray",
        role: "Founder & Chief Electrochemist",
        bio: "Former marine electrochemistry researcher. Specialist in wave-synchronized intercalation & DLE fluid dynamics.",
        teamSize: "4 Full-Time Engineers",
        patentsFiled: ["WSEI Wave-Synchronized Intercalation Architecture", "Self-Cleaning Conducting Graphene Skin"],
        openRound: "Seed Round ($1.5M Target — $500k Soft Committed)",
        founderEmail: "clayton@wsei-lithium.com",
        linkedin: "https://linkedin.com/in/clayton-gray-dlt"
      }
    }
  },
  {
    id: "benchtop-market-platform",
    name: "Benchtop Market Protocol",
    ticker: "BENCH",
    category: "Fintech / Protocol",
    tagline: "Crowdsourced due diligence platform funding deep tech lab milestones.",
    story: {
      headline: "Benchtop Market",
      subtitle: "Can a prediction market predict its own platform growth?",
      problem: "Deep tech startups face a 3-year 'Valley of Death' funding lab benchmarks, while investors lack verified crowdsourced due diligence signals.",
      solution: "Benchtop Market monetizes speculative trading volume (2.5% escrow + 0.5% protocol fee) to fund accredited lab testing, while selling $399/mo Investor Pro intelligence subscriptions.",
      novelty: "The first prediction market where trade volume directly funds the lab benchmark that resolves the market, paired with an institutional deal-sourcing terminal.",
      keyStats: [
        { label: "Target Platform ARR", value: "$4.36M" },
        { label: "Startup Fee", value: "$0 Freemium" },
        { label: "Investor Pro Tier", value: "$399 / mo" },
        { label: "Phase 1 Goal", value: "5 External Startups" }
      ],
      sourceRepo: "https://github.com/grayclayton/benchtop_market"
    },
    logoBg: "linear-gradient(135deg, #7C3AED 0%, #2563EB 100%)",
    milestone: {
      title: "Onboard First 5 External Deep-Tech Startups",
      simpleMetric: "Onboard 5 Verified Hardware/Clean-Tech Startups by Q4 2026",
      technicalMetric: "5 External Startup Onboardings + 10 Investor Pro Subscribers ($3,990 MRR)",
      traderSummary: "Will Benchtop Market successfully onboard 5 external deep-tech startups and reach $3.9k MRR by Q4 2026?",
      description: "Platform growth milestone: Onboard 5 verified external hardware/clean-tech startups onto Benchtop Market and convert 10 paying Investor Pro subscribers.",
      targetMetric: "5 External Startups & 10 Investor Subscribers",
      deadline: "2026-12-31",
      stage: "Active Execution"
    },
    testingLab: {
      name: "Benchtop Protocol Governance & Audit Committee",
      accreditation: "On-Chain Smart Contract Audit & Investor Advisory Board",
      location: "https://github.com/grayclayton/benchtop_market",
      escrowTarget: 20000,
      escrowCollected: 14500,
      intakeReleased: false,
      finalReleased: false,
      matchingSponsors: [
        { name: "Clean Tech Founder Syndicate", amount: 7500 },
        { name: "Web3 Science Fund", amount: 7000 }
      ]
    },
    market: {
      yesPrice: 0.78,
      noPrice: 0.22,
      totalVolume: 580000,
      totalTrades: 1240,
      status: "ACTIVE",
      history: [
        { time: "Launch", probability: 50 },
        { time: "Week 2", probability: 62 },
        { time: "Week 4", probability: 70 },
        { time: "Week 6", probability: 78 }
      ]
    },
    certificate: {
      hash: "0x8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e",
      ipfsUri: "ipfs://QmBenchtopMarketPlatformPhase1Milestone",
      verificationStatus: "IN_TESTING",
      livenessDaysRemaining: 14,
      telemetry: [
        { gate: "GitHub Repository Live", measured: "Pushed (23 files)", target: "Public & Verified", pass: true },
        { gate: "Monte Carlo ARR Model", measured: "$4.36M ARR Proved", target: "ARR > $1.0M", pass: true },
        { gate: "WSEI Lighthouse Campaign", measured: "Active (7/7 Gates Passed)", target: "1 Active Campaign", pass: true },
        { gate: "External Startups Onboarded", measured: "1 of 5 Onboarded", target: "5 Startups", pass: false },
        { gate: "Investor Pro Subscribers", measured: "2 of 10 Converted", target: "10 Subscribers", pass: false }
      ]
    },
    founderVerification: {
      status: "VERIFIED_FOUNDER",
      level: "LEVEL_3_LAB_PASSED",
      tierLabel: "Level 3 Verified Protocol",
      isIdentityVerified: true,
      isCorporateEntityVerified: true,
      isCollateralBondStaked: true,
      stakedAmount: 5000,
      isPatentVerified: true,
      verificationBadge: "🛡️ Verified Protocol"
    },
    investorIntel: {
      score: 92,
      riskRating: "LOW-MEDIUM",
      leadInvestor: "Antigravity & Benchtop Founders",
      founderStakedCollateral: 5000,
      sentimentIndex: 82,
      tags: ["Fintech / Protocol", "Prediction Market", "Phase 1 Growth", "DeSci / ReFi"],
      team: {
        founder: "Clayton Gray",
        role: "Platform Creator & Lead Architect",
        bio: "Creator of Benchtop Market & WSEI Lithium Extraction. Architect of crowdsourced due diligence and lab escrow protocols.",
        teamSize: "Core Platform Team",
        patentsFiled: ["Direct Grant Escrow Volume Cut Protocol", "Tiered Due Diligence Telemetry Access"],
        openRound: "Platform Pre-Seed ($500k Target)",
        founderEmail: "clayton@benchtopmarket.org",
        linkedin: "https://linkedin.com/in/clayton-gray-dlt"
      }
    },
    vcIntel: {
      score: 92,
      riskRating: "LOW-MEDIUM",
      leadInvestor: "Antigravity & Benchtop Founders",
      founderStakedCollateral: 5000,
      sentimentIndex: 82,
      tags: ["Fintech / Protocol", "Prediction Market", "Phase 1 Growth", "DeSci / ReFi"]
    }
  }
];

export const PLATFORM_STATS = {
  totalTradingVolume: 1140000,
  testingFundTotal: 28500,
  verifiedMilestonesCount: 1,
  activeAccreditedLabs: 1,
  investorSubscribers: 86,
  investorMonthlyRevenue: 34314 // 86 subscribers × $399/mo
};
