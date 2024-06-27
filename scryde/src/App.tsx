import { useState } from "react";
import "./App.css";
import SettingsBlock, {
  Settings,
} from "./components/settings-block/SettingsBlock";
import ItemInfoBlock, { ItemInfo } from "./components/info/Info";
import ResultsBlock from "./components/results-block/ResultsBlock";

const defaultSettings: Settings = {
  armorBlessScrollPrice: 155 * 10 * 6,
  weaponBlessScrollPrice: 600 * 10 ** 6,
  armorRegularScrollPrice: 2 * 10 ** 6,
  weaponRegularScrollPrice: 18 * 10 ** 6,
};
const defaultItemInfo: ItemInfo = {
  enchant: 6,
  isWeapon: false,
  price: 200 * 10 ** 6,
};

function App() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [itemInfo, setItemInfo] = useState<ItemInfo>(defaultItemInfo);

  return (
    <div className="app">
      <div className="info-container">
        <div className="block">
          <SettingsBlock settings={settings} onSettingsChange={setSettings} />
        </div>
        <div className="block">
          <ItemInfoBlock info={itemInfo} onInfoChanged={setItemInfo} />
        </div>
        <div className="block">
          <ResultsBlock
            result={{
              agathionsUsed: 0,
              blessScrolls: 0,
              itemsUsed: 2,
              moneyUsed: 23 * 10 ** 8,
              regularScrolls: 230,
            }}
            type="regular"
          />
        </div>
        <div className="block">
          <ResultsBlock
            result={{
              agathionsUsed: 0,
              blessScrolls: 56,
              itemsUsed: 1,
              moneyUsed: 23 * 10 ** 8,
              regularScrolls: 2303,
            }}
            type="safe"
          />
        </div>
      </div>
      <div className="button-container">
        <button id="calculate_button" type="button">
          Calculate
        </button>
      </div>
    </div>
  );
}

export default App;
