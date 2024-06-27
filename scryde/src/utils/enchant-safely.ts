import { Result } from "../components/results-block/ResultsBlock";
import enchant from "./enchant";

type SafeEnchantOptions = {
  isWeapon: boolean;
  desiredEnchant: number;
};

const enchantSafely = (
  options: SafeEnchantOptions
): Omit<Result, "moneyUsed"> => {
  let totalScrolls = 0;
  let totalBlessScrolls = 0;

  let scrollsLimit = 100_000_000;
  let iterationCount = 0;

  while (totalScrolls < scrollsLimit) {
    iterationCount++;
    let result = enchant({
      desiredEnchant: options.desiredEnchant,
      isWeapon: options.isWeapon,
      useBlessScrolls: true,
    });
    totalScrolls += result.scrolls;
    totalBlessScrolls += result.blessScrolls;
  }

  let averageScrolls = totalScrolls / iterationCount;
  let averageBlessScrolls = totalBlessScrolls / iterationCount;

  return {
    agathionsUsed: 0,
    blessScrolls: Math.round(averageBlessScrolls * 100) / 100,
    itemsUsed: 1,
    regularScrolls: Math.round(averageScrolls * 100) / 100,
  };
};

export default enchantSafely;
