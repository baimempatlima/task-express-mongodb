require("./config/mongoose");
const express = require("express");
const path = require("path");
const app = express();
// const productRouter = require("./app/product/routes");
// const productRouterV2 = require("./app/product_v2/routes");
// const log = require("./middleware/logger");
const logger = require("morgan");
const port = process.env.PORT || 3000;
const productRouterV3 = require("./app/product_v3/routes");
const productRouterV4 = require("./app/product_v4/routes");
const cors = require("cors");

const corsOption = {
  credentials: true,
  origin: process.env.URL || "*",
};
app.use(cors(corsOption));
// app.use("/", (req, res) => {
//   res.send({
//     status: "Successfuly",
//     message: "Welcome to Express JS Toturial",
//   });
// });
app.use(logger("dev"));
//menangani request body, parse, digunakan sebelum routing
app.use(express.urlencoded({ extended: true }));
//middleware menangani request json
app.use(express.json());
//menangani file staticm menggunakan middleware bawaan express
app.use("/public", express.static(path.join(__dirname, "uploads")));
// app.use("/api/v1", productRouter);
// app.use("/api/v2", productRouterV2);
app.use("/api/v3", productRouterV3);
app.use("/api/v4", productRouterV4);

//menangani error saat tidak ada dalam routing
app.use((req, res, next) => {
  res.status(404);
  res.send({
    status: "failed",
    message: "Resource: " + req.originalUrl + " Not Found",
  });
});

app.listen(process.env.PORT | port, () => console.log("Server: http://localhost:3000"));
