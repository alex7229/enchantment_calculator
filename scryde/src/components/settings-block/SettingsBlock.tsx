import { useEffect, useState } from "react";
import formatPrice from "../../utils/formatPrice";
import "./SettingsBlock.css";
import { AGATHION_ARMOR_GOLD, AGATHION_WEAPON_GOLD } from "../../constants";

export type Settings = {
  weaponBlessScrollPrice: number;
  weaponRegularScrollPrice: number;
  armorBlessScrollPrice: number;
  armorRegularScrollPrice: number;
  goldPrice: number;
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
    let newValue = parseInt(value, 10);
    if (Number.isNaN(newValue)) {
      newValue = 0;
    }
    setCurrentSettings({ ...currentSettings, [key]: newValue });
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
    <>
      <div className="row">
        <h3>Prices:</h3>
        <button onClick={() => setIsEditMode(true)}>Edit</button>
      </div>
      <p className="row">
        <span> Weapon bless scroll: </span>
        {isEditMode ? (
          <input
            value={
              currentSettings.weaponBlessScrollPrice
                ? currentSettings.weaponBlessScrollPrice
                : ""
            }
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
            value={
              currentSettings.weaponRegularScrollPrice
                ? currentSettings.weaponRegularScrollPrice
                : ""
            }
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
            value={
              currentSettings.armorBlessScrollPrice
                ? currentSettings.armorBlessScrollPrice
                : ""
            }
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
            value={
              currentSettings.armorRegularScrollPrice
                ? currentSettings.armorRegularScrollPrice
                : ""
            }
            onChange={(event) =>
              setSingleSetting("armorRegularScrollPrice", event.target.value)
            }
          />
        ) : (
          <span>{formatPrice(currentSettings.armorRegularScrollPrice)}</span>
        )}
      </p>
      {isEditMode ? (
        <p className="row">
          <span>Gold price: </span>
          <input
            value={currentSettings.goldPrice ? currentSettings.goldPrice : ""}
            onChange={(event) =>
              setSingleSetting("goldPrice", event.target.value)
            }
          />
        </p>
      ) : null}
      {!isEditMode ? (
        <p className="row">
          <span> Agathion weapon: </span>
          <span>
            {formatPrice(currentSettings.goldPrice * AGATHION_WEAPON_GOLD)}
          </span>
        </p>
      ) : null}
      {!isEditMode ? (
        <p className="row">
          <span> Agathion armor: </span>
          <span>
            {formatPrice(currentSettings.goldPrice * AGATHION_ARMOR_GOLD)}
          </span>
        </p>
      ) : null}
      {isEditMode ? <button onClick={() => saveSettings()}>Save</button> : null}
    </>
  );
};

export default SettingsBLock;
