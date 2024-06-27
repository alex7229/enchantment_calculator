const formatPrice = (price: number) => {
  var divider = 1;
  var suffix = "";
  if (price < 1_000_000) {
    divider = 1000;
    suffix = "K";
  } else if (price < 1_000_000_000) {
    divider = 1_000_000;
    suffix = "M";
  } else if (price < 1_000_000_000_000) {
    divider = 1_000_000_000;
    suffix = "B";
  } else {
    divider = 1_000_000_000_000;
    suffix = "T";
  }

  var preciseValue = price / divider;
  var roundedValue = Math.round(preciseValue * 100) / 100;
  return `${roundedValue} ${suffix}`;
};

export default formatPrice;
