import formatPrice from "../../utils/formatPrice";
import "./ItemInfo.css";

const agathionLevels = [3, 4, 5, 6, 7, 8];

export type ItemInfo = {
  price: number;
  enchant: number;
  isWeapon: boolean;
  agathionUsage: number[];
  additionalChance: number;
};

type Props = {
  info: ItemInfo;
  onInfoChanged: (info: ItemInfo) => any;
};

const ItemInfoBlock: React.FC<Props> = (props) => {
  const { enchant, isWeapon, price, agathionUsage, additionalChance } =
    props.info;

  const priceInput = price === 0 ? "" : (price / 10 ** 6).toString();
  const enchantInput = enchant === 0 ? "" : enchant.toString();
  const additionalChanceInput =
    additionalChance === 0 ? "" : additionalChance.toString();

  const onPriceChanged = (newPrice: string) => {
    let price = parseFloat(newPrice);
    let actualPrice = Number.isNaN(price) ? 0 : price * 10 ** 6;
    props.onInfoChanged({ ...props.info, price: actualPrice });
  };

  const onAgathionLevelChecked = (level: number, checked: boolean) => {
    const isIncluded = agathionUsage.includes(level);
    if (isIncluded) {
      props.onInfoChanged({
        ...props.info,
        agathionUsage: agathionUsage.filter((l) => l !== level),
      });
    } else {
      props.onInfoChanged({
        ...props.info,
        agathionUsage: [...agathionUsage, level],
      });
    }
  };

  const onEnchangetChanged = (enchant: string) => {
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

  return (
    <div style={{ width: 280 }}>
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
              onChange={(e) => onEnchangetChanged(e.target.value)}
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
        <label>Agathions</label>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {agathionLevels.map((level) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span>{level}</span>
              <input
                checked={agathionUsage.includes(level)}
                onChange={(event) =>
                  onAgathionLevelChecked(level, event.target.checked)
                }
                type="checkbox"
              />
            </div>
          ))}
        </div>
      </p>
    </div>
  );
};

export default ItemInfoBlock;
