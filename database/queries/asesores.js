//tabla asociada a tblaasesores
const { convertKeysToCamelCaseIfHasUnderscore } = require("../../helpers/ComelCase");
const { ejecutarConsulta } = require("../ObtenerPool");


//carga TodolosAsesores
const loadAsesores = async (TIPO, dbKey) => {
 
      const sql = `SELECT null id , idpersona  id_persona ,  CAST(p.NOMBRES AS VARCHAR(30) CHARACTER SET WIN1252) nombre1, '' nombre2 , CAST(p.APELLIDOS AS VARCHAR(30) CHARACTER SET WIN1252) as apellido1 , '' apellido2, p.telefono telefono1 , '' telefono2 , 1 estado, p.tipo  tipo_Empleado, p.parentesco email, 1 enviarcopiacto, null cod_Respuesta,  null msj_Respuesta, null subdominio FROM TBLPERSONA p WHERE p.TIPO= ? AND p.ZIPCONTRATANTE='ACTIVO'`;
   
        const result = await ejecutarConsulta(dbKey , sql , TIPO.tipoEmpleado)

        const converted = result.map((row) =>
          convertKeysToCamelCaseIfHasUnderscore(row)
        );

        return converted
   
};

module.exports = { loadAsesores };
