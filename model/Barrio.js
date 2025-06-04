class Barrio {
    constructor(data = {}) {
      this.idBarrio = data.idbarrio ||"1"
      this.barrio = data.barrio || "";
      this.municipio = data.municipio || null; // instancia de Departamento
      this.codRespuesta = null;
      this.msjRespuesta = null;
      this.subdominio = null;
    }
  }
  
  module.exports = {Barrio};