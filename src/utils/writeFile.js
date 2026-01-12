const fs = require("node:fs/promises");
const path = require("node:path");

const writeDB = async (filename, data) => {
    await fs.writeFile(path.join(process.cwd(), "db", filename), JSON.stringify(data, null, 4) );
    return true
};

module.exports = writeDB;