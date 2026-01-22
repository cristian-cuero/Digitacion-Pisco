//tblconvenios//tabla asociada a tblaasesores
const {
  convertKeysToCamelCaseIfHasUnderscore,
} = require("../../helpers/ComelCase");
const { Municipio } = require("../../model/Ciudad");

const { Departamento } = require("../../model/Departamento");

const pool = require("../config");
const { ejecutarConsulta } = require("../ObtenerPool");

//carga TodolosAsesores
const loadDepartamentosq = async (dbKey) => {
  let sql;
  console.log("dbkey :>> ", dbKey);
  if (dbKey != "GAS") {
    sql = `SELECT CODDANE ,  DEPARTAMENTO   departamento, null cod_Respuesta, null msj_Respuesta, null subdominio FROM TBLDEPARTAMENTOS ORDER BY DEPARTAMENTO`;
  } else {
    sql = `SELECT CODDANE ,  DEPARTAMENTO   departamento, null cod_Respuesta, null msj_Respuesta, null subdominio FROM TBLDANEDEPTO ORDER BY DEPARTAMENTO`;
  }

  const respuesta = await ejecutarConsulta(dbKey, sql);
  return respuesta;
};

const loadCiudadesDepartamento = async (dbKey, codigo) => {
  let sql;
  if (dbKey != "GAS") {
    sql = `SELECT M.IDMUNICIPIO  ID_MUNICIPIO, M.MUNICIPIO, d.coddane cod_Departamento , d.departamento , null cod_Respuesta, null msj_Respuesta, null subdominio   FROM TBLMUNICIPIOS M inner join TBLDEPARTAMENTOS d on m.coddepartamento = d.coddane WHERE M.CODDEPARTAMENTO = ? ORDER BY MUNICIPIO`;
  } else {
    sql = `SELECT M.IDMUNICIPIO  ID_MUNICIPIO, M.MUNICIPIO, d.coddane cod_Departamento , d.departamento , null cod_Respuesta, null msj_Respuesta, null subdominio   FROM TBLMUNICIPIOS M inner join TBLDANEDEPTO d on m.coddepartamento = d.coddane WHERE M.CODDEPARTAMENTO = ? ORDER BY MUNICIPIO`;
  }

  const result = await ejecutarConsulta(dbKey, sql, codigo);
  const converted = result.map((row) =>
    convertKeysToCamelCaseIfHasUnderscore(row)
  );
  const municipiosTransformados = converted.map((m) => {
    const depto = new Departamento(
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
  return municipiosTransformados;
};

module.exports = { loadDepartamentosq, loadCiudadesDepartamento };
