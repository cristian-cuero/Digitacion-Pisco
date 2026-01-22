const { getPool } = require("./FirebirdPoolFactory");

async function ejecutarConsulta(dbKey, sql, params = []) {
  return new Promise((resolve, reject) => {
    // Obtener pool
    const pool = getPool(dbKey);
    console.log('pool :>> ', dbKey);
    if (!pool) return reject(new Error('No se pudo obtener el pool para dbKey: ' + dbKey));

    // Conectarse a la DB
    pool.get((err, db) => {
      if (err) return reject(err);
      if (!db) return reject(new Error('No se obtuvo la conexión de la pool'));

      // Ejecutar consulta

      db.query(sql, params, (err, result) => {
        // Desconectar siempre
        db.detach();
     
        if (err) {
          if (err.gdscode === 335544665) {
            return reject({
              msg: "Ya se Encuentra El registro",
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

module.exports = { ejecutarConsulta };
