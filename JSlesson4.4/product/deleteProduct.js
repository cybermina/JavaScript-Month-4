const readFile = require("../utils/readFile");
const writeFile = require("../utils/writeFile");

async function deleteProduct(id) {
  const products = await readFile("products.json");

  const newProducts = products.filter(p => p.id !== id);

  await writeFile("products.json", newProducts);

  console.log("Product o‘chirildi");
}

module.exports = deleteProduct;
