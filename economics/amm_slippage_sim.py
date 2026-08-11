import math
import random
from dataclasses import dataclass
from typing import List, Tuple

# Set seed for reproducible simulation
random.seed(42)

"""
LMSR (Logarithmic Market Scoring Rule) AMM Simulation
Formula: C(q1, q2) = b * ln(e^(q1/b) + e^(q2/b))
Price of YES: P_yes = e^(q1/b) / (e^(q1/b) + e^(q2/b))
Price of NO: P_no = e^(q2/b) / (e^(q1/b) + e^(q2/b))
"""

@dataclass
class LMSRMarket:
    b: float  # Liquidity parameter (larger b = less price impact/slippage)
    q_yes: float = 0.0
    q_no: float = 0.0

    def cost(self, q1: float, q2: float) -> float:
        return self.b * math.log(math.exp(q1 / self.b) + math.exp(q2 / self.b))

    @property
    def price_yes(self) -> float:
        return math.exp(self.q_yes / self.b) / (math.exp(self.q_yes / self.b) + math.exp(self.q_no / self.b))

    @property
    def price_no(self) -> float:
        return 1.0 - self.price_yes

    def buy_yes(self, trade_amount_usd: float) -> Tuple[float, float, float]:
        """
        Calculates shares bought for trade_amount_usd.
        Returns: (shares_bought, new_price_yes, slippage_pct)
        """
        initial_price = self.price_yes
        # Binary search for delta_q_yes such that Cost(q_yes + delta, q_no) - Cost(q_yes, q_no) == trade_amount_usd
        low = 0.0
        high = trade_amount_usd * 5.0
        c0 = self.cost(self.q_yes, self.q_no)

        for _ in range(50):
            mid = (low + high) / 2.0
            c_new = self.cost(self.q_yes + mid, self.q_no)
            cost_diff = c_new - c0
            if cost_diff < trade_amount_usd:
                low = mid
            else:
                high = mid

        shares_bought = low
        self.q_yes += shares_bought
        new_price = self.price_yes
        avg_price = trade_amount_usd / shares_bought if shares_bought > 0 else initial_price
        slippage_pct = ((avg_price - initial_price) / initial_price) * 100.0 if initial_price > 0 else 0.0

        return shares_bought, new_price, slippage_pct

def run_liquidity_depth_simulation():
    print("=" * 110)
    print(" 1. LMSR AMM LIQUIDITY & SLIPPAGE SIMULATION FOR DEEP TECH MILESTONES")
    print("=" * 110)
    print()

    b_parameters = [250, 500, 1000, 2500, 5000]
    trade_sizes = [50, 250, 1000, 2500, 5000]

    header = f"{'Liquidity (b)':<14} | {'Initial Cap Required':<22} | {'Trade Size ($)':<15} | {'YES Shares':<12} | {'New YES Price':<14} | {'Slippage %':<12}"
    print(header)
    print("-" * 110)

    for b in b_parameters:
        cap_required = b * math.log(2)  # Worst case maximum loss / initial subsidy
        for trade in trade_sizes:
            market = LMSRMarket(b=b)
            shares, new_p, slippage = market.buy_yes(trade)
            print(f"{b:<14} | ${cap_required:>20,.2f} | ${trade:>13,.2f} | {shares:>11.2f} | {new_p:>13.4f} | {slippage:>11.2f}%")
        print("-" * 110)

if __name__ == "__main__":
    run_liquidity_depth_simulation()
