//tabla asociada a tblaasesores
const { convertKeysToCamelCaseIfHasUnderscore } = require("../../helpers/ComelCase");
const pool = require("../config");

//carga TodolosAsesores
const loadAsesores = async (TIPO) => {
  return new Promise((resolve, reject) => {
    pool.get((err, db) => {
      if (err) return reject(err);
      const sql = `SELECT null id , idpersona  id_persona ,  CAST(p.NOMBRES AS VARCHAR(30) CHARACTER SET WIN1252) nombre1, '' nombre2 , CAST(p.APELLIDOS AS VARCHAR(30) CHARACTER SET WIN1252) as apellido1 , '' apellido2, p.telefono telefono1 , '' telefono2 , 0 estado, p.tipo  tipo_Empleado, p.parentesco email, 1 enviarcopiacto, null cod_Respuesta,  null msj_Respuesta, null subdominio FROM TBLPERSONA p WHERE p.TIPO= ? AND p.ZIPCONTRATANTE='ACTIVO'`;
      db.query(sql, [TIPO], (err, result) => {
        db.detach();
        const converted = result.map((row) =>
          convertKeysToCamelCaseIfHasUnderscore(row)
        );
        if (err) return reject(err);
        resolve(converted);
      });
    });
  });
};

module.exports = { loadAsesores };
