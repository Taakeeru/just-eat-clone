let menuItems = [
    { menu: 'Rindfleisch Momos(8 Stück)', description: 'Handgemachte Tibetische Teigtaschen mit 100% Schweizer Rindfleisch - Füllung nach eigenem Geheimrezept', price: 22.50, amount: 1 },
    { menu: 'Poulet Momos(8 Stück)', description: 'Handgemachte Tibetische Teigtaschen mit einer Füllung aus Schweizer Poulet, Lauch und Erbsen nach eigenem Geheimrezept', price: 22.50, amount: 1 },
    { menu: 'Vegi Momos(8 Stück)', description: 'Handgemachte Tibetische Teigtaschen mit saisonaler Gemüse - Paneer - Füllung nach eigenem Geheimrezept', price: 22.50, amount: 1 },
    { menu: 'Vegan Momos(8 Stück)', description: 'Handgemachte Tibetische Teigtaschen mit saisonaler Gemüse - Füllung nach eigenem Geheimrezept', price: 22.50, amount: 1 },
    { menu: 'Mochis(5 Stück)', description: 'Ein japanischer Reiskuchen, der aus gekochtem Mochi-Gome, eine süßliche Reissorte hergestellt wird.', price: 15.00, amount: 1 },
    { menu: 'Coca-Cola 1,5l', description: '', price: 7.00, amount: 1 }
];
const SHIPPING = 5.90;



// if amount > 0 add d-none(+) img render amount else remove d-none(+)
function renderMenu() {

}


function renderBasket() {

}


function getValueFromInput(inputId) {
    let input = document.getElementById(inputId);
    return input.value.trim();
}


function getMenuFromInput() {
    return getValueFromInput('menu');
}


function getPriceFromInput() {
    let priceInput = getValueFromInput('price');
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

}


function load() {

}