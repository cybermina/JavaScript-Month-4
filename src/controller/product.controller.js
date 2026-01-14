const { readDb } = require("../utils/readFile");
const { writeDb } = require("../utils/writeFile");
const ClientError = require("../utils/clientError");
const globalError = require("../utils/globalError");

module.exports = {
  async CREATE_PRODUCT(req, res) {
    try {
      const { product_name, product_price, product_count } = req.body;

      let products = await readDb("products");

      const newProduct = {
        id: Date.now(),
        product_name,
        product_price,
        product_count,
        createdAt: new Date()
      };

      products.push(newProduct);
      await writeDb("products", products);

      return res.status(201).json(newProduct);
    } catch (err) {
      return globalError(err, res);
    }
  },

  async GET_PRODUCTS(req, res) {
    try {
      let products = await readDb("products");
      return res.json(products);
    } catch (err) {
      return globalError(err, res);
    }
  },

  async GET_PRODUCT(req, res) {
    try {
      const { id } = req.params;
      let products = await readDb("products");

      const findProduct = products.find(p => p.id == id);
      if (!findProduct) throw new ClientError("Product not found", 404);

      return res.json(findProduct);
    } catch (err) {
      return globalError(err, res);
    }
  },

  async DELETE_PRODUCT(req, res) {
    try {
      const { id } = req.params;
      let products = await readDb("products");

      const findProduct = products.find(p => p.id == id);
      if (!findProduct) throw new ClientError("Product not found", 404);

      const filtered = products.filter(p => p.id != id);
      await writeDb("products", filtered);

      return res.json({ message: "Product deleted successfully" });
    } catch (err) {
      return globalError(err, res);
    }
  }
};
