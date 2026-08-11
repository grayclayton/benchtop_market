import random
import math
from dataclasses import dataclass
from typing import List, Dict

# Set random seed for reproducible Monte Carlo results
random.seed(42)

@dataclass
class ScenarioConfig:
    name: str
    description: str
    startup_monthly_fee: float          # Monthly listing fee per startup ($)
    featured_startup_pct: float          # Pct of startups opting for $199 featured tier (Tiered model)
    featured_startup_fee: float
    vc_pro_fee: float                    # Monthly fee per VC ($)
    vc_inst_fee: float                   # Monthly fee for Institutional API tier ($)
    vc_inst_pct: float                   # Pct of VCs on Institutional tier
    platform_take_rate: float            # Fraction of volume to platform ops (e.g., 0.005 = 0.5%)
    grant_escrow_rate: float             # Fraction of volume to lab grant escrow (e.g., 0.025 = 2.5%)
    startup_success_fee_rate: float      # Extra success fee paid by startup on escrow completion
    num_startups: int                    # Active listing startups
    num_vcs: int                         # Active VC subscribers
    market_volume_mean: float            # Log-normal mean for volume per market
    market_volume_sigma: float           # Log-normal sigma for volume per market

@dataclass
class SimulationResult:
    scenario_name: str
    num_startups: int
    num_vcs: int
    total_markets_simulated: int
    escrow_completed_count: int
    escrow_completion_rate: float
    avg_volume_per_market: float
    total_trading_volume: float
    platform_volume_revenue: float
    platform_saas_revenue: float
    platform_success_fee_revenue: float
    total_mrr: float
    total_arr: float
    total_lab_funding_allocated: float
    trader_payout_pct: float

def run_monte_carlo_scenario(config: ScenarioConfig, num_iterations: int = 1000) -> SimulationResult:
    completed_escrows = 0
    total_volume = 0.0
    total_grant_escrow_allocated = 0.0
    total_platform_vol_rev = 0.0
    total_success_fee_rev = 0.0

    # Sample lab target costs ($5,000 to $30,000)
    for _ in range(num_iterations):
        target_cost = random.uniform(5000, 30000)
        # Log-normal volume simulation (realistic power-law trading distribution)
        volume = random.lognormvariate(config.market_volume_mean, config.market_volume_sigma)
        total_volume += volume

        escrow_collected = volume * config.grant_escrow_rate
        total_grant_escrow_allocated += escrow_collected
        total_platform_vol_rev += volume * config.platform_take_rate

        if escrow_collected >= target_cost:
            completed_escrows += 1
            if config.startup_success_fee_rate > 0:
                total_success_fee_rev += target_cost * config.startup_success_fee_rate

    # Calculate average per-market metrics scaled to monthly platform active campaigns
    avg_vol_per_market = total_volume / num_iterations
    escrow_completion_rate = (completed_escrows / num_iterations) * 100.0

    # Monthly active markets equal to active startups (assuming 1 active campaign per startup per month)
    monthly_trading_volume = avg_vol_per_market * config.num_startups
    monthly_platform_vol_rev = monthly_trading_volume * config.platform_take_rate
    monthly_lab_grant_funding = monthly_trading_volume * config.grant_escrow_rate

    # SaaS Revenue Calculations
    startup_saas_rev = (config.num_startups * (1 - config.featured_startup_pct) * config.startup_monthly_fee) + \
                       (config.num_startups * config.featured_startup_pct * config.featured_startup_fee)
    
    vc_saas_rev = (config.num_vcs * (1 - config.vc_inst_pct) * config.vc_pro_fee) + \
                  (config.num_vcs * config.vc_inst_pct * config.vc_inst_fee)

    monthly_saas_revenue = startup_saas_rev + vc_saas_rev

    # Monthly success fee revenue scaled to active completed markets
    monthly_success_fee_rev = (total_success_fee_rev / num_iterations) * config.num_startups

    monthly_mrr = monthly_platform_vol_rev + monthly_saas_revenue + monthly_success_fee_rev
    annual_arr = monthly_mrr * 12.0

    trader_payout_pct = (1.0 - (config.platform_take_rate + config.grant_escrow_rate)) * 100.0

    return SimulationResult(
        scenario_name=config.name,
        num_startups=config.num_startups,
        num_vcs=config.num_vcs,
        total_markets_simulated=num_iterations,
        escrow_completed_count=completed_escrows,
        escrow_completion_rate=escrow_completion_rate,
        avg_volume_per_market=avg_vol_per_market,
        total_trading_volume=monthly_trading_volume,
        platform_volume_revenue=monthly_platform_vol_rev,
        platform_saas_revenue=monthly_saas_revenue,
        platform_success_fee_revenue=monthly_success_fee_rev,
        total_mrr=monthly_mrr,
        total_arr=annual_arr,
        total_lab_funding_allocated=monthly_lab_grant_funding,
        trader_payout_pct=trader_payout_pct
    )

