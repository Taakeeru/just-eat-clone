let menuItems = [
    { menu: 'Pizza', price: 9.99, amount: 2 },
    { menu: 'Pasta', price: 8.99, amount: 5 },
    { menu: 'Tiramisu', price: 6, amount: 2 }
  ];


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
    if (index !== -1) {
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
    return -1;
}



let menus = ['Pizza', 'Pasta','Tiramisu'];
let prices = [9.99, 8.99, 6];
let amounts = [2, 5, 2];


function getValueFromInput(inputId) {
  let input = document.getElementById(inputId);
    return input.value.trim();
}


function getMenuFromInput() {
  let menuInput = getValueFromInput('menu');
    return menuInput
}


function getPriceFromInput() {
  let priceInput = getValueFromInput('price');
    return +priceInput;
}


function onAddMenu() {
  let menu = getMenuFromInput();
  let price = getPriceFromInput();
  let index = getMenuIndex(menu);
  if(index !== -1) {
    amounts[index] += 1;
  } else {
    menus.push(menu);
    prices.push(price);
    amounts.push(1);
  }
}


function getMenuIndex(menu) {
  let index = menus.indexOf(menu);
  if (index >= 0) {
    return index;
  } else {
    return -1;
  }
}