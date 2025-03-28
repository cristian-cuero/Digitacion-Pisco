//tabla asociada a tblaasesores
const pool = require("../config");

//carga TodolosAsesores
const loadAsesores = async () => {
  return new Promise((resolve, reject) => {
    pool.get((err, db) => {
      if (err) return reject(err);
      const sql =
        `SELECT IDPERSONA , IDPERSONA ,  CAST(NOMBRES AS VARCHAR(30) CHARACTER SET WIN1252) || ' ' || CAST(APELLIDOS AS VARCHAR(30) CHARACTER SET WIN1252) as Nombre_Completo FROM TBLPERSONA WHERE TIPO='VENDEDOR' AND ZIPCONTRATANTE='ACTIVO'`;
      db.query(sql, [], (err, result) => {
        db.detach();
        if (err) return reject(err);
        resolve(result);
      });
    });
  });
};

module.exports = { loadAsesores };
