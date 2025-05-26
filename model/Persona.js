class Persona {
  constructor(data = {}) {
    this.idPersona = data.idPersona || null;
    this.nombre1 = data.nombre1 || "";
    this.nombre2 = data.nombre2 || "";
    this.apellido1 = data.apellido1 || "";
    this.apellido2 = data.apellido2 || "";
  }

  getNombreCompleto() {
    return `${this.nombre1} ${this.nombre2} ${this.apellido1} ${this.apellido2}`.trim();
  }
}


module.export = {
    Persona  
}