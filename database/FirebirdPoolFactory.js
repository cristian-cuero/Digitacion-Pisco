//POOl Dinamicos 
const Firebird = require("node-firebird");
const { DB_CATALOG } = require("./queries/BdAfiliaciones");

const pools = {};

function getPool(dbKey) {
  
  const cfg = DB_CATALOG[dbKey];
  if (!cfg) throw new Error("BD no registrada");
    
  // Si ya existe el pool → reutilizar
  if (!pools[dbKey]) {
    pools[dbKey] = Firebird.pool(5, {
      ...cfg,
      user: 'SYSDBA',
      password: 'masterkey',
      charset: "WIN1252",
      lowercase_keys: true
    });
  }

  return pools[dbKey];
}

module.exports = { getPool };
