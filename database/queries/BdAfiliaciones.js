const pool = require("../config");

const DB_CATALOG = {};

const loadDbCatalog = async () => {
  return new Promise((resolve, reject) => {
    pool.get((err, db) => {
      if (err) return reject(err);

      const sql = `
          SELECT
            ID,
            IP,
            PUERTO,
            BD
          FROM TBLBDAFILIACIONESWEB
        `;

      db.query(sql, (err, rows) => {
        db.detach();
        if (err) return reject(err);
      
        rows.forEach((r) => {
          DB_CATALOG[r.id] = {
            host: r.ip,
            port: Number(r.puerto),
            user: 'SYSDBA',      // Usuario de Firebird
            password: 'masterkey', 
            database: r.bd.replace(/\\\\/g, '\\'),
          };
        });
   
        resolve(DB_CATALOG);
      });
    });
  });
};

// consukta Las BD que hay
const buscarBD = async (valores = []) => {

  if (!Array.isArray(valores) || valores.length === 0) {
    return [];
  }

  const condiciones =   valores.map(v => `'${v.replace(/'/g, '')}'`)
  .join(',');

  const sql = `
    SELECT ID, 
    DESCRIPCION 
    FROM TBLBDAFILIACIONESWEB
    WHERE ID in( ${condiciones} )
  `;

  console.log('sql :>> ', sql);
  return new Promise((resolve, reject) => {
    pool.get((err, db) => {
      if (err) return reject(err);

      db.query(sql, (err, rows) => {
        db.detach();
        if (err) return reject(err);
        resolve(rows);
      });
    });
  });
};


module.exports = { DB_CATALOG, loadDbCatalog, buscarBD };
