// dbHelper.js

const pool = require("./config");


function ejecutarConsulta(sql, params = []) {
  return new Promise((resolve, reject) => {
    pool.get((err, db) => {
      if (err) return reject(err);
      db.query(sql, params, (err, result) => {
        db.detach(); // Siempre libera la conexión
        if (err) return reject(err);
        resolve(result);
      });
    });
  });
}

module.exports = { ejecutarConsulta };
