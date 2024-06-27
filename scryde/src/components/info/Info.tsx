export default function Info() {
  return (
    <>
      <p>Item Info</p>
      <p>
        Price: <input id="item_price_input" />
        <span id="item_price_value"></span>
      </p>
      <p>
        Enchant:
        <input
          type="number"
          max="16"
          min="0"
          width="20"
          id="desired_enchant_input"
        />
        <span id="desired_enchant_value"></span>
      </p>
      <p>
        Weapon:
        <input type="checkbox" id="is_weapon" />
      </p>
    </>
  );
}
