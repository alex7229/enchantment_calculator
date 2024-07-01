import { Result } from "../components/results-block/ResultsBlock";
import enchant from "./enchant";

type SafeEnchantOptions = {
  isWeapon: boolean;
  desiredEnchant: number;
  agathionUsage: number[];
  additionalChance: number;
  destructionUsage: number[];
  ancientUsage: number[];
};

const enchantSafely = (
  options: SafeEnchantOptions
): Omit<Result, "moneyUsed"> => {
  let totalScrolls = 0;
  let totalBlessScrolls = 0;
  let totalAncientScrolls = 0;
  let totalDestructionScrolls = 0;
  let totalUsedItems = 0;
  let totalAgathions = 0;

  let scrollsLimit = 100_000_000;
  let iterationCount = 0;

  while (totalScrolls < scrollsLimit) {
    iterationCount++;
    let result = enchant({
      desiredEnchant: options.desiredEnchant,
      isWeapon: options.isWeapon,
      useBlessScrolls: true,
      agathionsUsage: options.agathionUsage,
      additionalChance: options.additionalChance,
      destructionUsage: options.destructionUsage,
      ancientUsage: options.ancientUsage,
    });
    totalScrolls += result.scrolls;
    totalBlessScrolls += result.blessScrolls;
    totalUsedItems += result.usedItems;
    totalAgathions += result.agathionsUsed;
    totalAncientScrolls += result.ancientScrolls;
    totalDestructionScrolls += result.destructionScrolls;
  }

  let averageScrolls = totalScrolls / iterationCount;
  let averageBlessScrolls = totalBlessScrolls / iterationCount;
  let averageUsedItems = totalUsedItems / iterationCount;
  let averageAgathions = totalAgathions / iterationCount;
  let averageAncientScrolls = totalAncientScrolls / iterationCount;
  let averageDestructionScrolls = totalDestructionScrolls / iterationCount;

  return {
    agathionsUsed: Math.round(averageAgathions * 100) / 100,
    blessScrolls: Math.round(averageBlessScrolls * 100) / 100,
    itemsUsed: Math.round(averageUsedItems * 100) / 100,
    regularScrolls: Math.round(averageScrolls * 100) / 100,
    ancientScrolls: Math.round(averageAncientScrolls * 100) / 100,
    destructionScrolls: Math.round(averageDestructionScrolls * 100) / 100,
  };
};

export default enchantSafely;
