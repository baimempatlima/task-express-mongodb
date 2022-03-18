const { MongoClient } = require("mongodb");
require("dotenv");
// dotenv.config();
// const url = process.env.MONGO_URI || "mongodb://baim:baim45@localhost:27017?bayu-native?authSource=admin";
// const client = new MongoClient(url);

const env = process.env.NODE_ENV || "development";

const url = () => {
  switch (env) {
    case "development":
      return "mongodb://baim:baim45@localhost:27017/bayu-native?authSource=admin";
    case "production":
      return process.env.MONGO_URI;
  }
};

const client = new MongoClient(url());

// const url = process.env.MONGO_URI || "mongodb://baim:baim45@localhost:27017?authSource=admin";
// const client = new MongoClient(url);

(async () => {
  try {
    await client.connect();
    console.log("koneksi ke mongodb berhasil");
  } catch (e) {
    console.log(e);
  }
})();

const db = client.db();
module.exports = db;
