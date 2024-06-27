import formatPrice from "../../utils/formatPrice";
import "./ItemInfo.css";

export type ItemInfo = {
  price: number;
  enchant: number;
  isWeapon: boolean;
};

type Props = {
  info: ItemInfo;
  onInfoChanged: (info: ItemInfo) => any;
};

const ItemInfoBlock: React.FC<Props> = (props) => {
  const { enchant, isWeapon, price } = props.info;

  const priceInput = price === 0 ? "" : (price / 10 ** 6).toString();
  const enchantInput = enchant === 0 ? "" : enchant.toString();

  const onPriceChanged = (newPrice: string) => {
    let price = parseFloat(newPrice);
    let actualPrice = Number.isNaN(price) ? 0 : price * 10 ** 6;
    props.onInfoChanged({ ...props.info, price: actualPrice });
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
        <label> Weapon:</label>
        <input
          checked={isWeapon}
          onChange={(e) => onWeaponCheckboxClicked(e.target.checked)}
          type="checkbox"
        />
      </p>
    </div>
  );
};

export default ItemInfoBlock;
