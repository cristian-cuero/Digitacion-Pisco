const pool = require("./config"); // Importa la conexión desde db.js

const dbConnections = async () => {
  pool.get((err, db) => {
    if (err) {
      console.error("❌ Error al conectar con la BD:", err);
      return;
    }

    console.log("✅ Conexión exitosa a la base de datos");

    // Cierra la conexión después de probarla
    db.detach();
  });
};

function finalizarTransaccion(transaction, db, errorFlag, resolve, reject) {
  if (errorFlag) {
    transaction.rollback(() => {
      db.detach();
      reject(new Error("Error en la transacción, cambios revertidos"));
    });
  } else {
    transaction.commit((err) => {
      db.detach();
      if (err) return reject(err);
      resolve("Inserción completada con éxito");
    });
  }
}

module.exports = {
   dbConnections,finalizarTransaccion
}
