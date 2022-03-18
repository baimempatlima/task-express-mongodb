const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const productControllerv2 = require("./controller_v2");

router.post("/product", upload.single("image"), productControllerv2.store);

router.get("/product", productControllerv2.index);

router.get("/product/:id", productControllerv2.view);

router.delete("/product/:id", upload.single("image"), productControllerv2.destroy);

router.put("/product/:id", upload.single("image"), productControllerv2.update);

// router.post("/product", upload.single("image"), async (req, res) => {
//   const { users_id, name, price, stock, status } = req.body;
//   const image = req.file;
//   if (image) {
//     const target = path.join(__dirname, "../../uploads", image.originalname);
//     fs.renameSync(image.path, target);
//     try {
//       await Product.sync();
//       const result = await Product.create({ users_id, name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}` });
//       res.send(result);
//     } catch (e) {
//       res.send(e);
//     }
//   }
// });

// router.get("/product", (req, res) => {
//   Product.findAll().then((products) => res.send(products));
// });

// router.get("/product/:id", (req, res) => {
//   Product.findAll({
//     where: {
//       id: req.params.id,
//     },
//   }).then((products) => res.send(products));
// });

// router.delete("/product/:id", (req, res) => {
//   Product.destroy({
//     where: {
//       id: req.params.id,
//     },
//   }).then(() => res.send("success delete"));
// });

// router.put("/product/:id", upload.single("image"), (req, res) => {
//   const { users_id, name, price, stock, status } = req.body;
//   const image = req.file;

//   if (image) {
//     const target = path.join(__dirname, "../../uploads", image.originalname);
//     fs.renameSync(image.path, target);
//     Product.update(
//       {
//         users_id,
//         name,
//         price,
//         stock,
//         status,
//         image_url: `http://localhost:3000/public/${image.originalname}`,
//       },
//       {
//         where: {
//           id: req.params.id,
//         },
//       }
//     ).then(() => res.send("success"));
//   } else {
//     Product.update(
//       {
//         users_id,
//         name,
//         price,
//         stock,
//         status,
//       },
//       {
//         where: {
//           id: req.params.id,
//         },
//       }
//     ).then(() => res.send("success"));
//   }
// });

module.exports = router;
