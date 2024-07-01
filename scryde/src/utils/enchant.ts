import {
  AGATHION_ARMOR_CHANCE,
  AGATHION_WEAPON_CHANCE,
  ANCIENT_BONUS_CHANCE,
} from "./../constants";

const weaponChance = [
  //1,  2,   3,  4,  5,  6,  7,  8,  9,  10, 11, 12, 13, 14, 15, 16
  100, 100, 100, 66, 64, 61, 57, 54, 51, 48, 45, 45, 45, 42, 42, 39,
];
const armorChance = [
  //1,  2,   3,  4,  5,  6,  7,  8,  9,  10, 11, 12, 13, 14, 15,16
  100, 100, 100, 60, 58, 56, 50, 48, 46, 44, 40, 36, 36, 36, 0, 0,
];

type EnchantOptions = {
  isWeapon: boolean;
  desiredEnchant: number;
  additionalChance: number;
  useBlessScrolls: boolean;
  agathionsUsage: number[];
  destructionUsage: number[];
  ancientUsage: number[];
};

const enchant = (options: EnchantOptions) => {
  const {
    desiredEnchant,
    isWeapon,
    useBlessScrolls,
    agathionsUsage,
    additionalChance,
    ancientUsage,
    destructionUsage,
  } = options;
  let results = {
    scrolls: 0,
    blessScrolls: 0,
    ancientScrolls: 0,
    destructionScrolls: 0,
    currentEnchant: 0,
    usedItems: 1,
    agathionsUsed: 0,
  };

  while (true) {
    if (results.currentEnchant >= desiredEnchant) return results;

    if (results.currentEnchant < 3) {
      // 0, 1, 2
      results.currentEnchant++;
      results.scrolls++;
      continue;
    }

    const isAgathionUsed = agathionsUsage.includes(results.currentEnchant);
    const isAncientUsed = ancientUsage.includes(results.currentEnchant);
    const isDestructionUsed = destructionUsage.includes(results.currentEnchant);

    let roll = Math.random();
    let chance = isWeapon
      ? weaponChance[results.currentEnchant] / 100
      : armorChance[results.currentEnchant] / 100;

    if (isAgathionUsed) {
      const additionalChance = isWeapon
        ? AGATHION_WEAPON_CHANCE
        : AGATHION_ARMOR_CHANCE;
      chance += additionalChance / 100;
    } else if (isAncientUsed) {
      chance += ANCIENT_BONUS_CHANCE / 100;
    }

    if (additionalChance) {
      chance += additionalChance / 100;
    }

    let success = roll <= chance;

    if (isAgathionUsed) {
      results.scrolls++;
      results.agathionsUsed++;
      if (success) {
        results.currentEnchant++;
      } else {
        results.currentEnchant = 0;
        results.usedItems++;
      }
      continue;
    }

    if (isAncientUsed) {
      results.ancientScrolls++;
      if (success) {
        results.currentEnchant++;
      } else {
        results.currentEnchant = 0;
      }
      continue;
    }

    if (isDestructionUsed) {
      results.destructionScrolls++;
      if (success) {
        results.currentEnchant++;
      }
      continue;
    }

    if (useBlessScrolls) {
      results.blessScrolls++;
    } else {
      results.scrolls++;
    }

    if (success) {
      results.currentEnchant++;
      continue;
    }

    results.currentEnchant = 0;
    if (!useBlessScrolls) {
      results.usedItems++;
    }
  }
};

export default enchant;
