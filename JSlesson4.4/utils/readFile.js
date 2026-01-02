const fs = require("fs/promises");
const path = require("path");

async function readFile(filename) {
  const filePath = path.join(process.cwd(), "db", filename);
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

module.exports = readFile;
