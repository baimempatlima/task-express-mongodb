const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads" });
// const fs = require("fs");
// const path = require("path");
// const connection = require("../../config/mysql");
const { response } = require("express");
const productController = require("./controller");

// router.get("/", (req, res) => {
//   res.send({
//     status: "Successfuly",
//     message: "Welcome to Express JS Toturial",
//   });
// });

// router.get("/", (req, res) => {
//   const { page, total } = req.query;
//   res.send({
//     status: "Successfuly",
//     message: "Welcome to Express JS Toturial",
//     page,
//     total,
//   });
// });

// router.get("/product", (req, res) => {
//   connection.connect();
//   connection.query(
//     {
//       sql: "SELECT * FROM products",
//     },
//     (error, result) => {
//       if (error) {
//         res.send({
//           status: "failed",
//           response: "failed to fetch data",
//         });
//       } else {
//         res.send({
//           status: "success",
//           response: result,
//         });
//       }
//     }
//   );
//    connection.end();
// });

// router.get("/product/:id", (req, res) => {
//   connection.connect();
//   connection.query(
//     {
//       sql: "SELECT * FROM products WHERE id = ?",
//       values: [req.params.id],
//     },
//     (error, result) => {
//       if (error) {
//         res.send({
//           status: "failed",
//           response: "failed to fetch data",
//         });
//       } else {
//         res.send({
//           status: "success",
//           response: result,
//         });
//       }
//     }
//   );
//   connection.end();
// });

//tambah malter upload single untuk image
// router.post("/product/", upload.single("image"), (req, res) => {
// const { name, price, stock, status } = req.body;
//   console.log(req.file);
// const image = req.file;
//   res.json(req.body);
// if (image) {
//   const target = path.join(__dirname, "uploads", image.originalname);
//   fs.renameSync(image.path, target);
// res.json({
//   name,
//   price,
//   stock,
//   status,
//   image,
// });
// res.sendFile(target);
// }
// });

// router.get("/:category/:tag", (req, res) => {
//   const { category, tag } = req.params;
//   res.json({
//     category: category,
//     tag: tag,
//   });
// });

// router.get("/:category/:tag", (req, res) => {
//   const { category, tag } = req.params;
//   res.json({ category, tag });
// });

router.get("/product", productController.index);

router.get("/product/:id", productController.view);

router.post("/product/", upload.single("image"), productController.store);

router.put("/product/:id", upload.single("image"), productController.update);

router.delete("/product/:id", upload.single("image"), productController.destroy);

module.exports = router;
