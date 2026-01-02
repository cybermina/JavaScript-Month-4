const fs = require("fs/promises");
const path = require("path");

async function writeFile(filename, data) {
  const filePath = path.join(process.cwd(), "db", filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

module.exports = writeFile;
