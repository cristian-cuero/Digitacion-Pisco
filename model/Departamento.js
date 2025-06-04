class Departamento {
  constructor(
    codDepartamento,
    departamento,
    codRespuesta = null,
    msjRespuesta = null,
    subdominio = null
  ) {
    this.codDepartamento = codDepartamento;
    this.departamento = departamento;
    this.codRespuesta = codRespuesta;
    this.msjRespuesta = msjRespuesta;
    this.subdominio = subdominio;
  }
}

module.exports ={ Departamento};
