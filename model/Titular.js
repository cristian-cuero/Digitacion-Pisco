class Titular {
    constructor(data = {}) {
      this.id = data.id || null;
      this.identificacion = data.identificacion || '';
      this.nombre1 = data.nombre1 || '';
      this.nombre2 = data.nombre2 || '';
      this.apellido1 = data.apellido1 || '';
      this.apellido2 = data.apellido2 || '';
      this.departamento = new Departamento(data.departamento);
      this.municipio = new Municipio(data.municipio);
      this.direccion = data.direccion || '';
      this.barrio = new Barrio(data.barrio);
      this.telefono = data.telefono || '';
      this.celular1 = data.celular1 || '';
      this.celular2 = data.celular2 || '';
      this.email = data.email || '';
      this.fechaNacimiento = data.fechaNacimiento || null;
      this.edadAfiliacion = data.edadAfiliacion || null;
      this.edadaActual = data.edadaActual || null;
      this.genero = data.genero || '';
      this.fechaCobertura = data.fechaCobertura || null;
      this.fechaAfiliacion = data.fechaAfiliacion || null;
    }
  
    getNombreCompleto() {
      return `${this.nombre1} ${this.nombre2} ${this.apellido1} ${this.apellido2}`.trim();
    }
  }

  module.exports ={ Titular}