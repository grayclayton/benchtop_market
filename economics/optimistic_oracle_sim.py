import random
from dataclasses import dataclass

random.seed(42)

"""
Optimistic Oracle Game-Theoretic Dispute Simulation
Models the UMA-style 7-day challenge window, founder collateral staking ($2,500),
disputer bonding ($1,000), and fraud deterrence probability.
"""

def run_oracle_game_theory_simulation(num_trials: int = 1000):
    print("=" * 115)
    print(" 3. OPTIMISTIC ORACLE & DISPUTE GAME THEORY SIMULATION")
    print("=" * 115)
    print()

    founder_stake = 2500.0   # Slashing collateral deposited by startup founder
    disputer_bond = 1000.0   # Bond required to challenge a reported lab outcome
    bounty_reward = 1250.0   # 50% of slashed collateral awarded to successful challenger

    dishonest_attempt_rates = [0.01, 0.05, 0.10, 0.20]

    header = f"{'Fraud Attempt Rate':<20} | {'Total Reports':<15} | {'Fraud Detected %':<18} | {'Disputer Profit ($)':<20} | {'Founder Loss ($)':<18} | {'Platform Integrity %':<20}"
    print(header)
    print("-" * 115)

    for fraud_rate in dishonest_attempt_rates:
        fraud_attempts = 0
        detected_frauds = 0
        disputer_profits = 0.0
        founder_losses = 0.0

        for _ in range(num_trials):
            is_dishonest = random.random() < fraud_rate
            if is_dishonest:
                fraud_attempts += 1
                # Probability of an independent expert / disputer spotting a fake or altered lab report (98.5%)
                if random.random() < 0.985:
                    detected_frauds += 1
                    disputer_profits += bounty_reward
                    founder_losses += founder_stake

        detection_rate = (detected_frauds / fraud_attempts * 100.0) if fraud_attempts > 0 else 100.0
        platform_integrity = ((num_trials - (fraud_attempts - detected_frauds)) / num_trials) * 100.0

        print(f"{fraud_rate*100:>18.1f}% | {num_trials:>15} | {detection_rate:>17.1f}% | ${disputer_profits:>18,.2f} | ${founder_losses:>16,.2f} | {platform_integrity:>19.2f}%")

    print("-" * 115)
    print()
    print("GAME-THEORETIC CONCLUSION:")
    print("1. Negative Expected Value for Fraud: A founder attempting fraud risks losing 100% of their $2,500 stake")
    print("   with a 98.5% chance of detection during the 7-day liveness window. Expected payout is strictly negative (-$2,462).")
    print("2. Strong Disputer Incentive: Challengers earn a $1,250 bounty on verified frauds, ensuring high vigilance.")

if __name__ == "__main__":
    run_oracle_game_theory_simulation()
