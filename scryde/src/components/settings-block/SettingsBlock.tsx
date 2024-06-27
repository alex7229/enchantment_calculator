import { useEffect, useState } from "react";
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
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentSettings, setCurrentSettings] = useState(props.settings);

  useEffect(() => {
    setCurrentSettings(props.settings);
  }, [props.settings]);

  const setSingleSetting = (key: keyof Settings, value: string) => {
    setCurrentSettings({ ...currentSettings, [key]: parseInt(value, 10) });
  };

  const saveSettings = () => {
    props.onSettingsChange(currentSettings);
    setIsEditMode(false);
  };

  useEffect(() => {
    const newSettings = loadSettingsFromStorage();
    if (newSettings) props.onSettingsChange(newSettings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ width: 220 }}>
      <div className="row">
        <h3>Prices:</h3>
        <button onClick={() => setIsEditMode(true)}>Edit</button>
      </div>
      <p className="row">
        <span> Weapon bless scroll: </span>
        {isEditMode ? (
          <input
            value={currentSettings.weaponBlessScrollPrice}
            onChange={(event) =>
              setSingleSetting("weaponBlessScrollPrice", event.target.value)
            }
          />
        ) : (
          <span>{formatPrice(currentSettings.weaponBlessScrollPrice)}</span>
        )}
      </p>
      <p className="row">
        <span> Weapon regular scroll: </span>
        {isEditMode ? (
          <input
            value={currentSettings.weaponRegularScrollPrice}
            onChange={(event) =>
              setSingleSetting("weaponRegularScrollPrice", event.target.value)
            }
          />
        ) : (
          <span>{formatPrice(currentSettings.weaponRegularScrollPrice)}</span>
        )}
      </p>
      <p className="row">
        <span> Armor bless scroll: </span>
        {isEditMode ? (
          <input
            value={currentSettings.armorBlessScrollPrice}
            onChange={(event) =>
              setSingleSetting("armorBlessScrollPrice", event.target.value)
            }
          />
        ) : (
          <span>{formatPrice(currentSettings.armorBlessScrollPrice)}</span>
        )}
      </p>
      <p className="row">
        <span> Armor regular scroll: </span>
        {isEditMode ? (
          <input
            value={currentSettings.armorRegularScrollPrice}
            onChange={(event) =>
              setSingleSetting("armorRegularScrollPrice", event.target.value)
            }
          />
        ) : (
          <span>{formatPrice(currentSettings.armorRegularScrollPrice)}</span>
        )}
      </p>
      {isEditMode ? <button onClick={() => saveSettings()}>Save</button> : null}
    </div>
  );
};

export default SettingsBLock;
