const Firebird = require("node-firebird");
const pool = require("../config");
const { finalizarTransaccion } = require("../db");

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
            VALORCTOPOST,REACTIVACION,USUARIOREGISTRO) VALUES (? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? 
            ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?
           ,? ,? ,? ,? ,? ,? )  RETURNING IDDIGITACION,CODIGOAFILIACION 
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
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        let errorFlag = false;
        let pendingQueries = data.length;

        data.forEach((dato, index) => {
          transaction.query(sql, dato, (err) => {
            if (err) {
              console.error(`Error en la fila ${index}:`, err);
              errorFlag = true;
            }

            pendingQueries--;

            // Solo finaliza la transacción cuando todas las consultas han terminado
            if (pendingQueries === 0) {
              const data = finalizarTransaccion(
                transaction,
                db,
                errorFlag,
                resolve,
                reject
              );
              console.log("data :>> ", data);
            }
          });
        });
      });
    });
  });
}

module.exports = { insertarDigitacion, insertarDigitacionBeneficiario };
