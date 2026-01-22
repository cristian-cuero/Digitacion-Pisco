const {
  convertKeysToCamelCaseIfHasUnderscore,
} = require("../../helpers/ComelCase");
const pool = require("../config");
const { ejecutarConsulta } = require("../ObtenerPool");

const allRolesQuery = () => {
  // return new Promise((resolve, reject) => {
  //   pool.get((err, db) => {
  //     if (err) return reject(err);
      const sql =
        "select  r.idrol  id_rol, r.rol , r.estado , null cod_Respuesta,  null msj_Respuesta, null subdominio   from tblroles r order by r.rol";

        const respuesta = ejecutarConsulta(dbkey, sql);
        return respuesta;
  //     db.query(sql, [], (err, result) => {
  //       db.detach;
  //       const respuesta = result.map((row) =>
  //         convertKeysToCamelCaseIfHasUnderscore(row)
  //       );
  //       if (err) return reject(err);
  //       resolve(respuesta);
  //     });
  //   });
  // });
};

module.exports = {
  allRolesQuery,
};
