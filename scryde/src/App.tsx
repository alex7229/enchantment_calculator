import { useEffect, useState } from "react";
import "./App.scss";
import SettingsBlock, {
  Settings,
} from "./components/settings-block/SettingsBlock";
import ItemInfoBlock, { ItemInfo } from "./components/info/Info";
import ResultsBlock, { Result } from "./components/results-block/ResultsBlock";
import enchantRegularly from "./utils/enchant-regularly";
import enchantSafely from "./utils/enchant-safely";
import calculateTotalMoney from "./utils/calculate-total-money";
import { STORAGE_SETTINGS_KEY, STORAGE_ITEM_INFO_KEY } from "./constants";

const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(true), ms);
  });

const defaultSettings: Settings = {
  armorBlessScrollPrice: 155 * 10 ** 6,
  weaponBlessScrollPrice: 600 * 10 ** 6,
  armorRegularScrollPrice: 2 * 10 ** 6,
  weaponRegularScrollPrice: 18 * 10 ** 6,
  goldPrice: 70 * 10 ** 6,
};
const defaultItemInfo: ItemInfo = {
  enchant: 6,
  isWeapon: false,
  price: 200 * 10 ** 6,
  agathionUsage: [8],
  destructionUsage: [9],
  ancientUsage: [10],
  additionalChance: 0,
};

function App() {
  const [processing, setProcessing] = useState(false);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [itemInfo, setItemInfo] = useState<ItemInfo>(defaultItemInfo);
  const [previousRegularResult, setPreviousRegularResult] =
    useState<Result | null>(null);
  const [currentRegularResult, setCurrentRegularResult] =
    useState<Result | null>(null);
  const [previousSafeResult, setPreviousSafeResult] = useState<Result | null>(
    null
  );
  const [currentSafeResult, setCurrentSafeResult] = useState<Result | null>(
    null
  );

  useEffect(() => {
    try {
      const settingsString = localStorage.getItem(STORAGE_SETTINGS_KEY);
      const itemInfoString = localStorage.getItem(STORAGE_ITEM_INFO_KEY);
      if (settingsString) {
        setSettings(JSON.parse(settingsString));
      }
      if (itemInfoString) {
        setItemInfo(JSON.parse(itemInfoString));
      }
    } catch {}
  }, []);

  const onSettingsChange = (newSettings: Settings) => {
    setSettings(newSettings);
    localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify(newSettings));
  };

  const calculate = async () => {
    if (itemInfo.enchant < 4) {
      alert("Enchant cannot be less than 4");
      return;
    }

    if (itemInfo.isWeapon && itemInfo.enchant >= 17) {
      alert("Max enchant for weapons is 16");
      return;
    }

    if (!itemInfo.isWeapon && itemInfo.enchant >= 15) {
      alert("Max enchant for armor is 14");
      return;
    }

    localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify(settings));
    localStorage.setItem(STORAGE_ITEM_INFO_KEY, JSON.stringify(itemInfo));

    setProcessing(true);
    await wait(0);

    const regular = enchantRegularly({
      desiredEnchant: itemInfo.enchant,
      isWeapon: itemInfo.isWeapon,
      agathionUsage: itemInfo.agathionUsage,
      additionalChance: itemInfo.additionalChance,
    });
    const safe = enchantSafely({
      desiredEnchant: itemInfo.enchant,
      isWeapon: itemInfo.isWeapon,
      agathionUsage: itemInfo.agathionUsage,
      additionalChance: itemInfo.additionalChance,
    });

    setPreviousRegularResult(currentRegularResult);
    setPreviousSafeResult(currentSafeResult);

    setCurrentRegularResult({
      ...regular,
      moneyUsed: calculateTotalMoney(regular, settings, itemInfo),
    });
    setCurrentSafeResult({
      ...safe,
      moneyUsed: calculateTotalMoney(safe, settings, itemInfo),
    });

    setProcessing(false);
  };

  return (
    <div className="app">
      {processing ? <div className="loader"></div> : null}
      <div className="info-container">
        <div className="block">
          <div className="inner-block">
            <SettingsBlock
              settings={settings}
              onSettingsChange={onSettingsChange}
            />
          </div>
        </div>
        <div className="block">
          <div className="inner-block">
            <ItemInfoBlock info={itemInfo} onInfoChanged={setItemInfo} />
          </div>
        </div>
        <div className="block">
          <div className="inner-block">
            <ResultsBlock
              currentResult={currentRegularResult}
              previousResult={previousRegularResult}
              type="regular"
            />
          </div>
        </div>
        <div className="block">
          <div className="inner-block">
            <ResultsBlock
              currentResult={currentSafeResult}
              previousResult={previousSafeResult}
              type="safe"
            />
          </div>
        </div>
      </div>
      <div className="button-container">
        <button className="calculate" onClick={() => calculate()} type="button">
          Calculate
        </button>
      </div>
    </div>
  );
}

export default App;
