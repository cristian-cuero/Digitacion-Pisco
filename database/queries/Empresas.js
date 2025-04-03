//tabla de tbldigitaciones 

//tabla asociada a tblaasesores
const pool = require("../config");

//carga Todas las empreas
const loadAllEmpresasq = async () => {
  return new Promise((resolve, reject) => {
    pool.get((err, db) => {
      if (err) return reject(err);
      const sql =
        `select e.nit , cast( e.empresa  AS VARCHAR(200) CHARACTER SET WIN1252) empresa from tblempresas e where e.estadoemp <>  'RETIRADO' order by e.empresa`;
      db.query(sql, [], (err, result) => {
        db.detach();
        if (err) return reject(err);
        resolve(result);
      });
    });
  });
};


//carga Todas los planes De la empresa
const loadAllPlanesEmprea = async (nit) => {
  return new Promise((resolve, reject) => {
    pool.get((err, db) => {
      if (err) return reject(err);
      const sql =
      `SELECT b.idplan, B.NOMBREPLAN FROM TBLRELEMPRESAPLAN A INNER JOIN tblplanes B ON A.idplan = B.idplan WHERE A.NIT = ?`;
      db.query(sql, [nit], (err, result) => {
        db.detach();
        if (err) return reject(err);
        resolve(result);
      });
    });
  });
};

module.exports = { loadAllEmpresasq,loadAllPlanesEmprea };
