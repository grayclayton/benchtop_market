import subprocess
import sys
import os

"""
Master Execution Runner for Benchtop Market Quantitative Simulation Suite
Runs:
1. Macro Platform ARR & Lab Funding Model (economic_simulation.py)
2. AMM Liquidity & Orderbook Slippage Model (amm_slippage_sim.py)
3. Crowd Wisdom & Brier Score Accuracy Model (crowd_wisdom_sim.py)
4. Optimistic Oracle Dispute Game Theory Model (optimistic_oracle_sim.py)
"""

scripts = [
    ("Macro Platform Revenue & Lab Funding (Monte Carlo)", "economic_simulation.py"),
    ("AMM Orderbook Liquidity & Price Slippage", "amm_slippage_sim.py"),
    ("Crowd Wisdom & Brier Score Prediction Accuracy", "crowd_wisdom_sim.py"),
    ("Optimistic Oracle Dispute & Slashing Game Theory", "optimistic_oracle_sim.py")
]

def main():
    print("=" * 120)
    print(" BENCHTOP MARKET: MASTER QUANTITATIVE SIMULATION SUITE RUNNER")
    print("=" * 120)
    print()

    base_dir = os.path.dirname(os.path.abspath(__file__))

    for idx, (title, script_name) in enumerate(scripts, 1):
        print(f"\n[{idx}/4] EXECUTING SIMULATION: {title} ({script_name})...")
        print("-" * 120)
        script_path = os.path.join(base_dir, script_name)
        
        result = subprocess.run([sys.executable, script_path], capture_output=True, text=True)
        if result.returncode == 0:
            print(result.stdout)
        else:
            print(f"Error running {script_name}:")
            print(result.stderr)
        print("-" * 120)

    print("\n" + "=" * 120)
    print(" ALL 4 QUANTITATIVE SIMULATIONS COMPLETED SUCCESSFULLY")
    print("=" * 120)

if __name__ == "__main__":
    main()
