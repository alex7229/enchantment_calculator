import { Result } from "../components/results-block/ResultsBlock";
import enchant from "./enchant";

type RegularEnchantOptions = {
  isWeapon: boolean;
  desiredEnchant: number;
  agathionUsage: number[];
  additionalChance: number;
  destructionUsage: number[];
  ancientUsage: number[];
};

const enchantRegularly = (
  options: RegularEnchantOptions
): Omit<Result, "moneyUsed"> => {
  let totalScrolls = 0;
  let totalAncientScrolls = 0;
  let totalDestructionScrolls = 0;
  let totalUsedItems = 0;
  let totalAgathions = 0;

  let scrollsLimit = 250_000_000;
  let iterationCount = 0;

  while (totalScrolls < scrollsLimit) {
    iterationCount++;
    let result = enchant({
      desiredEnchant: options.desiredEnchant,
      isWeapon: options.isWeapon,
      useBlessScrolls: false,
      agathionsUsage: options.agathionUsage,
      additionalChance: options.additionalChance,
      destructionUsage: options.destructionUsage,
      ancientUsage: options.ancientUsage,
    });
    totalScrolls += result.scrolls;
    totalUsedItems += result.usedItems;
    totalAgathions += result.agathionsUsed;
    totalAncientScrolls += result.ancientScrolls;
    totalDestructionScrolls += result.destructionScrolls;
  }

  let averageScrolls = totalScrolls / iterationCount;
  let averageAncientScrolls = totalAncientScrolls / iterationCount;
  let averageDestructionScrolls = totalDestructionScrolls / iterationCount;
  let averageUsedItems = totalUsedItems / iterationCount;
  let averageAgathions = totalAgathions / iterationCount;

  return {
    agathionsUsed: Math.round(averageAgathions * 100) / 100,
    blessScrolls: 0,
    itemsUsed: Math.round(averageUsedItems * 100) / 100,
    regularScrolls: Math.round(averageScrolls * 100) / 100,
    ancientScrolls: Math.round(averageAncientScrolls * 100) / 100,
    destructionScrolls: Math.round(averageDestructionScrolls * 100) / 100,
  };
};

export default enchantRegularly;
