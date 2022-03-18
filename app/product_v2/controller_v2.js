const path = require("path");
const fs = require("fs");
const Product = require("./model");

const store = async (req, res) => {
  const { users_id, name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    try {
      await Product.sync();
      const result = await Product.create({ users_id, name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}` });
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  }
};

const index = (req, res) => {
  Product.findAll().then((products) => res.send(products));
};

const view = (req, res) => {
  Product.findAll({
    where: {
      id: req.params.id,
    },
  }).then((products) => res.send(products));
};

const destroy = (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => res.send("success delete"));
};

const update = (req, res) => {
  const { users_id, name, price, stock, status } = req.body;
  const image = req.file;

  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    Product.update(
      {
        users_id,
        name,
        price,
        stock,
        status,
        image_url: `http://localhost:3000/public/${image.originalname}`,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then(() => res.send("success"));
  } else {
    Product.update(
      {
        users_id,
        name,
        price,
        stock,
        status,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then(() => res.send("success"));
  }
};

module.exports = {
  store,
  index,
  view,
  destroy,
  update,
};
