import { ItemInfo } from "../components/info/Info";
import { Result } from "../components/results-block/ResultsBlock";
import { Settings } from "../components/settings-block/SettingsBlock";
import { AGATHION_ARMOR_GOLD, AGATHION_WEAPON_GOLD } from "../constants";

const calculateTotalMoney = (
  result: Omit<Result, "moneyUsed">,
  settings: Settings,
  itemInfo: ItemInfo
): number => {
  let total = 0;
  total += result.itemsUsed * itemInfo.price;

  const enchantRegularPrice = itemInfo.isWeapon
    ? settings.weaponRegularScrollPrice
    : settings.armorRegularScrollPrice;
  const enchantBlessPrice = itemInfo.isWeapon
    ? settings.weaponBlessScrollPrice
    : settings.armorBlessScrollPrice;
  const agathionPrice = itemInfo.isWeapon
    ? settings.goldPrice * AGATHION_WEAPON_GOLD
    : settings.goldPrice * AGATHION_ARMOR_GOLD;

  total += result.regularScrolls * enchantRegularPrice;
  total += result.blessScrolls * enchantBlessPrice;
  total += result.agathionsUsed * agathionPrice;

  return total;
};

export default calculateTotalMoney;
