require("dotenv").config();
const express = require("express");
const readDb = require("./utils/readFile");
const writeDb = require("./utils/writeFile");

const app = express();
app.use(express.json());

// Barcha userlarni olish
app.get("/users", async (req, res) => {
  let users = await readDb("users.json");
  
  if ("username" in req.query) {

    let findUser = user.find(
        (user) => user.username.toLowerCase() == req.query.username.toLowerCase()
    );

    if(!findUser) return res.status(404).json({message:"User not found", status: 404});

    return res.json(findUser)
  }
  return res.json(users);
});

// Userni alohida olish
app.get("/users/:id", async (req, res) => {
  // Yuborilayotgan so'rovdagi ID ni oldim
  let { id } = req.params;

  let users = await readDb("users");

  let findUser = users.find((user) => user.id == id);

  if (!findUser) {
    return res.status(404).json({
      message: "User not found",
      status: 404,
    });
  }

  return res.json(findUser);
});

// Userni yaratish
app.post("/users/create", async (req, res) => {
  let newUser = req.body;

  let users = await readDb("users");

  newUser = {
    id: users.length ? users.at(-1).id + 1 : 1,
    ...newUser,
    createdAt: new Date(),
  };

  users.push(newUser);
  await writeDb("users", users);

  return res.status(201).json({
    message: `User created !`,status:201});
})

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}-port`));

// Userni yangilash (UPDATE)
app.put("/users/:id", async (req, res) => {
  let { id } = req.params;

  let users = await readDb("users");

  let idx = users.findIndex((user) => user.id == id);

  if (idx === -1) {
    return res.status(404).json({
      message: "User not found",
      status: 404,
    });
  }

  users[idx] = { ...users[idx], ...req.body };

  await writeDb("users", users);

  return res.json({
    message: "User successfully updated!",
    status: 200,
  });
});

// Userni o‘chirish (DELETE)
app.delete("/users/:id", async (req, res) => {
  let { id } = req.params;

  let users = await readDb("users");

  let idx = users.findIndex((user) => user.id == id);

  if (idx === -1) {
    return res.status(404).json({
      message: "User not found",
      status: 404,
    });
  }

  users.splice(idx, 1);

  await writeDb("users", users);

  return res.json({
    message: "User successfully deleted!",
    status: 200,
  });
});

