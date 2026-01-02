const readFile = require("../utils/readFile");
const writeFile = require("../utils/writeFile");

async function updateCategory(id, newName) {
  const categories = await readFile("category.json");

  for (let category of categories) {
    if (category.id === id) {
      category.category_name = newName;
    }
  }

  await writeFile("category.json", categories);

  console.log("Category yangilandi");
}

module.exports = updateCategory;
