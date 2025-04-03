//tblconvenios//tabla asociada a tblaasesores
const pool = require("../config");

//carga TodolosAsesores
const loadConvevionsq = async () => {
  return new Promise((resolve, reject) => {
    pool.get((err, db) => {
      if (err) return reject(err);
      const sql =
        `SELECT IDCONVENIO, NOMBRES FROM TblConvenios`;
      db.query(sql, [], (err, result) => {
        db.detach();
        if (err) return reject(err);
        resolve(result);
      });
    });
  });
};

module.exports = { loadConvevionsq };
