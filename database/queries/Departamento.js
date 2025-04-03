//tblconvenios//tabla asociada a tblaasesores
const pool = require("../config");

//carga TodolosAsesores
const loadDepartamentosq = async () => {
  return new Promise((resolve, reject) => {
    pool.get((err, db) => {
      if (err) return reject(err);
      const sql =
        `SELECT CODDANE, cast( DEPARTAMENTO  AS VARCHAR(80) CHARACTER SET WIN1252) DEPARTAMENTO FROM TBLDANEDEPTO ORDER BY DEPARTAMENTO`;
      db.query(sql, [], (err, result) => {
        db.detach();
        if (err) return reject(err);
        resolve(result);
      });
    });
  });
};


const loadCiudadesDepartamento = async (codigo) => {
  return new Promise((resolve, reject) => {
    pool.get((err, db) => {
      if (err) return reject(err);
      const sql =
        `SELECT IDMUNICIPIO , MUNICIPIO FROM TBLMUNICIPIOS WHERE CODDEPARTAMENTO = ? ORDER BY MUNICIPIO`;
      db.query(sql, [codigo], (err, result) => {
        db.detach();
        if (err) return reject(err);
        resolve(result);
      });
    });
  });
};



module.exports = { loadDepartamentosq, loadCiudadesDepartamento };
