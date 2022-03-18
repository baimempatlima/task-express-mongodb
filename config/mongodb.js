const { MongoClient } = require("mongodb");

const url = process.env.MONGO_URI || "mongodb://baim:baim45@localhost:27017?authSource=admin";
const client = new MongoClient(url);

(async () => {
  try {
    await client.connect();
    console.log(`${url}`, "koneksi ke mongodb berhasil");
  } catch (e) {
    console.log(e);
  }
})();

const db = client.db("bayu-native");
module.exports = db;
