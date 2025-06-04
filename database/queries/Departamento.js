//tblconvenios//tabla asociada a tblaasesores
const {
  convertKeysToCamelCaseIfHasUnderscore,
} = require("../../helpers/ComelCase");
const { Municipio } = require("../../model/Ciudad");

const { Departamento } = require("../../model/Departamento");

const pool = require("../config");

//carga TodolosAsesores
const loadDepartamentosq = async () => {
  return new Promise((resolve, reject) => {
    pool.get((err, db) => {
      if (err) return reject(err);
      const sql = `SELECT CODDANE cod_Departamento, cast( DEPARTAMENTO  AS VARCHAR(80) CHARACTER SET WIN1252) departamento, null cod_Respuesta, null msj_Respuesta, null subdominio FROM TBLDANEDEPTO ORDER BY DEPARTAMENTO`;
      db.query(sql, [], (err, result) => {
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

const loadCiudadesDepartamento = async (codigo) => {
  return new Promise((resolve, reject) => {
    pool.get((err, db) => {
      if (err) return reject(err);
      const sql = `SELECT M.IDMUNICIPIO  ID_MUNICIPIO, M.MUNICIPIO, d.coddane cod_Departamento , d.departamento , null cod_Respuesta, null msj_Respuesta, null subdominio   FROM TBLMUNICIPIOS M inner join TBLDANEDEPTO d on m.coddepartamento = d.coddane WHERE M.CODDEPARTAMENTO = ? ORDER BY MUNICIPIO`;
      db.query(sql, [codigo], (err, result) => {
        db.detach();
        const converted = result.map((row) =>
          convertKeysToCamelCaseIfHasUnderscore(row)
        );
        const municipiosTransformados = converted.map((m) => {
          const depto = new   Departamento(
            m.codDepartamento,
            m.departamento,
            m.codRespuesta,
            m.msjRespuesta,
            m.subdominio
          );
          return new Municipio(
            m.idMunicipio,
            m.municipio,
            depto,
            m.codRespuesta,
            m.msjRespuesta,
            m.subdominio
          );
        });
        if (err) return reject(err);
        resolve(municipiosTransformados);
      });
    });
  });
};

module.exports = { loadDepartamentosq, loadCiudadesDepartamento };