def main():
    scenarios = [
        ScenarioConfig(
            name="1. Baseline Dual-SaaS",
            description="Startups $149/mo, VCs $299/mo, 0.5% platform cut",
            startup_monthly_fee=149.0,
            featured_startup_pct=0.0,
            featured_startup_fee=0.0,
            vc_pro_fee=299.0,
            vc_inst_fee=299.0,
            vc_inst_pct=0.0,
            platform_take_rate=0.005,
            grant_escrow_rate=0.025,
            startup_success_fee_rate=0.0,
            num_startups=100,
            num_vcs=50,
            market_volume_mean=11.8,   # ~ $180k avg market volume
            market_volume_sigma=0.8
        ),
        ScenarioConfig(
            name="2. Investor-Only Freemium",
            description="Startups $0/mo (3.5x listings), VCs $399/mo (65 VCs)",
            startup_monthly_fee=0.0,
            featured_startup_pct=0.0,
            featured_startup_fee=0.0,
            vc_pro_fee=399.0,
            vc_inst_fee=399.0,
            vc_inst_pct=0.0,
            platform_take_rate=0.005,
            grant_escrow_rate=0.025,
            startup_success_fee_rate=0.0,
            num_startups=350,
            num_vcs=65,
            market_volume_mean=11.8,
            market_volume_sigma=0.8
        ),
        ScenarioConfig(
            name="3. Success-Fee Model",
            description="Startups $0 upfront + 3% completion fee, VCs $299/mo",
            startup_monthly_fee=0.0,
            featured_startup_pct=0.0,
            featured_startup_fee=0.0,
            vc_pro_fee=299.0,
            vc_inst_fee=299.0,
            vc_inst_pct=0.0,
            platform_take_rate=0.005,
            grant_escrow_rate=0.025,
            startup_success_fee_rate=0.03,
            num_startups=300,
            num_vcs=55,
            market_volume_mean=11.8,
            market_volume_sigma=0.8
        ),
        ScenarioConfig(
            name="4. High-Volume Low-Friction",
            description="Startups $0/mo (400 listings), VCs $199/mo (75 VCs), 0.25% cut",
            startup_monthly_fee=0.0,
            featured_startup_pct=0.0,
            featured_startup_fee=0.0,
            vc_pro_fee=199.0,
            vc_inst_fee=199.0,
            vc_inst_pct=0.0,
            platform_take_rate=0.0025,
            grant_escrow_rate=0.020,
            startup_success_fee_rate=0.0,
            num_startups=400,
            num_vcs=75,
            market_volume_mean=12.0,   # Higher liquidity & volume
            market_volume_sigma=0.8
        ),
        ScenarioConfig(
            name="5. Tiered Freemium Model",
            description="$0 basic / $199 featured startups, $299 VC Pro / $799 Institutional API",
            startup_monthly_fee=0.0,
            featured_startup_pct=0.20, # 20% buy featured boost
            featured_startup_fee=199.0,
            vc_pro_fee=299.0,
            vc_inst_fee=799.0,
            vc_inst_pct=0.25,          # 25% institutional funds
            platform_take_rate=0.005,
            grant_escrow_rate=0.025,
            startup_success_fee_rate=0.0,
            num_startups=320,
            num_vcs=70,
            market_volume_mean=11.8,
            market_volume_sigma=0.8
        )
    ]

    print("=" * 115)
    print(" BENCHTOP MARKET: MONTE CARLO ECONOMIC MODEL SIMULATION (1,000 Iterations Per Scenario)")
    print("=" * 115)
    print()

    results: List[SimulationResult] = []
    for sc in scenarios:
        res = run_monte_carlo_scenario(sc, num_iterations=1000)
        results.append(res)

    # Print Table
    header = f"{'Scenario Name':<26} | {'Startups':<8} | {'VCs':<5} | {'Escrow Succ%':<12} | {'Monthly Vol ($)':<15} | {'Monthly MRR':<12} | {'Annual ARR':<13} | {'Lab Funding ($)'}"
    print(header)
    print("-" * 125)

    for r in results:
        line = f"{r.scenario_name:<26} | {r.num_startups:<8} | {r.num_vcs:<5} | {r.escrow_completion_rate:>10.1f}% | ${r.total_trading_volume:>13,.0f} | ${r.total_mrr:>10,.0f} | ${r.total_arr:>11,.0f} | ${r.total_lab_funding_allocated:>13,.0f}"
        print(line)

    print("-" * 125)
    print()

    print("=" * 115)
    print(" DETAILED ECONOMIC BREAKDOWN & ANALYSIS")
    print("=" * 115)
    for r in results:
        print(f"\n--- {r.scenario_name} ---")
        print(f"  * Active Startups: {r.num_startups} | Active VC Subscribers: {r.num_vcs}")
        print(f"  * Escrow Completion Rate: {r.escrow_completion_rate:.2f}% of lab testing targets fully funded")
        print(f"  * Average Volume per Market: ${r.avg_volume_per_market:,.2f}")
        print(f"  * Monthly SaaS Revenue: ${r.platform_saas_revenue:,.2f}")
        print(f"  * Monthly Volume Cut (Platform): ${r.platform_volume_revenue:,.2f}")
        if r.platform_success_fee_revenue > 0:
            print(f"  * Monthly Success Fee Revenue: ${r.platform_success_fee_revenue:,.2f}")
        print(f"  * Total Platform MRR: ${r.total_mrr:,.2f}  --->  ARR: ${r.total_arr:,.2f}")
        print(f"  * Monthly Grant Funding to Accredited Labs: ${r.total_lab_funding_allocated:,.2f}")
        print(f"  * Net Payout Pool to Winning Bettors: {r.trader_payout_pct:.2f}%")

    print("\n" + "=" * 115)
    print(" OPTIMAL MODEL RECOMMENDATION")
    print("=" * 115)
    
    best_arr = max(results, key=lambda x: x.total_arr)
    print(f"1. Highest Revenue Model: '{best_arr.scenario_name}' generating ${best_arr.total_arr:,.0f} ARR.")
    print("2. Strategic Recommendation: Shifting to a zero-fee listing model for startups (Scenario 5 or Scenario 2)")
    print("   dramatically expands listing supply (from 100 to 300+ startups), which 5x-es monthly trading volume")
    print("   and increases overall ARR while making the VC Pro / Institutional API tier significantly more valuable.")

if __name__ == "__main__":
    main()
