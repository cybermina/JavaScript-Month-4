const readFile = require("../utils/readFile");
const writeFile = require("../utils/writeFile");

async function deleteCategory(id) {
  const categories = await readFile("category.json");

  const newCategories = categories.filter(c => c.id !== id);

  await writeFile("category.json", newCategories);

  console.log("Category o‘chirildi");
}

module.exports = deleteCategory;
