let menuItems = [
  {
    menu: "Rindfleisch Momos (8 Stück)",
    description: "Handgemachte Tibetische Teigtaschen mit 100% Schweizer Rindfleisch - Füllung nach eigenem Geheimrezept",
    description2: "Wahl aus: Kleine Portion (5 Stück), Normale Portion (8 Stück), Grosse Portion (12 Stück), Partymix (40 Stück), Sehr grosse Portion (20 Stück) und mehr.",
    basketdesc: "Mittlere Portion (8 Stück), Hausgemachte Chilisauce",
    price: 22.50,
    amount: 1,
  },
  {
    menu: "Poulet Momos (8 Stück)",
    description: "Handgemachte Tibetische Teigtaschen mit einer Füllung aus Schweizer Poulet, Lauch und Erbsen nach eigenem Geheimrezept",
    description2: "Wahl aus: Kleine Portion (5 Stück), Normale Portion (8 Stück), Grosse Portion (12 Stück), Partymix (40 Stück), Sehr grosse Portion (20 Stück) und mehr.",
    basketdesc: "Mittlere Portion (8 Stück), Hausgemachte Chilisauce",
    price: 22.50,
    amount: 1,
  },
  {
    menu: "Vegi Momos (8 Stück)",
    description: "Handgemachte Tibetische Teigtaschen mit saisonaler Gemüse - Paneer - Füllung nach eigenem Geheimrezept",
    description2: "Wahl aus: Kleine Portion (5 Stück), Normale Portion (8 Stück), Grosse Portion (12 Stück), Partymix (40 Stück), Sehr grosse Portion (20 Stück) und mehr.",
    basketdesc: "Mittlere Portion (8 Stück), Hausgemachte Chilisauce",
    price: 22.50,
    amount: 1,
  },
  {
    menu: "Vegan Momos (8 Stück)",
    description: "Handgemachte Tibetische Teigtaschen mit saisonaler Gemüse - Füllung nach eigenem Geheimrezept",
    description2: "Wahl aus: Kleine Portion (5 Stück), Normale Portion (8 Stück), Grosse Portion (12 Stück), Partymix (40 Stück), Sehr grosse Portion (20 Stück) und mehr.",
    basketdesc: "Mittlere Portion (8 Stück), Hausgemachte Chilisauce",
    price: 22.50,
    amount: 1,
  },
  {
    menu: "Mochi's (5 Stück)",
    description: "Ein japanischer Reiskuchen, der aus gekochtem Mochi-Gome, eine süßliche Reissorte hergestellt wird.",
    description2: "Wahl aus: Kleine Portion (3 Stück), Normale Portion (5 Stück), Grosse Portion (8 Stück).",
    basketdesc: "Mittlere Portion (5 Stück)",
    price: 15.00,
    amount: 1,
  },
  { menu: "Coca-Cola 1,5L",
    description: 'Coca-Cola ist ein weltweit bekanntes Erfrischungsgetränk mit kohlensäurehaltigem und süßem Geschmack.',
    description2: 'Wahl aus: klein (330cl), mittel (5dl), gross (1.5l).',
    basketdesc: "Gross 1,5L",
    price: 7.00, 
    amount: 1 },
];

let basketItems = [];
const SHIPPING = 5.9;
load();


function renderMenu() {
  let cardContent = document.getElementById("cards");
  cardContent.innerHTML = "";

  for (let i = 0; i < menuItems.length; i++) {
    const MENU = menuItems[i];

    cardContent.innerHTML += menuTemplate(i, MENU);
  }
}


function renderBasket() {
  let basketCard = document.getElementById('basketcard');
  
  for (let i = 0; i < basketItems.length; i++) {
    const BASKET = basketItems[i];

    basketCard.innerHTML += basketCardTemplate(i, BASKET);
    // checkBasket(i, BASKET);
  }
}


function checkBasket() {
  let basketContent = document.getElementById("basket");
  
  if (basketItems == '') {
    basketContent.innerHTML = "";
    basketContent.innerHTML += emptyBasketTemplate();
  } else {
    basketContent.innerHTML = "";
    basketContent.innerHTML += basketTemplate();
  }
  renderBasket();
}


function addToBasket(i) {
  let index = getBasketIndex(menuItems[i]['menu'])

  if (index !== "error") {
    increaseAmount(index)
  } else {
    basketItems.push(menuItems[i])
  }
  getTotal();
  checkBasket();
  save();
}


function getBasketIndex(menu) {
  for (let j = 0; j < basketItems.length; j++) {
    if (basketItems[j]['menu'] === menu) {
      return j;
    }
  }
  return "error";
}


function increaseAmount(i) {
  basketItems[i]['amount'] += 1;
  increasePrice(i);
  getTotal();
  checkBasket();
  save();
}


