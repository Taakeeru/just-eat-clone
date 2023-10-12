let menuItems = [
  {
    menu: "Rindfleisch Momos (8 Stück)",
    description: "Handgemachte Tibetische Teigtaschen mit 100% Schweizer Rindfleisch - Füllung nach eigenem Geheimrezept",
    description2: "Wahl aus: Kleine Portion (5 Stück), Normale Portion (8 Stück), Grosse Portion (12 Stück), Partymix (40 Stück), Sehr grosse Portion (20 Stück) und mehr.",
    price: 22.50,
    amount: 1,
  },
  {
    menu: "Poulet Momos (8 Stück)",
    description: "Handgemachte Tibetische Teigtaschen mit einer Füllung aus Schweizer Poulet, Lauch und Erbsen nach eigenem Geheimrezept",
    description2: "Wahl aus: Kleine Portion (5 Stück), Normale Portion (8 Stück), Grosse Portion (12 Stück), Partymix (40 Stück), Sehr grosse Portion (20 Stück) und mehr.",
    price: 22.50,
    amount: 1,
  },
  {
    menu: "Vegi Momos (8 Stück)",
    description: "Handgemachte Tibetische Teigtaschen mit saisonaler Gemüse - Paneer - Füllung nach eigenem Geheimrezept",
    description2: "Wahl aus: Kleine Portion (5 Stück), Normale Portion (8 Stück), Grosse Portion (12 Stück), Partymix (40 Stück), Sehr grosse Portion (20 Stück) und mehr.",
    price: 22.50,
    amount: 1,
  },
  {
    menu: "Vegan Momos (8 Stück)",
    description: "Handgemachte Tibetische Teigtaschen mit saisonaler Gemüse - Füllung nach eigenem Geheimrezept",
    description2: "Wahl aus: Kleine Portion (5 Stück), Normale Portion (8 Stück), Grosse Portion (12 Stück), Partymix (40 Stück), Sehr grosse Portion (20 Stück) und mehr.",
    price: 22.50,
    amount: 1,
  },
  {
    menu: "Mochi's (5 Stück)",
    description: "Ein japanischer Reiskuchen, der aus gekochtem Mochi-Gome, eine süßliche Reissorte hergestellt wird.",
    description2: "Wahl aus: Kleine Portion (3 Stück), Normale Portion (5 Stück), Grosse Portion (8 Stück).",
    price: 15.00,
    amount: 1,
  },
  { menu: "Coca-Cola 1,5L",
    description: 'Coca-Cola ist ein weltweit bekanntes Erfrischungsgetränk mit kohlensäurehaltigem und süßem Geschmack.', 
    description2: 'Wahl aus: klein (330cl), mittel (5dl), gross (1.5l).', 
    price: 7.00, 
    amount: 1 },
];

let basketItems = [];
const SHIPPING = 5.9;


// if amount > 0 add d-none(+) img render amount else remove d-none(+)
function renderMenu() {
  let cardContent = document.getElementById("cards");
  cardContent.innerHTML = "";

  for (let i = 0; i < menuItems.length; i++) {
    const MENU = menuItems[i];

    cardContent.innerHTML += menuTemplate(i, MENU);
  }
}


function renderBasket() {
  let basketContent = document.getElementById("basket");
  basketContent.innerHTML = "";

  for (let i = 0; i < basketItems.length; i++) {
    const BASKET = basketItems[i];

    checkBasket(i, BASKET);
  }
}


function checkBasket(index, BASKET) {
  let basketContent = document.getElementById("basket");

  if (basketItems !== '') {
    basketContent.innerHTML += basketTemplate(index, BASKET);
  } else {
    basketContent.innerHTML += emptyBasketTemplate();
  }
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

  if (index !== "not in the json") {
    menuItems[index].amount += 1;
  } else {
    menuItems.push({ menu, price, amount: 1 });
  }
}


function getMenuIndex(menu) {
  for (let i = 0; i < menuItems.length; i++) {
    if (menuItems[i].menu === menu) {
      return i;
    }
  }
  return "not in the json";
}


function save() {
  let menuItemsAsText = JSON.stringify(menuItems);
  let basketItemsAsText = JSON.stringify(basketItems);
  
  localStorage.setItem('menuItems', menuItemsAsText);
  localStorage.setItem('basketItems', basketItemsAsText);
}


function load() {
  let postsAsText = localStorage.getItem('posts');

  if (postsAsText) {
    posts = JSON.parse(postsAsText); 
  }
}


function menuTemplate(index, MENU) {
  return /* html */ `<div class="card" id='card${index}'>
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


function basketTemplate(index) {
  return /* html */ ``
}


function emptyBasketTemplate() {
  return /* html */ `<div><h2>Warenkorb</h2></div>
  <div><img src="./img/icons/bag.png" alt=""></div>
  <div><h2>Fülle deinen Warenkorb</h2></div>
  <div class="basket-text"><span>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</span></div>`
}