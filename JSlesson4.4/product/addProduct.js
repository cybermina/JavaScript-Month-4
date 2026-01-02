const readFile = require("../utils/readFile");
const writeFile = require("../utils/writeFile");

// получаем данные из терминала
const [, , name, price, count] = process.argv;

async function addProduct() {
  if (!name || !price || !count) {
    console.log("❌ To‘g‘ri yozing:");
    console.log('node product/addProduct.js "Name" price count');
    return;
  }

  const products = await readFile("products.json");

  const newProduct = {
    id: products.length ? products.at(-1).id + 1 : 1,
    products_name: name,
    price: Number(price),
    count: Number(count)
  };

  products.push(newProduct);
  await writeFile("products.json", products);

  console.log("✅ Product qo‘shildi:", newProduct);
}

addProduct();
