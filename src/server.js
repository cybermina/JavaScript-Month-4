const productRoutes = require("./router/product.routes");
const todoRoutes = require("./router/todo.routes");

app.use("/products", productRoutes);
app.use("/todos", todoRoutes);
