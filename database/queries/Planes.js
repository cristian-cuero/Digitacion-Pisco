//tabla de tbldigitaciones 

//tabla asociada a tblaasesores
const pool = require("../config");

//carga Todas las empreas
const loadParentescoPlanesq = async (id) => {
  return new Promise((resolve, reject) => {
    pool.get((err, db) => {
      if (err) return reject(err);
      const sql =
        `SELECT a.idparentesco, A.parentesco  FROM TBLPARENTESCO A  INNER JOIN tblplanparentesco B ON A.idparentesco =B.idparentesco Where b.IDPLAN = ? order by a.parentesco`;
      db.query(sql, [id], (err, result) => {
        db.detach();
        if (err) return reject(err);
        resolve(result);
      });
    });
  });
};
module.exports = {loadParentescoPlanesq}