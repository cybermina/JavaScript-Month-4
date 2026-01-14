const { readDb } = require("../utils/readFile");
const { writeDb } = require("../utils/writeFile");
const ClientError = require("../utils/clientError");
const globalError = require("../utils/globalError");

module.exports = {
  async CREATE_TODO(req, res) {
    try {
      const { todo_title, todo_description } = req.body;

      let todos = await readDb("todos");

      const newTodo = {
        id: Date.now(),
        todo_title,
        todo_description,
        createdAt: new Date()
      };

      todos.push(newTodo);
      await writeDb("todos", todos);

      return res.status(201).json(newTodo);
    } catch (err) {
      return globalError(err, res);
    }
  },

  async GET_TODOS(req, res) {
    try {
      let todos = await readDb("todos");
      return res.json(todos);
    } catch (err) {
      return globalError(err, res);
    }
  },

  async GET_TODO(req, res) {
    try {
      const { id } = req.params;
      let todos = await readDb("todos");

      const findTodo = todos.find(t => t.id == id);
      if (!findTodo) throw new ClientError("Todo not found", 404);

      return res.json(findTodo);
    } catch (err) {
      return globalError(err, res);
    }
  },

  async DELETE_TODO(req, res) {
    try {
      const { id } = req.params;
      let todos = await readDb("todos");

      const findTodo = todos.find(t => t.id == id);
      if (!findTodo) throw new ClientError("Todo not found", 404);

      const filtered = todos.filter(t => t.id != id);
      await writeDb("todos", filtered);

      return res.json({ message: "Todo deleted successfully" });
    } catch (err) {
      return globalError(err, res);
    }
  }
};
