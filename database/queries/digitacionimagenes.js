const { ejecutarConsulta } = require("../ObtenerPool");

async function ObtenerId() {
  const respuesta = await ejecutarConsulta("select id from P_GEN_IMAGEN", []);
  return respuesta[0].id;
}

async function crearImagen(data ) {
  const id = await ObtenerId();
  data.unshift(id)
  const sql = `INSERT INTO TBLDIGITACIONIMAGENES (IDIMAGEN , NITEMPRESA, NROCONTRATO, FECHA, RUTAIMAGEN,USUARIO,LOTE, CANCELACIONES, CONSECUTIVO) VALUES 
    (?,?,?,?,?,?,?,?,?)
    `;
    await ejecutarConsulta(sql ,data)
}


module.exports = {
    crearImagen
}
