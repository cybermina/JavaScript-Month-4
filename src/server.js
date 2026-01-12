require("dotenv").config();
const express = requre("express");
const morgan = require("morgan");
const userRouter = require("./router/user.routes");

const app = express();

app.use(express.json());
app.use(morgan("dev"))

app.use("/api/users", userRouter);

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}-port`));