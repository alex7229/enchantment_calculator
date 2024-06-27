import { useEffect } from "react";
import formatPrice from "../../utils/formatPrice";
import "./SettingsBlock.css";

export type Settings = {
  weaponBlessScrollPrice: number;
  weaponRegularScrollPrice: number;
  armorBlessScrollPrice: number;
  armorRegularScrollPrice: number;
};

type Props = {
  settings: Settings;
  onSettingsChange: (settings: Settings) => any;
};

export const STORAGE_SETTINGS_KEY = "settings";

const loadSettingsFromStorage = (): Settings | null => {
  try {
    const storedSettingsString = localStorage.getItem(STORAGE_SETTINGS_KEY);
    const settings: Settings = JSON.parse(storedSettingsString ?? "");
    return settings;
  } catch {
    return null;
  }
};

const SettingsBLock: React.FC<Props> = (props) => {
  const {
    armorBlessScrollPrice,
    armorRegularScrollPrice,
    weaponBlessScrollPrice,
    weaponRegularScrollPrice,
  } = props.settings;

  useEffect(() => {
    const newSettings = loadSettingsFromStorage();
    if (newSettings) props.onSettingsChange(newSettings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ width: 220 }}>
      <h3>Prices:</h3>
      <p className="row">
        <span> Weapon bless scroll: </span>
        <span>{formatPrice(weaponBlessScrollPrice)}</span>
      </p>
      <p className="row">
        <span> Weapon regular scroll: </span>
        <span>{formatPrice(weaponRegularScrollPrice)}</span>
      </p>
      <p className="row">
        <span> Armor bless scroll: </span>
        <span>{formatPrice(armorBlessScrollPrice)}</span>
      </p>
      <p className="row">
        <span> Armor regular scroll: </span>
        <span>{formatPrice(armorRegularScrollPrice)}</span>
      </p>
    </div>
  );
};

export default SettingsBLock;
