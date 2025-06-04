class Persona {
  constructor(data = {}) {
    this.idPersona = data.idpersonaa || null;
    this.nombre1 = data.nombresa || "";
    this.nombre2 = data.nombre1a || "";
    this.apellido1 = data.apellidosa || "";
    this.apellido2 = data.apellidosa2 || "";
  }

  getNombreCompleto() {
    return `${this.nombre1} ${this.nombre2} ${this.apellido1} ${this.apellido2}`.trim();
  }
}

class Persona2 {
  constructor(data = {}) {
    this.idPersona = data.iddirector || null;
    this.nombre1 = data.nombredirector || "";
    this.nombre2 = data.nombre1a || "";
    this.apellido1 = data.apellidosa || "";
    this.apellido2 = data.apellidosa2 || "";
  }

  getNombreCompleto() {
    return `${this.nombre1} ${this.nombre2} ${this.apellido1} ${this.apellido2}`.trim();
  }
}


module.exports = {
    Persona , Persona2
}