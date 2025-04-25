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
const loadAllPlanesEmprea = async (nit) => {
  return new Promise((resolve, reject) => {
    pool.get((err, db) => {
      if (err) return reject(err);
      const sql =
      `SELECT 1 idrelempresaplan, a.nit, b.idplan, a.idtipoplan, a.vtitular ,a.vadicional , p.nombre tipoPlan , B.NOMBREPLAN , null usuario, 
      null usuariomodif, null codRespuesta,  null msjRespuesta, null subdominio FROM TBLRELEMPRESAPLAN A INNER JOIN tblplanes B ON A.idplan = B.idplan 
      inner join tbltipoplan p on a.idtipoplan = p.idtipoplan WHERE A.NIT = ? order by p.nombre`;
      db.query(sql, [nit], (err, result) => {
        db.detach();
        if (err) return reject(err);
        resolve(result);
      });
    });
  });
};

module.exports = { loadAllEmpresasq,loadAllPlanesEmprea };
