const { Empresas } = require("./Empresa");
const { Plan } = require("./Plan");
const { Titular } = require("./Titular");

class Contrato {
    constructor(data = {}) {
      this.id = data.id;
      this.idContrato = data.idContrato;
      this.titular = new Titular(data.titular);
      this.tipoAfiliacion = data.tipoAfiliacion || '';
      this.fechaAfiliacion = data.fechaAfiliacion || null;
      this.estatus = data.estatus || '';
      this.vigenciaDesde = data.vigenciaDesde || null;
      this.vigenciaHasta = data.vigenciaHasta || null;
      this.valorCuota = data.valorCuota || 0;
      this.diaCobro = data.diaCobro || 0;
      this.diaCobro2 = data.diaCobro2 || 0;
      this.plan = new Plan(data.plan);
      this.vendedor = new Persona  (data.vendedor);
      this.direccionCobro = data.direccionCobro || '';
      this.observaciones = data.observaciones || '';
      this.empresa = new Empresas (data.empresas);
      this.empresaCto = data.empresaCto || '';
      this.cobradorCto = data.cobradorCto || '';
      this.vendedorCto = data.vendedorCto || '';
      this.fechaUltimoPago = data.fechaUltimoPago || null;
      this.pagoHasta = data.pagoHasta || null;
      this.nombrePlan = data.nombrePlan || '';
      this.codRespuesta = null
      this.msjRespuesta = null
      this.subdominio = null 
    }
  
}


module.exports = {
    Contrato
}