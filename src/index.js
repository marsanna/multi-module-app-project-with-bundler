import { createProductCard, setCartCounter } from "./ui.js";

import { fetchProducts, getFetchProductData } from "./network.js";

import {
  addToCart,
  getCartCounter,
  deleteFromCart,
  loadFromStorage,
} from "./storage.js";

let productPromise = fetchProducts();

productPromise.then(function (productArray) {
  productArray.forEach((product) => {
    createProductCard(product);
    const addToCartButton = document.getElementById(
      `add_to_cart_${product.id}`
    );
    addToCartButton.addEventListener("click", () => {
      const productToCartData = getFetchProductData(product.id, productArray);
      addToCart(productToCartData);
      getCartProducts();
    });
    const productDescription = document.getElementById(
      `description_${product.id}`
    );
    productDescription.addEventListener("click", (e) => {
      if (e.target.classList.contains("d-1")) {
        e.target.classList.add("d-2");
        e.target.classList.remove("d-1");
      } else {
        e.target.classList.add("d-1");
        e.target.classList.remove("d-2");
      }
    });
  });
  getCartProducts();
});

function getCartProducts() {
  const cartCounter = getCartCounter();
  setCartCounter(cartCounter);
  const currentCartCounter = getCartCounter();
  const emptyCart = document.getElementById("empty_cart");
  if (currentCartCounter !== 0) {
    emptyCart.classList.add("hidden");
  } else {
    emptyCart.classList.remove("hidden");
  }
}

const cartModal = document.getElementById("cart_modal");
const closeCart = document.getElementById("close_cart");
const cartButton = document.getElementById("cart_button");

cartButton.addEventListener("click", () => {
  cartModal.classList.remove("hidden");
  const cartProducts = loadFromStorage();
  const cartContent = document.getElementById("cart_content");
  cartContent.textContent = "";
  cartProducts.forEach((product) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("flex");
    const cartItemProduct = document.createElement("div");
    cartItemProduct.classList.add("w-[75%]");
    cartItemProduct.textContent = product.title;
    const cartItemButton = document.createElement("button");
    cartItemButton.classList.add("w-[25%]", "cursor-pointer", "underline");
    cartItemButton.textContent = "Löschen";
    cartItem.append(cartItemProduct);
    cartItem.append(cartItemButton);
    cartContent.append(cartItem);
    cartItemButton.addEventListener("click", (event) => {
      deleteFromCart(product.id);
      event.target.parentNode.remove();
      getCartProducts();
    });
  });
  getCartProducts();
});

closeCart.addEventListener("click", () => {
  cartModal.classList.add("hidden");
});

cartModal.addEventListener("click", (e) => {
  if (e.target === cartModal) {
    cartModal.classList.add("hidden");
  }
});
