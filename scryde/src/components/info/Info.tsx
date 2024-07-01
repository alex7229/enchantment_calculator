import formatPrice from "../../utils/formatPrice";
import "./ItemInfo.css";

const allLevels = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const agathionLevels = [3, 4, 5, 6, 7, 8];
const destructionLevels = [3, 4, 5, 6, 7, 8, 9];
const ancientLevels = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

export type ItemInfo = {
  price: number;
  enchant: number;
  isWeapon: boolean;
  agathionUsage: number[];
  destructionUsage: number[];
  ancientUsage: number[];
  additionalChance: number;
};

type Props = {
  info: ItemInfo;
  onInfoChanged: (info: ItemInfo) => any;
};

const ItemInfoBlock: React.FC<Props> = (props) => {
  const {
    enchant,
    isWeapon,
    price,
    agathionUsage,
    additionalChance,
    ancientUsage,
    destructionUsage,
  } = props.info;

  const priceInput = price === 0 ? "" : (price / 10 ** 6).toString();
  const enchantInput = enchant === 0 ? "" : enchant.toString();
  const additionalChanceInput =
    additionalChance === 0 ? "" : additionalChance.toString();

  const onPriceChanged = (newPrice: string) => {
    let price = parseFloat(newPrice);
    let actualPrice = Number.isNaN(price) ? 0 : price * 10 ** 6;
    props.onInfoChanged({ ...props.info, price: actualPrice });
  };

  const onUsageChanged = (
    level: number,
    type: Extract<
      keyof ItemInfo,
      "agathionUsage" | "ancientUsage" | "destructionUsage"
    >
  ) => {
    const allKeys: Array<typeof type> = [
      "agathionUsage",
      "ancientUsage",
      "destructionUsage",
    ];

    let previousUsage = props.info[type];
    const isIncluded = previousUsage.includes(level);

    if (isIncluded) {
      // Remove current usage from this specific field
      props.onInfoChanged({
        ...props.info,
        [type]: previousUsage.filter((l) => l !== level),
      });
    } else {
      // Add new usage to the specific fields
      // Remove conflicting values with the same level from other fields
      let newInfo = { ...props.info };
      allKeys.forEach((k) => {
        let newUsage: number[] = [];
        const previousUsage = newInfo[k];
        if (k === type) {
          newUsage = [...previousUsage, level];
        } else {
          newUsage = previousUsage.filter((l) => l !== level);
        }
        newInfo[k] = newUsage;
      });
      props.onInfoChanged(newInfo);
    }
  };

  const onEnchantChanged = (enchant: string) => {
    let enchantValue = parseInt(enchant);
    if (Number.isNaN(enchantValue)) {
      enchantValue = 0;
    } else if (enchantValue > 16) {
      enchantValue = 16;
    } else if (enchantValue < 0) {
      enchantValue = 0;
    }
    props.onInfoChanged({ ...props.info, enchant: enchantValue });
  };

  const onAdditionalChanceChanged = (chance: string) => {
    let chanceValue = parseInt(chance, 10);
    if (Number.isNaN(chanceValue)) {
      chanceValue = 0;
    } else if (chanceValue > 100) {
      chanceValue = 100;
    } else if (chanceValue < 0) {
      chanceValue = 0;
    }
    props.onInfoChanged({ ...props.info, additionalChance: chanceValue });
  };

  const onWeaponCheckboxClicked = (checked: boolean) => {
    props.onInfoChanged({ ...props.info, isWeapon: checked });
  };

  const renderEmptyUsageBlock = (key: string) => (
    <div key={key} style={{ height: 40, width: 20 }}></div>
  );

  return (
    <>
      <h3>Item Info</h3>
      <p className="row">
        <label>Price (M):</label>
        <div className="input-wrapper-outer">
          <div className="input-wrapper-inner">
            <input
              style={{ maxWidth: 80 }}
              id="item_price_input"
              value={priceInput}
              onChange={(event) => onPriceChanged(event.target.value)}
            />
          </div>
          <span className="value">{formatPrice(price)}</span>
        </div>
      </p>
      <p className="row">
        <label> Enchant:</label>
        <div className="input-wrapper-outer">
          <div className="input-wrapper-inner">
            <input
              type="number"
              max="16"
              min="0"
              width="15"
              id="desired_enchant_input"
              value={enchantInput}
              onChange={(e) => onEnchantChanged(e.target.value)}
            />
          </div>
          <span className="value">{enchant}</span>
        </div>
      </p>
      <p className="row">
        <label> Extra chance:</label>
        <div className="input-wrapper-outer">
          <div className="input-wrapper-inner">
            <input
              type="number"
              max="100"
              min="0"
              width="15"
              value={additionalChanceInput}
              onChange={(e) => onAdditionalChanceChanged(e.target.value)}
            />
          </div>
          <span className="value">{additionalChance}</span>
        </div>
      </p>
      <p className="row">
        <label> Weapon:</label>
        <input
          checked={isWeapon}
          onChange={(e) => onWeaponCheckboxClicked(e.target.checked)}
          type="checkbox"
        />
      </p>
      <p className="row">
        <label>Agathions:</label>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {allLevels.map((level) => {
            let key = "agathion" + level;
            if (agathionLevels.includes(level)) {
              return (
                <div
                  key={key}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <span>{level}</span>
                  <input
                    checked={agathionUsage.includes(level)}
                    onChange={() => onUsageChanged(level, "agathionUsage")}
                    type="checkbox"
                  />
                </div>
              );
            } else {
              return renderEmptyUsageBlock(key);
            }
          })}
        </div>
      </p>
      <p className="row">
        <label>Destructions:</label>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {allLevels.map((level) => {
            let key = "destruction" + level;
            if (destructionLevels.includes(level)) {
              return (
                <div
                  key={key}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <span>{level}</span>
                  <input
                    checked={destructionUsage.includes(level)}
                    onChange={() => onUsageChanged(level, "destructionUsage")}
                    type="checkbox"
                  />
                </div>
              );
            } else {
              return renderEmptyUsageBlock(key);
            }
          })}
        </div>
      </p>
      <p className="row">
        <label>Ancient:</label>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {allLevels.map((level) => {
            let key = "ancient" + level;
            if (ancientLevels.includes(level)) {
              return (
                <div
                  key={key}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <span>{level}</span>
                  <input
                    checked={ancientUsage.includes(level)}
                    onChange={() => onUsageChanged(level, "ancientUsage")}
                    type="checkbox"
                  />
                </div>
              );
            } else {
              return renderEmptyUsageBlock(key);
            }
          })}
        </div>
      </p>
    </>
  );
};

export default ItemInfoBlock;
