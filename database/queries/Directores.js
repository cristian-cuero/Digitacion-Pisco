//tabla de tbldigitaciones 

//tabla asociada a tblaasesores
const { convertKeysToCamelCaseIfHasUnderscore } = require("../../helpers/ComelCase");
const pool = require("../config");

//carga TodolosAsesores
const loadDirectores = async () => {
  return new Promise((resolve, reject) => {
    pool.get((err, db) => {
      if (err) return reject(err);
      const sql =
        `SELECT  null id ,IDDIRECTOR id_persona, CAST(NOMBRES AS VARCHAR(30) CHARACTER SET WIN1252) nombre1, '' nombre2 ,  CAST(APELLIDOS AS VARCHAR(30) CHARACTER SET WIN1252)  as apellido1 , '' apellido2 , ''  telefono1 , '' telefono2 , 0 estado,  'DIRECTOR'  tipo_Empleado, '' email, 1 enviarcopiacto, null cod_Respuesta,  null msj_Respuesta, null subdominio  FROM TBLDIRECTOR`;
      db.query(sql, [], (err, result) => {
        db.detach();
        const res = result.map(row =>
        convertKeysToCamelCaseIfHasUnderscore(row))
        if (err) return reject(err);
        resolve(res);
      });
    });
  });
};

module.exports = { loadDirectores };
