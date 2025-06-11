const Firebird = require("node-firebird");
const {
  convertKeysToCamelCaseIfHasUnderscore,
} = require("../../helpers/ComelCase");
const pool = require("../config");
const { finalizarTransaccion } = require("../db");
const { ejecutarConsulta } = require("../ObtenerPool");

// Obtener nuevo ID desde el procedimiento almacenado
async function obtenerNuevoId(titular = true) {
  return new Promise((resolve, reject) => {
    pool.get((err, db) => {
      if (err) return reject(err);
      let sql = "";
      if (titular) {
        sql = "select id from SP_GEN_TBLTDIGITACIONUNO_ID";
      } else {
        sql = "SELECT id FROM P_GEN_IDBENEFICIARIO";
      }
      db.query(sql, [], (err, result) => {
        db.detach();
        if (err) return reject(err);
        resolve(result[0].ID);
      });
    });
  });
}

// Insertar digitacion titular
async function insertarDigitacion(data) {
  return new Promise(async (resolve, reject) => {
    const IDDIGITACIONPRO = await obtenerNuevoId();
    pool.get((err, db) => {
      if (err) return reject(err);

      const sql = `
            INSERT INTO TBLTDIGITACIONUNO 
            (IDDIGITACION, FECHAAFILIACION, CODIGOAFILIACION, APELLIDOS, NOMBRES, CEDULA, ESTADOCIVIL,
            IDGRADO, IDFUERZA,TELEFONO,DEPARTAMENTO,CIUDAD,CODIGOMIN,UNIDAD,BATALLON,IDPLAN,IDASESOR,FECHAIDESCUENTO,
            USUARIO,NITEMPRESA,DESCRIPCIONFUERZA,FECHATERCONTRATO,
            VALORPLAN,NROADICIONALES,VALORADICIONAL,VTAFILIACION, DIRECCION,TIPOVIVIENDA,CELULAR,FECHANACIMIENTO,EDAD,
            OBSERVACIONES, DIRECCIONANT,BARRIO,MAIL,TIENEIMAGEN,MESESGRATIS,FUNANTERIOR,IDDIRECTOR,CEDULACONTACTO,
            NOMBRECONTACTO,TELEFONOCONTACTO,DIRECCIONCONTACTO,CIUDADCONTACTO,FNACIMIENTOCONTACTO,EDADCONTACTO,
            TIPOVIVIENDACONTACTO,NOMBREREFERIDO,TELEFONOREFERIDO,NOMBREREFERIDOONE,TELEFONOREFERIDOONE,CUOTAS,
            VALORCTOPOST,REACTIVACION,USUARIOREGISTRO,digitacionCall) VALUES (? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? 
            ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?
           ,? ,? ,? ,? ,? ,?,? )  RETURNING IDDIGITACION,CODIGOAFILIACION 
          `;

      const values = [
        IDDIGITACIONPRO,
        data.FECHAAFILIACION,
        data.CODIGOAFILIACION,
        data.APELLIDOS,
        data.NOMBRES,
        data.CEDULA,
        data.ESTADOCIVIL,
        data.IDGRADO,
        data.IDFUERZA,
        data.TELEFONO,
        data.DEPARTAMENTO,
        data.CIUDAD,
        data.CODIGOMIN,
        data.UNIDAD,
        data.BATALLON,
        data.IDPLAN,
        data.IDASESOR,
        data.FECHAIDESCUENTO,
        data.USUARIO,
        data.NITEMPRESA,
        data.DESCRIPCIONFUERZA,
        data.FECHATERCONTRATO,
        data.VALORPLAN,
        data.NROADICIONALES,
        data.VALORADICIONAL,
        data.VTAFILIACION,
        data.DIRECCION,
        data.TIPOVIVIENDA,
        data.CELULAR,
        data.FECHANACIMIENTO,
        data.EDAD,
        data.OBSERVACIONES,
        data.DIRECCIONANT,
        data.BARRIO,
        data.MAIL,
        data.TIENEIMAGEN,
        data.MESESGRATIS,
        data.FUNANTERIOR,
        data.IDDIRECTOR,
        data.CEDULACONTACTO,
        data.NOMBRECONTACTO,
        data.TELEFONOCONTACTO,
        data.DIRECCIONCONTACTO,
        data.CIUDADCONTACTO,
        data.FNACIMIENTOCONTACTO,
        data.EDADCONTACTO,
        data.TIPOVIVIENDACONTACTO,
        data.NOMBREREFERIDO,
        data.TELEFONOREFERIDO,
        data.NOMBREREFERIDOONE,
        data.TELEFONOREFERIDOONE,
        data.CUOTAS,
        data.VALORCTOPOST,
        data.REACTIVACION,
        data.USUARIOREGISTRO,
        0,
      ];

      db.query(sql, values, (err, result) => {
        db.detach();
        if (err) {
          if (err.gdscode === 335544665) {
            return reject({
              msg: "Ya se Encuentra registrado Este Cliente",
              iddigitacion: 0,
              codigoafiliacion: "0",
            });
          }
          return reject(err);
        }
        resolve(result);
      });
    });
  });
}

//editarDigitacion

