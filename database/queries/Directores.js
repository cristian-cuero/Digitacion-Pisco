//tabla de tbldigitaciones 

//tabla asociada a tblaasesores
const pool = require("../config");

//carga TodolosAsesores
const loadDirectores = async () => {
  return new Promise((resolve, reject) => {
    pool.get((err, db) => {
      if (err) return reject(err);
      const sql =
        `SELECT IDDIRECTOR, CAST(NOMBRES AS VARCHAR(30) CHARACTER SET WIN1252) || ' ' || CAST(APELLIDOS AS VARCHAR(30) CHARACTER SET WIN1252) as Nombre_Completo FROM TBLDIRECTOR`;
      db.query(sql, [], (err, result) => {
        db.detach();
        if (err) return reject(err);
        resolve(result);
      });
    });
  });
};

module.exports = { loadDirectores };
