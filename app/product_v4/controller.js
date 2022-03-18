const Product = require("./model");
const fs = require("fs");
const path = require("path");

const store = (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    // res.sendFile(target);
    Product.create({ name, price, stock, status, image_url: `${req.protocol}://${req.headers.host}/public/${encodeURI(image.originalname)}` })
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  }
};

const updateData = (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);

    Product.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: {
          name,
          price,
          stock,
          status,
          image_url: image ? `${req.protocol}://${req.headers.host}/public/${encodeURI(image.originalname)}` : null,
        },
      }
    )
      .then((result) => res.send(result))
      .catch((err) => res.send(err));
  }
};

const index = (req, res) => {
  Product.find()
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

const view = (req, res) => {
  const id = req.params.id;
  Product.findById({ _id: id })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

const destroy = (req, res) => {
  const id = req.params.id;
  Product.deleteOne({ _id: id })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

module.exports = {
  store,
  updateData,
  index,
  view,
  destroy,
};
