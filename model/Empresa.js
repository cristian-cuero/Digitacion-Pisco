class Empresas {
  constructor(data = {}) {
    this.idEmpresas = data.idEmpresas || null;
    this.empresa = data.empresa || null;
  }
}

module.exports = { Empresas };
