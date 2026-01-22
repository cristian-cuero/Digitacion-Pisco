const { ejecutarConsulta } = require("../ObtenerPool");

// si puede realizar la opcion
const consultarPrivilegio = async (dbKey,usuario, privilegio, formulario) => {
  const resp = await ejecutarConsulta(dbKey,
    "SELECT A.IDPRIVILEGIO,A.USUARIO,A.ESTADO,B.PRIVILEGIO,B.FORMULARIO FROM TBLPRIVILEGIOS B INNER JOIN TBLRELUSUARIOPRIVILEGIO A ON B.IDPRIVILEGIO=A.IDPRIVILEGIO WHERE A.ESTADO='ACTIVO' AND A.USUARIO= ? AND B.PRIVILEGIO= ? AND B.FORMULARIO=?",
    [usuario, privilegio, formulario]
  );

  

  if (resp.length === 0) return false;
  return true;
};

module.exports = { consultarPrivilegio };
