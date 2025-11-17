/* Functions related to fetching data from the API */
const urlToFetch = "https://fakestoreapi.com/products";

export async function fetchProducts() {
  try {
    return fetch(`${urlToFetch}`).then((res) => {
      if (!res.ok) throw new Error("error");
      return res.json();
    });
  } catch (error) {
    console.error(error);
  }
}

export function getFetchProductData(id, productArray) {
  return productArray.find((product) => product.id === id);
}
