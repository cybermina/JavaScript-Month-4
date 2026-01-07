const fs = require("node:fs/promises");
const path = require("node:path");

const readDB = async (filename) => {
    let date = await fs.readFile(path.join(process.cwd(), "db", filename), "utf-8");
    return JSON.parse(date);
};

module.exports = readDB;