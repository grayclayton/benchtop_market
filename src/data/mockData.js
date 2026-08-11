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
    vcIntel: {
      score: 99,
      riskRating: "LOW (Proof-Grade Passed)",
      leadInvestor: "H2 Gen / Modular Array Lithium",
      founderStakedCollateral: 5000,
      sentimentIndex: 96,
      tags: [
        "WSEI Chemistry",
        "Direct Lithium Extraction",
        "100cm² 200-Cycle Gate",
        "Synthetic Seawater"
      ]
    }
  }
];

export const PLATFORM_STATS = {
  totalTradingVolume: 1140000,
  testingFundTotal: 28500,
  verifiedMilestonesCount: 1,
  activeAccreditedLabs: 1,
  vcSubscribers: 86,
  vcMonthlyRevenue: 34314 // 86 subscribers × $399/mo
};
