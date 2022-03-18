const path = require("path");
const fs = require("fs");
const connection = require("../../config/mysql");

//tanpa search /req.query
// const index = (req, res) => {
//   //search
//   const {search} = req.query;
//   connection.query(
//     {
//       sql: "SELECT * FROM products",
//     },
//     _response(res)
//   );
// };

const index = (req, res) => {
  //search
  const { search } = req.query;
  let exec = {};

  if (search) {
    exec = {
      sql: "SELECT * FROM products WHERE name LIKE ?",
      values: [`%${search}%`],
    };
  } else {
    exec = {
      sql: "SELECT * FROM products ",
    };
  }
  connection.query(exec, _response(res));
};

const view = (req, res) => {
  connection.query(
    {
      sql: "SELECT * FROM products WHERE id = ?",
      values: [req.params.id],
    },
    _response(res)
  );
};
//untuk menghapus data
const destroy = (req, res) => {
  connection.query(
    {
      sql: "DELETE FROM products WHERE id = ?",
      values: [req.params.id],
    },
    _response(res)
  );
};

//menggunakan post untuk menambah data
const store = (req, res) => {
  const { users_id, name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    // res.sendFile(target);
    connection.query(
      {
        sql: "INSERT INTO products (users_id, name, price, stock, status, image_url ) VALUES (?, ?, ?, ?, ?, ?)",
        values: [parseInt(users_id), name, price, stock, status, `http://localhost:3000/public/${image.originalname}`],
      },
      _response(res)
    );
  }
};

//menggunakan put untuk mengupdate data
const update = (req, res) => {
  const { users_id, name, price, stock, status } = req.body;
  const image = req.file;
  let sql = "";
  let values = "";
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    // res.sendFile(target);
    //ini kalau ada gambar
    sql = "UPDATE products SET users_id = ?, name= ?, price= ?, stock = ?, status = ?, image_url = ? WHERE id = ?";
    values = [parseInt(users_id), name, price, stock, status, `http://localhost:3000/public/${image.originalname}`, req.params.id];
  } else {
    //kalau tidak ada gambar
    sql = "UPDATE products SET user_id = ?, name= ?, price= ?, stock = ?, status = ? WHERE id = ?";
    values = [parseInt(users_id), name, price, stock, status, req.params.id];
  }

  connection.query({ sql, values }, _response(res));
};

const _response = (res) => {
  return (error, result) => {
    if (error) {
      res.send({
        status: "failed",
        // response: "failed to fetch data",
        response: error,
      });
    } else {
      res.send({
        status: "success",
        response: result,
      });
    }
  };
};
// const index = (req, res) => {
//     connection.query(
//       {
//         sql: "SELECT * FROM products WHERE id = ?",
//         values: [req.params.id],
//       },
//       (error, result) => {
//         if (error) {
//           res.send({
//             status: "failed",
//             response: "failed to fetch data",
//           });
//         } else {
//           res.send({
//             status: "success",
//             response: result,
//           });
//         }
//       }
//     );
//   }
module.exports = {
  index,
  view,
  store,
  update,
  destroy,
};
