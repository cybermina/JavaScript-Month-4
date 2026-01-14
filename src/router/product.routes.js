const { Router } = require("express");
const controller = require("../controller/product.controller");
const productValidator = require("../utils/product.validator");

const router = Router();

router.post(
  "/",
  productValidator.CREATE,
  controller.CREATE_PRODUCT
);

router.get("/", controller.GET_PRODUCTS);
router.get("/:id", controller.GET_PRODUCT);
router.delete("/:id", controller.DELETE_PRODUCT);

module.exports = router;
