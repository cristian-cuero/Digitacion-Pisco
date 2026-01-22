//tblconvenios//tabla asociada a tblaasesores
const pool = require("../config");
const { ejecutarConsulta } = require("../ObtenerPool");

//carga TodolosAsesores
const loadConvevionsq = async (dbKey) => {

  const sql =
 `SELECT IDCONVENIO, NOMBRES FROM TblConvenios`;

  const respuesta = await ejecutarConsulta(dbKey, sql   )
  return respuesta
  // return new Promise((resolve, reject) => {
  //   pool.get((err, db) => {
  //     if (err) return reject(err);
  //    
  //     db.query(sql, [], (err, result) => {
  //       db.detach();
  //       if (err) return reject(err);
  //       resolve(result);
  //     });
  //   });
  // });
};

module.exports = { loadConvevionsq };
