const readFile = require("../utils/readFile");
const writeFile = require("../utils/writeFile");

async function updateProduct(id, price, count) {
  const products = await readFile("products.json");

  for (let product of products) {
    if (product.id === id) {
      product.price = price;
      product.count = count;
    }
  }

  await writeFile("products.json", products);

  console.log("Product yangilandi");
}

module.exports = updateProduct;
