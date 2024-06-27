import { ItemInfo } from "../components/info/Info";
import { Result } from "../components/results-block/ResultsBlock";
import { Settings } from "../components/settings-block/SettingsBlock";

const calculateTotalMoney = (
  result: Omit<Result, "moneyUsed">,
  settings: Settings,
  itemInfo: ItemInfo
): number => {
  let total = 0;
  total += result.itemsUsed * itemInfo.price;

  let enchantRegularPrice = itemInfo.isWeapon
    ? settings.weaponRegularScrollPrice
    : settings.armorRegularScrollPrice;
  let enchantBlessPrice = itemInfo.isWeapon
    ? settings.weaponBlessScrollPrice
    : settings.armorBlessScrollPrice;

  total += result.regularScrolls * enchantRegularPrice;
  total += result.blessScrolls * enchantBlessPrice;

  return total;
};

export default calculateTotalMoney;
