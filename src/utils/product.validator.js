const ClientError = require("./clientError");

module.exports = {
  CREATE(req, res, next) {
    const { product_name, product_price, product_count } = req.body;

    if (!product_name || !product_price || !product_count) {
      throw new ClientError("All product fields are required", 400);
    }

    if (typeof product_price !== "number") {
      throw new ClientError("Product price must be a number", 400);
    }

    if (typeof product_count !== "number") {
      throw new ClientError("Product count must be a number", 400);
    }

    next();
  }
};
