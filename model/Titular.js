const { Barrio } = require("./Barrio");
const { Municipio } = require("./Ciudad");
const { Departamento } = require("./Departamento");

class Titular {
    constructor(data = {}) {

      this.id = data.id || null;
      this.identificacion = data.cedula || '';
      this.nombre1 = data.nombres || '';
      this.nombre2 = data.nombre2 || '';
      this.apellido1 = data.apellidos || '';
      this.apellido2 = data.apellido2 || '';
      this.departamento = new Departamento (data.coddane ,data.departamento);
      this.municipio = new  Municipio (data.idmunicipio, data.municipio);
      this.direccion = data.direccion || '';
      this.barrio = new Barrio(data);
      this.telefono = data.telefono || '';
      this.celular1 = data.celular || '';
      this.celular2 = data.celular2 || '';
      this.email = data.email || '';
      this.fechaNacimiento = data.fechanacimiento || null;
      this.edadAfiliacion = data.edad || null;
      this.edadActual = data.edad2 || null;
      this.genero = data.genero || '';
      this.fechaCobertura = data.fechacobertura || null;
      this.fechaAfiliacion = data.fechaafiliacion || null;
      this.codigocuenta =  data.codigooafiliacion;
      this.estadocivil = data.estadocivil
      this.cedulaContacto = data.cedulacontacto
      this.nombreContacto = data.nombrecontacto
      this.fechaNacimientoContacto = data.fechanacimientocontacto
      this.edadActualContacto = data.edadactualcontacto
      this.direccionContacto = data.direccioncontacto
      this.ciudadContacto = data.ciudadcontacto
      this.telefonoContacto = data.telefonocontacto
      this.nombre1Referidos = data.nombrereferido
      this.telefono1Referidos = data.telefonoreferido
      this.nombre2Referidos = data.nombrereferidoone
      this.telefono2Referidos = data.telefonoreferidoone
      this.tipoviviendacontacto = data.tipoviviendacontacto
      this.fnacimientocontacto = data.fnacimientocontacto

    }
  
    getNombreCompleto() {
      return `${this.nombre1} ${this.nombre2} ${this.apellido1} ${this.apellido2}`.trim();
    }
  }

  module.exports ={ Titular}