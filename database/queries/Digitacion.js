const Firebird = require("node-firebird");
const {
  convertKeysToCamelCaseIfHasUnderscore,
} = require("../../helpers/ComelCase");
const pool = require("../config");
const { finalizarTransaccion } = require("../db");
const { getPool } = require("../FirebirdPoolFactory");
const { ejecutarConsulta } = require("../ObtenerPool");

// Obtener nuevo ID desde el procedimiento almacenado
async function obtenerNuevoId( dbKey , titular = true) {

      let sql = "";
      if (titular) {
        sql = "select id from SP_GEN_TBLTDIGITACIONUNO_ID";
      } else {
        sql = "SELECT id FROM P_GEN_IDBENEFICIARIO";
      }
       const respuesta = await ejecutarConsulta(dbKey,sql);

       return respuesta;
}

// Insertar digitacion titular
async function insertarDigitacion( dbKey ,data) {
 

    const IDDIGITACIONPRO = await obtenerNuevoId(dbKey)

    console.log('IDDIGITACIONPRO :>> ', IDDIGITACIONPRO);
    

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
        IDDIGITACIONPRO[0].ID,
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

      try {
        const result = await ejecutarConsulta(dbKey, sql, values);
        return  result ;
      } catch (err) {
        if (err.msg === "Ya se Encuentra El registro") {
          throw {
            msg: "Ya se Encuentra registrado Este Cliente",
            iddigitacion: 0,
            codigoafiliacion: "0",
          };
        } else {
          throw {
            msg: err,
            iddigitacion: 0,
            codigoafiliacion: "0",
          };
        }
      }
      
      

}

//editarDigitacion

async function editarDigitacionQuery(dbKey,data = []) {

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

  await ejecutarConsulta(dbKey,sql, data[0] );
}
//insertar digitacion beneficiario

async function insertarDigitacionBeneficiario( dbKey,data = []) {
 

        const sql = `INSERT INTO TBLBDIGITACIONUNO 
          (NOMBRES, APELLIDOS, IDPARENTESCO, EDAD, USUARIO, PROCESADO, 
          NITEMPRESA, ADICIONAL, VALORADICIONAL, IDDIGITACION, CODIGOAFILIACION) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING CEDULA`;
          console.log(data[0])
         const result = await ejecutarConsulta(dbKey, sql, data[0]);
         
         if(result){
          return true
         }else{
          return false
         }
        
}

const ExisteDigitacion = async ( dbKey, id = 0) => {

      let sql =
        "select  d.iddigitacion, d.codigoafiliacion, NITEMPRESA from TBLTDIGITACIONUNO d where d.iddigitacion = ?";
      const respuesta = await ejecutarConsulta(dbKey , sql , id)
      return respuesta;
};

//eliminar Beneficiario
async function EliminarBeneficiario(dbKey,Datos) {
  // return new Promise((resolve, reject) => {
  //   pool.get((err, db) => {
  //     if (err) return reject(err);
       let sql =
        "DELETE FROM TBLBDIGITACIONUNO WHERE IDDIGITACION= ? AND CEDULA=?";
        await ejecutarConsulta(dbKey, sql , Datos)
        return true;
    //   db.query(sql, Datos, (err, result) => {
    //     db.detach();
    //     if (err) return reject(err);
    //     resolve(true);
    //   });
    // });
  // });
}

//buscar  digitaciones
async function BuscarContratos(dbKey,Datos) {
  //mejora Reutilzar Los Pool Para No Hacerlo Siempre Da Pereza Luego Se Remplza para los demas
  const sql = "SELECT * FROM PRC_BUSQUEDA_DIGITACION(?, ?, ?, ?, ?,?, ?)";
  const respuesta = await ejecutarConsulta(dbKey,sql, Datos);

  return respuesta;
}

async function BuscarBenefeciarios( dbKey,iddigitacion) {
  //mejora Reutilzar Los Pool Para No Hacerlo Siempre Da Pereza Luego Se Remplza para los demas
  const sql = "SELECT * FROM P_AW_GETBENEFICIARIO(?)";
  const respuesta = await ejecutarConsulta(dbKey,sql, [iddigitacion]);
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