async function editarDigitacionQuery(data = []) {

  const sql = ` UPDATE TBLTDIGITACIONUNO SET
  FECHAAFILIACION = ?,
  CODIGOAFILIACION = ?,
  APELLIDOS = ?,
  NOMBRES = ?,
  CEDULA = ?,
  ESTADOCIVIL = ?,
  IDGRADO = ?,
  IDFUERZA = ?,
  TELEFONO = ?,
  DEPARTAMENTO = ?,
  CIUDAD = ?,
  CODIGOMIN = ?,
  UNIDAD = ?,
  BATALLON = ?,
  IDPLAN = ?,
  IDASESOR = ?,
  FECHAIDESCUENTO = ?,
  USUARIO = ?,
  NITEMPRESA = ?,
  DESCRIPCIONFUERZA = ?,
  FECHATERCONTRATO = ?,
  VALORPLAN = ?,
  NROADICIONALES = ?,
  VALORADICIONAL = ?,
  VTAFILIACION = ?,
  DIRECCION = ?,
  TIPOVIVIENDA = ?,
  CELULAR = ?,
  FECHANACIMIENTO = ?,
  EDAD = ?,
  OBSERVACIONES = ?,
  DIRECCIONANT = ?,
  BARRIO = ?,
  MAIL = ?,
  TIENEIMAGEN = ?,
  MESESGRATIS = ?,
  FUNANTERIOR = ?,
  IDDIRECTOR = ?,
  CEDULACONTACTO = ?,
  NOMBRECONTACTO = ?,
  TELEFONOCONTACTO = ?,
  DIRECCIONCONTACTO = ?,
  CIUDADCONTACTO = ?,
  FNACIMIENTOCONTACTO = ?,
  EDADCONTACTO = ?,
  TIPOVIVIENDACONTACTO = ?,
  NOMBREREFERIDO = ?,
  TELEFONOREFERIDO = ?,
  NOMBREREFERIDOONE = ?,
  TELEFONOREFERIDOONE = ?,
  CUOTAS = ?,
  VALORCTOPOST = ?,
  REACTIVACION = ?,
  USUARIOREGISTRO = ?
WHERE IDDIGITACION = ? `;

  await ejecutarConsulta(sql, data[0] );
}
//insertar digitacion beneficiario

async function insertarDigitacionBeneficiario(data = []) {
  return new Promise((resolve, reject) => {
    pool.get((err, db) => {
      if (err) return reject(err);

      db.transaction(Firebird.ISOLATION_READ_COMMITTED, (err, transaction) => {
        if (err) {
          db.detach();
          return reject(err);
        }

        const sql = `INSERT INTO TBLBDIGITACIONUNO 
          (NOMBRES, APELLIDOS, IDPARENTESCO, EDAD, USUARIO, PROCESADO, 
          NITEMPRESA, ADICIONAL, VALORADICIONAL, IDDIGITACION, CODIGOAFILIACION) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)  RETURNING CEDULA `;

        let errorFlag = false;
        let pendingQueries = data.length;
        let insertedIds = [];

        data.forEach((dato, index) => {
          transaction.query(sql, dato, (err, result) => {
            if (err) {
              console.error(`Error en la fila ${index}:`, err);
              errorFlag = true;
            } else {
              // result contiene el valor devuelto por RETURNING
              if (result) {
                insertedIds[index] = result.cedula;
              }
            }

            pendingQueries--;

            // Solo finaliza la transacción cuando todas las consultas han terminado
            if (pendingQueries === 0) {
              const data = finalizarTransaccion(
                transaction,
                db,
                errorFlag,
                resolve,
                reject,
                insertedIds
              );
              console.log("data :>> ", data);
            }
          });
        });
      });
    });
  });
}

const ExisteDigitacion = async (id = 0) => {
  return new Promise((resolve, reject) => {
    pool.get((err, db) => {
      if (err) return reject(err);
      let sql =
        "select  d.iddigitacion, d.codigoafiliacion, NITEMPRESA from TBLTDIGITACIONUNO d where d.iddigitacion = ?";
      db.query(sql, [id], (err, result) => {
        db.detach();
        if (err) return reject(err);
        resolve(result);
      });
    });
  });
};

//eliminar Beneficiario
async function EliminarBeneficiario(Datos) {
  return new Promise((resolve, reject) => {
    pool.get((err, db) => {
      if (err) return reject(err);
      let sql =
        "DELETE FROM TBLBDIGITACIONUNO WHERE IDDIGITACION= ? AND CEDULA=?";
      db.query(sql, Datos, (err, result) => {
        db.detach();
        if (err) return reject(err);
        resolve(true);
      });
    });
  });
}

//buscar  digitaciones
async function BuscarContratos(Datos) {
  //mejora Reutilzar Los Pool Para No Hacerlo Siempre Da Pereza Luego Se Remplza para los demas
  const sql = "SELECT * FROM PRC_BUSQUEDA_DIGITACION(?, ?, ?, ?, ?,?, ?)";
  const respuesta = await ejecutarConsulta(sql, Datos);

  return respuesta;
}

async function BuscarBenefeciarios(iddigitacion) {
  //mejora Reutilzar Los Pool Para No Hacerlo Siempre Da Pereza Luego Se Remplza para los demas
  const sql = "SELECT * FROM P_AW_GETBENEFICIARIO(?)";
  const respuesta = await ejecutarConsulta(sql, [iddigitacion]);
  const converted = respuesta.map((row) =>
    convertKeysToCamelCaseIfHasUnderscore(row)
  );
  return converted;
}

module.exports = {
  insertarDigitacion,
  insertarDigitacionBeneficiario,
  ExisteDigitacion,
  EliminarBeneficiario,
  BuscarContratos,
  BuscarBenefeciarios,
  editarDigitacionQuery
};
