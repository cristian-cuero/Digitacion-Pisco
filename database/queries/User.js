const crypto = require("crypto");
const { convertKeysToCamelCaseIfHasUnderscore } = require("../../helpers/ComelCase");
const pool = require("../config");

const getUsersLogin = (username, password) => {
  return new Promise((resolve, reject) => {
    pool.get((err, db) => {
      if (err) return reject(err);

      let sql =
        "SELECT  u.username, u.pwduser password, u.idpersona, U.nombres nombre, u.APELLIDOS APELLIDO, 0 renovarPass , U.ESTADO, '' cargo , u.usuariomodif, 200 codRespuesta, ";
      sql =
        sql +
        " '' msjRespuesta, u.IDVENDEDOR IDVENDEDOR, null fechacreacion, U.pwdrol rol, null IDCAJA,  null CAJA, 30 cantidadLicencias, null fechaactualizacion, null uuid,  ";
      sql = sql + " null subdominio FROM tblusuarios u  WHERE username = ?";
      db.query(sql, [username], async (err, result) => {
        if (err) {
          db.detach();
          return reject(err);
        }

        if (result.length === 0) {
          db.detach();
          return resolve(null); // Usuario no encontrado
        }

        const storedPassword = String(
          crypto
            .createHash("sha256")
            .update(password)
            .digest("hex")
            .toUpperCase()
        ).trim();

        if (storedPassword === result[0].password) {
          result[0].password = ""; // No devolver la contraseña
          db.detach();
          return resolve(result[0]);
        } else {
          db.detach();
          return resolve(null); // Contraseña incorrecta
        }
      });
    });
  });
};

///usuario por username
const getUsername = (username) => {
  return new Promise((resolve, reject) => {
    pool.get((err, db) => {
      if (err) return reject(err);

      const sql = "SELECT * FROM tblusuarios WHERE username = ?";
      db.query(sql, [username], async (err, result) => {
        if (err) {
          db.detach();
          return reject(err);
        }

        if (result.length === 0) {
          db.detach();
          return resolve(null); // Usuario no encontrado
        }
        if (result) {
          delete result[0].pwduser; // No devolver la contraseña
          db.detach();
          return resolve(result[0]);
          //
        } else {
          return resolve({});
        }
      });
    });
  });
};

const allUser = () => {
  return new Promise((resolve, reject) => {
    pool.get((err, db) => {
      if (err) return reject(err);

      let sql =
        "SELECT u.username, '' password, u.idpersona id_persona, U.nombres nombre, u.APELLIDOS APELLIDO, 0 renovarPass , U.ESTADO, '' cargo , u.usuariomodif usuario_Modif, 200 cod_Respuesta, ";
      sql =
        sql +
        "'' msj_Respuesta, u.idvendedor , null fechacreacion, U.pwdrol rol, null IDCAJA,  null CAJA, 0 cantidad_Licencias, null fechaactulizacion, null uuid, null subdominio FROM tblusuarios u where u.estado = 1";
      db.query(sql, [], async (err, result) => {
        if (err) {
          db.detach();
          return reject(err);
        }

        db.detach();
        const respuesta = result.map(row => convertKeysToCamelCaseIfHasUnderscore(row));
        return resolve(respuesta);
        //
      });
    });
  });
};

const updateUserQuery = async  (campos = []) => {
  return new Promise((resolve, reject) => {
    if (campos[0].length === 0) return reject("No hay Datos Que Actualizar")
    pool.get((err, db) => {
      if (err) return reject(err);

      let sql =
        "UPDATE TBLUSUARIOS SET NOMBRES = ?, APELLIDOS = ?, ESTADO = ?, IDPERSONA = ?, USUARIOMODIF = ?, IDVENDEDOR = ? WHERE (USERNAME = ?) returning USERNAME;";
  
      db.query(sql, campos[0], async (err, result) => {
        if (err) {
          db.detach();
          return reject(err);
        }

        db.detach();
        return resolve(result);
        //
      });
    });
  });
}
module.exports = { getUsersLogin, getUsername, allUser , updateUserQuery};
