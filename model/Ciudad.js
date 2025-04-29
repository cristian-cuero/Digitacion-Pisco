const Departamento = require('./Departamento');

class Municipio {
  constructor(idMunicipio, municipio, depto, codRespuesta, msjRespuesta, subdominio) {
    this.idMunicipio = idMunicipio
    this.municipio = municipio;
    this.departamento = depto; // instancia de Departamento
    this.codRespuesta = codRespuesta;
    this.msjRespuesta = msjRespuesta;
    this.subdominio = subdominio;
  }
}

module.exports = Municipio;