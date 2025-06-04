const Departamento = require('./Departamento');

class Municipio {
  constructor(idMunicipio, municipio, depto, codRespuesta = null, msjRespuesta = null , subdominio = null) {
    this.idMunicipio = idMunicipio
    this.municipio = municipio;
    this.departamento = depto; // instancia de Departamento
    this.codRespuesta = codRespuesta;
    this.msjRespuesta = msjRespuesta;
    this.subdominio = subdominio;
  }
}

module.exports = {Municipio};