function increasePrice(i) {
  basketItems[i]['price'] = (basketItems[i]['price'] / (basketItems[i]['amount'] - 1)) * basketItems[i]['amount'];
}


function decreaseAmount(i) {
  if (basketItems[i]['amount'] > 1) {
    basketItems[i]['amount'] -= 1;
    decreasePrice(i);
  } else {
    basketItems.splice(i, 1);
  }
  getTotal();
  checkBasket();
  save();
}


function decreasePrice(i) {
  basketItems[i]['price'] = (basketItems[i]['price'] / (basketItems[i]['amount'] + 1)) * basketItems[i]['amount'];
}


function getSubtotal() {
  let subtotal = 0;
  for (let i = 0; i < basketItems.length; i++) {
    subtotal += basketItems[i]['price'];
  }
  return subtotal.toFixed(2);
}


function getTotal() {
  const subtotal = parseFloat(getSubtotal());
  const total = subtotal + SHIPPING;
  document.getElementById('subtotal').innerHTML += subtotal.toFixed(2) + " CHF";
  document.getElementById('total').innerHTML += total.toFixed(2) + " CHF";
  document.getElementById('total2').innerHTML += "Bezahlen (" + total.toFixed(2) + " CHF)";
}


function save() {
  let menuItemsAsText = JSON.stringify(menuItems);
  let basketItemsAsText = JSON.stringify(basketItems);
  
  localStorage.setItem('menuItems', menuItemsAsText);
  localStorage.setItem('basketItems', basketItemsAsText);
}


function load() {
  let menuItemsAsText = localStorage.getItem('menuItems');
  let basketItemsAsText = localStorage.getItem('basketItems');

  if (menuItemsAsText) {
    menuItems = JSON.parse(menuItemsAsText); 
  }
  if (basketItemsAsText) {
    basketItems = JSON.parse(basketItemsAsText); 
  }
}


function menuTemplate(index, MENU) {
  return /* html */ `<div class="card" id='card${index}' onclick="addToBasket(${index})">
  <div class="card-info">
      <div><h3>${MENU['menu']}</h3></div>
      <div><span>${MENU['description']}</span></div>
      <div><p>${MENU['description2']}</p></div>
      <div><h4>${MENU['price']} CHF</h4></div>
  </div>
  <div class="card-button">
      <div><button id="card-button${index}"><img src="./img/icons/plus.png" alt="Plus Icon"></button></div>
  </div>
</div>`;
}


function basketCardTemplate(index, BASKET) {
  return /* html */`
  <div class="basket-card" id="basketcard${index}">
    <div class="card-title-row"><div class="card-amount"><p>${BASKET['amount']}</p></div><div class="card-menu-price"><p>${BASKET['menu']}</p><span>${BASKET['price']} CHF</span></div></div>
    <div class="basket-description"><span>${BASKET['basketdesc']}</span></div>
    <div class="card-buttons-div"><button onclick="decreaseAmount(${index})"><img src="./img/icons/minus.png" alt="Minus Icon"></button><span>${BASKET['amount']}</span><button onclick="increaseAmount(${index})"><img src="./img/icons/plus.png" alt="Plus Icon"></button></div> 
  </div>`
}


function basketTemplate() {
  return /* html */ `
  <div class="basket-cards" id="basketcards">
      <div class="basket-card-div" id="basketcard">
          
      </div>
  </div>
  <div class="basket-sums" id="basket-sums">
      <div><span>Zwischensumme</span><span id="subtotal">40,00 CHF</span></div>
      <div><span>Lieferkosten</span><span>${SHIPPING} CHF</span></div>
      <div><p>Gesamt</p><p id="total">182,50 CHF</p></div>
  </div>
  <div class="basket-button-div"><button class="basket-button" id="total2">Bezahlen (182,50 CHF)</button></div>`
}


function emptyBasketTemplate() {
  return /* html */ `
  <div class="empty-basket">
    <div><img class="bag-icon" src="./img/icons/bag.png" alt=""></div>
    <div><h3>Fülle deinen Warenkorb</h3></div>
    <div class="basket-text"><span>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</span></div>
  </div>`
}


function getValueFromInput(inputId) {
  let input = document.getElementById(inputId);
  return input.value.trim();
}


function getMenuFromInput() {
  return getValueFromInput("menu");
}


function getPriceFromInput() {
  let priceInput = getValueFromInput("price");
  return parseFloat(priceInput);
}


function onAddMenu() {
  let menu = getMenuFromInput();
  let price = getPriceFromInput();
  let index = getMenuIndex(menu);

  if (index !== "error") {
    menuItems[index].amount += 1;
  } else {
    menuItems.push({ menu, price, amount: 1 });
  }
}


