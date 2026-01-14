const { Router } = require("express");
const controller = require("../controller/todo.controller");
const todoValidator = require("../utils/todo.validator");

const router = Router();

router.post(
  "/",
  todoValidator.CREATE,
  controller.CREATE_TODO
);

router.get("/", controller.GET_TODOS);
router.get("/:id", controller.GET_TODO);
router.delete("/:id", controller.DELETE_TODO);

module.exports = router;
