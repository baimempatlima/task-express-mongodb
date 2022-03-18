const { ObjectId } = require("mongodb");
const db = require("../../config/mongodb");
const fs = require("fs");
const path = require("path");

const index = (req, res) => {
  const { search } = req.query;
  if (search) {
    let src = search;
    db.collection("products")
      .find({ name: { $regex: ".*" + src.toLowerCase() + ".*", $options: "i" } })
      .toArray([])
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  } else {
    db.collection("products")
      .find({})
      .toArray()
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  }
};

const view = (req, res) => {
  const { id } = req.params;
  db.collection("products")
    .findOne({ _id: ObjectId(id) })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

const store = (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    // res.sendFile(target);
    // const { id } = req.params;
    //  `http://localhost:3000/public/${image.originalname}`
    db.collection("products")
      .insertOne({ name, price, stock, status, image_url: `${req.protocol}://${req.headers.host}/public/${encodeURI(image.originalname)}` })
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  }
};

const updateData = (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  const { id } = req.params;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);

    db.collection("products")
      .findOneAndUpdate(
        {
          _id: ObjectId(id),
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

const destroy = (req, res) => {
  const id = req.params.id;
  db.collection("products")
    .deleteOne({ _id: ObjectId(id) })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

module.exports = {
  index,
  view,
  store,
  destroy,
  updateData,
};
