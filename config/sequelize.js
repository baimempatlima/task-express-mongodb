const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  database: "latihan-cruds-v2",
  host: "localhost",
  username: "postgres",
  password: "root",
  dialect: "postgres",
  port: 5432,
});

// const sequelize = new Sequelize({
//   database: "latihan-cruds-v2",
//   host: "localhost",
//   username: "root",
//   password: "root",
//   dialect: "mysql",
// });

//iife ini yang pertama dijalankan fungsi  ketika ini diload pertama kali
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
