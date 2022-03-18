const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const env = process.env.NODE_ENV || "development";

let db = new mongoose.Connection();

switch (env) {
  case "development":
    mongoose.connect("mongodb://baim:baim45@localhost:27017/bayu-native?authSource=admin");
    db = mongoose.connection;
    break;
  case "production":
    mongoose.connect(process.env.MONGO_URI);
    db = mongoose.connection;
    break;
}
db.on("error", () => {
  console.log("connection error");
});
db.once("open", () => {
  console.log("Server mongooseDatabase terhubung");
});

// const database = process.env.MONGO_URI || "mongodb://baim:baim45@localhost:27017/bayu-native?authSource=admin";

// mongoose.connect(database, {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// });

// mongoose.connection.on("connected", () => {
//   console.log(`${database}`, "Server Mongoose Database terhubung");
// });

// const db = mongoose.connection;
// db.on("error", console.log.bind(`${database}`, "connection error"));
// db.once("open", console.log.bind(`${database}`, "Server mongooseDatabase terhubung"));
