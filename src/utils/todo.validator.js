const ClientError = require("./clientError");

module.exports = {
  CREATE(req, res, next) {
    const { todo_title, todo_description } = req.body;

    if (!todo_title || !todo_description) {
      throw new ClientError("All todo fields are required", 400);
    }

    next();
  }
};
