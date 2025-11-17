/* Functions related to creating and manipulating DOM elements */

export function createProductCard(product) {
  const productContainer = document.querySelector("#product_container");
  const html = `
        <article 
            id="product_${product.id}" 
            class="bg-white rounded-lg shadow-md pt-4 pl-4 pr-4 pb-14 hover:shadow-lg transition-shadow"
            >
            <div class="flex flex-col h-full items-start space-y-3 relative">
                <b class="text-lg font-semibold text-gray-800">
                ${product.title}
                </b>
                <img 
                src="${product.image}" 
                alt="${product.title}"
                class="block w-full max-h-[200px] py-2 object-contain mx-auto rounded"
                />
                <div id="description_${
                  product.id
                }" class="d-1 text-gray-600 text-sm cursor-pointer">
                ${product.description}
                </div>
                <div class="text-xl font-bold text-gray-900">
                ${parseFloat(product.price).toFixed(2)} €
                </div>
                <button 
                id="add_to_cart_${product.id}" 
                class="add-to-cart absolute -bottom-10 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
                >
                Add to cart
                </button>
            </div>
            </article>
        `;
  productContainer.insertAdjacentHTML("beforeend", html);
}

export function setCartCounter(counter) {
  const cartCounter = document.getElementById("cart_counter");
  cartCounter.textContent = counter;
}
