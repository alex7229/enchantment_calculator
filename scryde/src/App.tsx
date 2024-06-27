import { useState } from "react";
import "./App.css";
import RegularResults from "./components/regular-results/RegularResults";
import SafeResults from "./components/safe-results/SafeResults";
import SettingsBlock, {
  Settings,
} from "./components/settings-block/SettingsBlock";
import ItemInfoBlock, { ItemInfo } from "./components/info/Info";

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
          <RegularResults />
        </div>
        <div className="block">
          <SafeResults />
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
