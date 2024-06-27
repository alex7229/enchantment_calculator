const weaponChance = [
  100, 100, 100, 66, 64, 61, 57, 54, 51, 48, 45, 45, 45, 42, 42, 39,
];
const armorChance = [
  100, 100, 100, 60, 58, 56, 50, 48, 46, 44, 40, 36, 0, 0, 0, 0,
];

type EnchantOptions = {
  isWeapon: boolean;
  desiredEnchant: number;
  useBlessScrolls: boolean;
};

const enchant = (options: EnchantOptions) => {
  const { desiredEnchant, isWeapon, useBlessScrolls } = options;
  let results = {
    scrolls: 0,
    blessScrolls: 0,
    currentEnchant: 0,
    usedItems: 1,
  };

  while (true) {
    if (results.currentEnchant >= desiredEnchant) return results;

    if (results.currentEnchant < 3) {
      // 0, 1, 2
      results.currentEnchant++;
      results.scrolls++;
      continue;
    }

    let roll = Math.random();
    let chance = isWeapon
      ? weaponChance[results.currentEnchant] / 100
      : armorChance[results.currentEnchant] / 100;
    let success = roll <= chance;

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
