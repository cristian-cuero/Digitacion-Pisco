//tabla de tbldigitaciones 

//tabla asociada a tblaasesores
const {  convertKeysToCamelCaseIfHasUnderscore } = require("../../helpers/ComelCase");
const pool = require("../config");

//carga Todas las empreas
const loadAllEmpresasq = async () => {
  return new Promise((resolve, reject) => {
    pool.get((err, db) => {
      if (err) return reject(err);
      const sql =
        ` select e.nitempresa id_Empresas , e.nit nit_Empresa , cast( e.empresa  AS VARCHAR(200) CHARACTER SET WIN1252) empresa, 
        e.telefono telefono1, ''telefono2, cast( e.direccion AS VARCHAR(200) CHARACTER SET WIN1252), e.estadoemp estado , null usuario, 
        null  usuariomodif  , 0 vtitular, 0 vadicional, 200 cod_Respuesta,  '' msj_Respuesta,  '' subdominio from tblempresas e where e.estadoemp <>  'RETIRADO' order by e.empresa`;
      db.query(sql, [], (err, result) => {
        db.detach();
        const converted = result.map(row => convertKeysToCamelCaseIfHasUnderscore(row));
        if (err) return reject(err);
        resolve(converted);
      });
    });
  });
};


//carga Todas los planes De la empresa
const loadAllPlanesEmprea = async (nit, idplan) => {
  return new Promise((resolve, reject) => {
    let sql
    let params = [nit];
    pool.get((err, db) => {
      if (err) return reject(err);
      if(!idplan) {
        sql =
        `SELECT  b.idplan id, b.idplan id_plan,  B.NOMBREPLAN NOMBRE_PLAN , 0 estado,  a.vtitular valor_Base ,a.vadicional valor_Adicional, 0 nropersonas , 0 nropersonasadicionales , 1 aceptaadicional ,
        0 edadmaximaadic ,p.idtipoplan , p.nombre  tipoplan,  null cod_Respuesta,  null msj_Respuesta, null subdominio FROM TBLRELEMPRESAPLAN A INNER JOIN tblplanes B ON A.idplan = B.idplan 
        inner join tbltipoplan p on a.idtipoplan = p.idtipoplan WHERE A.NIT = ? order by p.nombre`;
      }else{
        sql = `SELECT  e.nit  id_Empresas , e.nitempresa  nit_Empresa, e.empresa , e.telefono, '' telefono2, 0  estado, null usuario, null  usuariomodif ,
        a.vtitular , a.vadicional ,  null cod_Respuesta,  null msj_Respuesta, null subdominio
        FROM TBLRELEMPRESAPLAN A
        INNER JOIN tblplanes B ON A.idplan = B.idplan
        inner join tblempresas e on a.nit = e.nit
        inner join tbltipoplan p on a.idtipoplan = p.idtipoplan
        WHERE A.NIT =  ? and a.idplan = ? `
        params.push(idplan)
      }

     
      db.query(sql, params, (err, result) => {
        db.detach();
      
        const respuesta = result.map(row => convertKeysToCamelCaseIfHasUnderscore(row));
        if (err) return reject(err);
        resolve(respuesta);
      });
    });
  });
};

module.exports = { loadAllEmpresasq,loadAllPlanesEmprea };
