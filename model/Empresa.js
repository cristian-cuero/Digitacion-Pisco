class Empresas {
  constructor(data = {}) {
    this.idEmpresas = data.nitempresa || null;
    this.empresa = data.empresa || null;
    this.nitEmpresa =   data.nit || null;
  }
}

module.exports = { Empresas };
