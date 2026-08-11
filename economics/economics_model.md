# Benchtop Market: Platform Economics & Financial Model

## 1. Executive Summary & Core Economic Architecture

Benchtop Market is a prediction market and milestone-based crowdfunding platform engineered for deep tech startups. The platform solves the "Valley of Death" funding gap for early-stage physical research (robotics, biotech, battery tech, quantum computing, clean energy) by monetizing crowdsourced market belief to fund independent lab verification.

# Benchtop Market: Platform Economics & Financial Model

## 1. Executive Summary & Core Economic Architecture

Benchtop Market is a prediction market and milestone-based crowdfunding platform engineered for deep tech startups. The platform solves the "Valley of Death" funding gap for early-stage physical research (robotics, biotech, battery tech, quantum computing, clean energy) by monetizing crowdsourced market belief to fund independent lab verification.

Based on empirical Monte Carlo simulations (1,000 iterations across 5 scenarios in [economic_simulation.py](file:///c:/Users/clayg/source/repos/benchtop_market/economics/economic_simulation.py)), the platform operates on an **Investor-Only Freemium Engine**:
1. **Free Startup Listing ($0/mo)**: Zero onboarding friction for deep tech startups, expanding campaign listings by **3.5x** and driving massive market liquidity.
2. **Micro-Take Rates on Prediction Volume**: 3.0% total protocol fee (2.5% Direct Grant Escrow paying certified labs + 0.5% Platform Operations).
3. **Institutional & VC Pro Subscriptions**: High-margin data terminal subscriptions ($399–$799/mo) providing venture investors real-time lab telemetry, crowdsourced due diligence, and deal flow.

---

## 2. Mathematical Economics & Revenue Formulas

### Key Variables

| Symbol | Parameter Description | Default Value / Range |
| :--- | :--- | :--- |
| $V_{total}$ | Total Gross Trading Volume per market | $10,000 – $500,000 |
| $r_{take}$ | Total protocol fee rate on volume | 3.0% |
| $r_{grant}$ | Fraction of take-rate routed to Grant Escrow | 2.5% |
| $r_{plat}$ | Fraction of take-rate routed to Platform Ops | 0.5% |
| $N_{startup}$ | Number of active listing startups | Variable (350+ in freemium model) |
| $F_{startup}$ | Monthly startup subscription fee | **$0 / month** (Freemium) |
| $N_{vc}$ | Number of active VC / Institutional subscribers | Variable (65+ funds) |
| $F_{vc}$ | Monthly VC Pro / Institutional Terminal fee | $399 – $799 / month |
| $E_{target}$ | Target lab cost for milestone testing | $5,000 – $30,000 |

### Core Mathematical Equations

#### 1. Volume-Based Escrow Accumulation
The total direct grant collected for lab testing from trading activity ($E_{collected}$) is:
$$E_{collected} = V_{total} \times r_{grant}$$

#### 2. Platform Gross Revenue ($R_{gross}$)
Total monthly revenue collected by the platform is dominated by platform trading cuts and institutional subscriptions:
$$R_{gross} = \left( \sum_{i=1}^{M} V_i \times r_{plat} \right) + (N_{vc} \times F_{vc})$$

#### 3. Winner Payout Pool ($P_{payout}$)
The pool remaining for winning YES/NO bettors upon oracle resolution:
$$P_{payout} = V_{total} \times (1 - r_{take}) = V_{total} \times 0.97$$

---

## 3. Fee Routing & Escrow Mechanics

```
                         [ TRADING TRANSACTION ($1.00) ]
                                       │
                ┌──────────────────────┴──────────────────────┐
                ▼                                             ▼
     [ WINNER PAYOUT POOL ]                         [ PROTOCOL TAKE-RATE ]
            ($0.97)                                        ($0.03)
                │                                             │
      (Resolved at Market Cut)                  ┌─────────────┴─────────────┐
                │                               ▼                           ▼
                ▼                   [ DIRECT GRANT ESCROW ]        [ PLATFORM REVENUE ]
       [ WINNING BETTORS ]                  ($0.025)                     ($0.005)
                                                │
                                    (Milestone Verified)
                                                │
                                                ▼
                                    [ ACCREDITED TEST LAB ]
                                     (TÜV, UL, IEEE, etc.)
```

### Escrow Release Conditions
1. **Intake / Setup Phase (20% Release)**: Sent directly to certified lab upon sample receipt and benchmark protocol lock.
2. **Completion & Verification Phase (80% Release)**: Sent directly to certified lab upon publishing cryptographically signed test certificate to IPFS/Oracle network.
3. **Refund Condition**: If $E_{collected} < E_{target}$ at market expiration without sponsor matching, liquidity is refunded to market participants pro-rata.

---

## 4. Monte Carlo Simulation Results & Financial Comparison

A 1,000-iteration Monte Carlo simulation was executed across 5 candidate economic models (see [economic_simulation.py](file:///c:/Users/clayg/source/repos/benchtop_market/economics/economic_simulation.py)). 

### Comparative Results Summary (1,000 Monte Carlo Iterations per Scenario)

| Scenario Name | Startup Fee | Investor Pro Fee | Active Startups | Monthly Volume | Platform MRR | Annual ARR | Lab Benchmark Funding Completion Rate |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Baseline Dual-SaaS** | $149/mo | $299/mo | 100 | $18.1M | $120,583 | $1,446,995 | 4.9% (Escrow Only) |
| **2. Investor Freemium** | $0/mo | $399/mo | 350 | $65.7M | $354,463 | $4,253,558 | 6.1% (Escrow Only) |
| **3. Success-Fee Model** | $0 + 3% fee | $299/mo | 300 | $54.6M | $293,708 | $3,524,497 | 5.2% (Escrow Only) |
| **4. Tiered Freemium Model** | $0 / $199 feat. | $299 / $799 inst. | 320 | $60.5M | $344,999 | $4,139,989 | 5.0% (Escrow Only) |
| **5. Path A+C Hybrid** ⭐ | **$0/mo** | **$399 / $799 inst.** | **350** | **$61.7M** | **$363,726** | **$4,364,709** | **48.3% – 81.3% (Sponsor + Trade Escrow)** |

### Key Empirical Findings:

1. **Sponsor Grants Solve the Liquidity Gap**: A 2.5% trade volume cut alone only funds ~5% of $20k lab test targets. Adding direct Sponsor Matching Grants ($12.5k avg match) jumps the benchmark completion rate to **48.3% – 81.3%**.
2. **2.9x ARR Growth**: Zero startup listing fees scale active listing campaigns from 100 to 350+, driving **$61.7M/mo** in volume and increasing annual platform ARR from **$1.45M to $4.36M**.
3. **High-Margin Investor SaaS**: Investor Pro ($399/mo) and Institutional API ($799/mo) subscriptions generate **$55,000+/mo** in predictable subscription MRR.

---

## 5. Game Theory, Anti-Fraud & Security Economics

### 1. Insider Trading & Moral Hazard Protection
* **Restriction**: Startup founders, executives, lab technicians, and immediate families are strictly banned from trading on their own markets.
* **Founder Staking / Collateral**: Startup must stake **$2,500** in platform collateral or vesting tokens. If fraud, sample tampering, or insider trading is proven, 100% of collateral is slashed and awarded to the oracle dispute pool.

### 2. Optimistic Oracle Dispute Economics (UMA Model)
* **Liveness Period**: 7-day challenge window post-test result upload.
* **Bonding Mechanism**: Disputers must stake a minimum bond ($B_{dispute} = \$1,000$).
* **Resolution**: Verified by decentralized consensus or jury of accredited lab engineers. If the challenge succeeds, the disputer gets their bond back + 50% of the slashed founder collateral.

---

## 6. Testing & Simulation Verification Suite

The economic simulation engine is fully operational in code:
* **Script Location**: [economic_simulation.py](file:///c:/Users/clayg/source/repos/benchtop_market/economics/economic_simulation.py)
* **Command**: `python c:\Users\clayg\source\repos\benchtop_market\economics\economic_simulation.py`
* **Features**: Runs 1,000 Monte Carlo iterations per scenario using log-normal market trading distributions, computing escrow success rates, volume cuts, SaaS ARR, and trader friction.

---

## 7. Next Steps & Implementation Roadmap
1. Integrate the Investor-Only Freemium parameters ($0 startup listing, $399 VC Pro / $799 Institutional API, 0.5% platform cut) into the smart contract and backend API.
2. Build the market parameter configuration engine in the UI build plan.

