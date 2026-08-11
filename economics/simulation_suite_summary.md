# Benchtop Market — Quantitative Simulation Suite

This directory contains a 4-part quantitative simulation suite written in Python to evaluate, stress-test, and de-risk the platform's economics, market mechanics, game theory, and due-diligence accuracy.

---

## 1. Executive Summary & Suite Overview

| Simulation Script | Core Problem Tested | Key Quantitative Finding | Strategic Action Item |
| :--- | :--- | :--- | :--- |
| **`economic_simulation.py`** | Platform ARR, MRR, & lab funding completion rates across 5 pricing models. | **Path A+C Hybrid generates $4.36M ARR** and jumps benchmark funding completion from 4.6% to 48.3%–81.3%. | Adopt $0 startup freemium listings + $399 Investor Pro subscriptions + Sponsor Grant matching. |
| **`amm_slippage_sim.py`** | LMSR AMM liquidity depth ($b$), orderbook slippage %, and initial subsidy required. | **$1,732 initial liquidity ($b=2,500$)** holds 1,000 USD trade slippage to 16.8%. | Require $1,500–$2,500 initial liquidity seeding per market (funded via founder stake or sponsor match). |
| **`crowd_wisdom_sim.py`** | Crowd belief score accuracy (Brier Score) under varying ratios of domain experts vs noise traders. | Increasing expert ratio from 10% to 75% **reduces prediction error by 50%+ (Brier Score drops to <0.12)**. | Introduce domain-verified expert badges and reputation-weighted belief scoring. |
| **`optimistic_oracle_sim.py`** | Game-theoretic resistance against fraudulent lab reporting or sample tampering. | **Fraud expected value is -$2,462** (98.5% detection chance during 7-day challenge window, losing $2,500 stake). | Enforce $2,500 founder collateral staking + $1,250 challenger bounty reward on disputes. |

---

## 2. Running the Simulation Suite

Execute any simulation directly via terminal:

```powershell
# 1. Macro Economics & Platform ARR Simulation (1,000 iterations)
python c:\Users\clayg\source\repos\benchtop_market\economics\economic_simulation.py

# 2. AMM Liquidity & Slippage Simulation
python c:\Users\clayg\source\repos\benchtop_market\economics\amm_slippage_sim.py

# 3. Crowd Wisdom & Brier Score Accuracy Simulation (500 markets)
python c:\Users\clayg\source\repos\benchtop_market\economics\crowd_wisdom_sim.py

# 4. Optimistic Oracle Game Theory & Slashing Simulation (1,000 trials)
python c:\Users\clayg\source\repos\benchtop_market\economics\optimistic_oracle_sim.py
```
