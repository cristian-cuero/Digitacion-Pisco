class Departamento {
  constructor(
    codDepartamento,
    departamento,
    codRespuesta,
    msjRespuesta,
    subdominio
  ) {
    this.codDepartamento = codDepartamento;
    this.departamento = departamento;
    this.codRespuesta = codRespuesta;
    this.msjRespuesta = msjRespuesta;
    this.subdominio = subdominio;
  }
}

module.exports = Departamento;
