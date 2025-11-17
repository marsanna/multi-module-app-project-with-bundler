/*  Functions related to localStorage operations */
const cartProducts = "cart_products";

export class Product {
  id;
  img;
  name;
  constructor(data) {
    this.id = data.id;
    this.image = data.image;
    this.title = data.title;
    this.price = data.price;
    this.description = data.description;
  }
}

export function getCartCounter() {
  let products = loadFromStorage();
  let counter = products.length;
  return counter;
}

export function addToCart(data) {
  let products = loadFromStorage();
  products.push(new Product(data));
  writeToStorage(products);
}

export function deleteFromCart(id) {
  let products = loadFromStorage();
  products = products.filter((product) => product.id != id);
  writeToStorage(products);
}

export function loadFromStorage() {
  return JSON.parse(localStorage.getItem(cartProducts)) ?? [];
}

function writeToStorage(products) {
  localStorage.setItem(cartProducts, JSON.stringify(products));
}
