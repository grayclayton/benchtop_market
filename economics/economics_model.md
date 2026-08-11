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

### Comparative Results Summary

| Scenario Name | Startup Fee | VC Pro Fee | Active Startups | Monthly Volume | Platform MRR | Annual ARR | Monthly Lab Grant Funding |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Baseline Dual-SaaS** | $149/mo | $299/mo | 100 | $19.3M | $126,521 | $1,518,252 | $483,355 |
| **2. Investor-Only Freemium** ⭐ | **$0/mo** | **$399/mo** | **350** | **$64.8M** | **$349,965** | **$4,199,580** | **$1,620,150** |
| **3. Success-Fee Model** | $0 + 3% fee | $299/mo | 300 | $55.2M | $297,262 | $3,567,143 | $1,380,312 |
| **4. High-Volume Low-Friction** | $0/mo | $199/mo | 400 | $89.7M | $239,252 | $2,871,024 | $1,794,616 |
| **5. Tiered Freemium Model** | $0 / $199 feat. | $299 / $799 inst. | 320 | $58.3M | $333,788 | $4,005,458 | $1,456,861 |

### Key Empirical Findings:
1. **2.7x Revenue Growth**: Removing monthly fees for startups increases platform ARR from **$1.52M to $4.20M**. Zero startup friction scales active listing campaigns from 100 to 350+, driving **$64.8M/mo** in trading volume.
2. **Dominant Volume Cut**: Platform trading fees (0.5%) generate over **85% of total MRR** ($324,000/mo) in the Freemium model, dwarf SaaS subscriptions.
3. **3.3x Lab Funding Output**: Lab grant funding to accredited test facilities scales from **$483k/mo to $1.62M/mo**, maximizing non-dilutive research funding.

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

