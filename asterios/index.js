var weaponBlessScrollPrice = 200_000_000;
var weaponRegularScrollPrice = 10_000_000;
var armorBlessScrollPrice = 55_000_000;
var armorRegularScrollPrice = 700_000;
var weaponChance = 0.66;
var armorChance = 0.5;

var itemPrice = 200_000_000;
var desiredEnchant = 6;
var isWeapon = true;

var formatPrice = (price) => {
  var divider = 1;
  var suffix = "";
  if (price < 1_000_000) {
    divider = 1000;
    suffix = "K";
  } else if (price < 1_000_000_000) {
    divider = 1_000_000;
    suffix = "KK";
  } else {
    divider = 1_000_000_000;
    suffix = "KKK";
  }

  var preciseValue = price / divider;
  var roundedValue = Math.round(preciseValue * 100) / 100;
  return `${roundedValue} ${suffix}`;
};

var syncData = (initial) => {
  document.getElementById("weapon_bless_scroll_price").innerHTML = formatPrice(
    weaponBlessScrollPrice
  );
  document.getElementById("weapon_regular_scroll_price").innerHTML =
    formatPrice(weaponRegularScrollPrice);
  document.getElementById("armor_bless_scroll_price").innerHTML = formatPrice(
    armorBlessScrollPrice
  );
  document.getElementById("armor_regular_scroll_price").innerHTML = formatPrice(
    armorRegularScrollPrice
  );
  if (!initial) {
    isWeapon = document.getElementById("is_weapon").checked;
    itemPrice = parseInt(document.getElementById("item_price_input").value, 10);
    desiredEnchant = parseInt(
      document.getElementById("desired_enchant_input").value
    );
    if (desiredEnchant <= 0) {
      desiredEnchant = 6;
    } else if (desiredEnchant > 16) {
      desiredEnchant = 16;
    }
  }
  document.getElementById("item_price_input").value = itemPrice;
  document.getElementById("desired_enchant_input").value = desiredEnchant;
  document.getElementById("item_price_value").innerHTML =
    formatPrice(itemPrice);
};

var enchant = (useBlessScrolls = false) => {
  let results = {
    scrolls: 0,
    blessScrolls: 0,
    currentEnchant: 0,
    usedItems: 1,
  };

  while (true) {
    if (results.currentEnchant >= desiredEnchant) return results;

    if (results.currentEnchant < 3) {
      // 0, 1, 2
      results.currentEnchant++;
      results.scrolls++;
      continue;
    }

    let roll = Math.random();
    let chance = isWeapon ? weaponChance : armorChance;
    let success = roll <= chance;

    if (useBlessScrolls) {
      results.blessScrolls++;
    } else {
      results.scrolls++;
    }

    if (success) {
      results.currentEnchant++;
      continue;
    }

    results.currentEnchant = 0;
    if (!useBlessScrolls) {
      results.usedItems++;
    }
  }
};

var calculateAndWriteRegularResults = () => {
  let totalScrolls = 0;
  let totalUsedItems = 0;

  let scrollsLimit = 250_000_000;
  let iterationCount = 0;

  while (totalScrolls < scrollsLimit) {
    iterationCount++;
    let result = enchant(false);
    totalScrolls += result.scrolls;
    totalUsedItems += result.usedItems;
  }

  let averageScrolls = totalScrolls / iterationCount;
  let averageUsedItems = totalUsedItems / iterationCount;

  let totalPrice = 0;
  totalPrice += averageUsedItems * itemPrice;
  let enchantPrice = isWeapon
    ? weaponRegularScrollPrice
    : armorRegularScrollPrice;
  totalPrice += averageScrolls * enchantPrice;

  document.getElementById("scrolls_count").innerHTML =
    Math.round(averageScrolls * 100) / 100;
  document.getElementById("items_count").innerHTML =
    Math.round(averageUsedItems * 100) / 100;
  document.getElementById("total_regular").innerHTML = formatPrice(totalPrice);
};

var calculateAndWriteSafeResults = () => {
  let totalScrolls = 0;
  let totalBlessScrolls = 0;

  let scrollsLimit = 100_000_000;
  let iterationCount = 0;

  while (totalScrolls < scrollsLimit) {
    iterationCount++;
    let result = enchant(true);
    totalScrolls += result.scrolls;
    totalBlessScrolls += result.blessScrolls;
  }

  let averageScrolls = totalScrolls / iterationCount;
  let averageBlessScrolls = totalBlessScrolls / iterationCount;

  let totalPrice = itemPrice;
  let enchantRegularPrice = isWeapon
    ? weaponRegularScrollPrice
    : armorRegularScrollPrice;
  let enchantBlessPrice = isWeapon
    ? weaponBlessScrollPrice
    : armorBlessScrollPrice;
  totalPrice += averageScrolls * enchantRegularPrice;
  totalPrice += averageBlessScrolls * enchantBlessPrice;

  document.getElementById("safe_scrolls_count").innerHTML =
    Math.round(averageScrolls * 100) / 100;
  document.getElementById("safe_bless_scrolls_count").innerHTML =
    Math.round(averageBlessScrolls * 100) / 100;
  document.getElementById("safe_total_regular").innerHTML =
    formatPrice(totalPrice);
};

addEventListener("load", () => {
  syncData(true);
  document.getElementById("calculate_button").addEventListener("click", () => {
    syncData();
    calculateAndWriteRegularResults();
    calculateAndWriteSafeResults();
  });
});
