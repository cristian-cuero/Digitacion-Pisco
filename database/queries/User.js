const crypto = require('crypto');
const pool = require('../config');

const getUsersLogin = (username, password) => {
  return new Promise((resolve, reject) => {
    pool.get((err, db) => {
      if (err) return reject(err);

      const sql = "SELECT * FROM tblusuarios WHERE username = ?";
      db.query(sql, [username], async (err, result) => {
        if (err) {
          db.detach();
          return reject(err);
        }

        if (result.length === 0) {
          db.detach();
          return resolve(null); // Usuario no encontrado
        }

        const storedPassword =  String( crypto.createHash('sha256').update(password).digest('hex').toUpperCase()).trim();


        if (storedPassword === result[0].PWDUSER) {
          delete result[0].PWDUSER; // No devolver la contraseña
          db.detach();
          return resolve(result[0]);
        } else {
          db.detach();
          return resolve(null); // Contraseña incorrecta
        }
      });
    });
  });
};


///usuario por username 
const getUsername = (username) => {
  return new Promise((resolve, reject) => {
    pool.get((err, db) => {
      if (err) return reject(err);

      const sql = "SELECT * FROM tblusuarios WHERE username = ?";
      db.query(sql, [username], async (err, result) => {
        if (err) {
          db.detach();
          return reject(err);
        }
        if (result.length === 0) {
          delete result[0].PWDUSER; // No devolver la contraseña
          db.detach();
          return resolve(result[0]);
      // 
        }else{

          return resolve({})
        }
      });
    });
  });
};

module.exports = { getUsersLogin, getUsername };
