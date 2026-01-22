//tabla de tbldigitaciones 

//tabla asociada a tblaasesores
const pool = require("../config");
const { ejecutarConsulta } = require("../ObtenerPool");

//carga Todas las empreas
const loadParentescoPlanesq = async (dbkey,id) => {
  // // return new Promise((resolve, reject) => {
  //   pool.get((err, db) => {
  //     if (err) return reject(err);
       const sql =
        `SELECT a.idparentesco, A.parentesco  FROM TBLPARENTESCO A order by a.parentesco`;

        const respuesta = ejecutarConsulta(dbkey, sql)
        return respuesta
  //     db.query(sql, [], (err, result) => {
  //       db.detach();
  //       if (err) return reject(err);
  //       resolve(result);
  //     });
  //   });
  // });
};
module.exports = {loadParentescoPlanesq}