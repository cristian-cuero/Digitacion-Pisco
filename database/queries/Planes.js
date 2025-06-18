//tabla de tbldigitaciones 

//tabla asociada a tblaasesores
const pool = require("../config");

//carga Todas las empreas
const loadParentescoPlanesq = async (id) => {
  return new Promise((resolve, reject) => {
    pool.get((err, db) => {
      if (err) return reject(err);
      const sql =
        `SELECT a.idparentesco, A.parentesco  FROM TBLPARENTESCO A order by a.parentesco`;
      db.query(sql, [], (err, result) => {
        db.detach();
        if (err) return reject(err);
        resolve(result);
      });
    });
  });
};
module.exports = {loadParentescoPlanesq}