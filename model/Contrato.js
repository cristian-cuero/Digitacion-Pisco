const { Empresas } = require("./Empresa");
const { Plan } = require("./Plan");
const { Titular } = require("./Titular");
const { Persona, Persona2 } = require("./Persona");

class Contrato {
    constructor(data = {}) {
      
      this.id = data.iddigitacion;
      this.idContrato = data.codigooafiliacion;
      this.titular = new Titular(data);
      this.fechaAfiliacion = data.fechaafiliacion || null;
      this.estatus = data.estatus || '';
      this.vigenciaDesde = data.vigenciaDesde || null;
      this.vigenciaHasta = data.vigenciaHasta || null;
      this.valorCuota = data.cuota || 0;
      this.diaCobro = data.diaCobro || 0;
      this.diaCobro2 = data.diaCobro2 || 0;
      this.plan = new Plan(data);
      this.vendedor = new Persona(data);
      this.cobrador = new Persona2(data);
      this.direccionCobro = data.direccioncobro || '';
      this.observaciones = data.observaciones || '';
      this.empresa = new Empresas (data);
      this.empresaCto = data.empresa || '';
      this.cobradorCto = data.cobradorCto || '';
      this.vendedorCto = data.vendedorcto || '';
      this.fechaUltimoPago = data.fechaUltimoPago || null;
      this.pagoHasta = data.pagoHasta || null;
      this.nombrePlan = data.nombrePlan || '';
      this.codRespuesta = null
      this.msjRespuesta = null
      this.subdominio = null 
      this.identificacion = data.cedula || '';
      this.nombre1 = data.nombres || '';
      this.nombre2 = data.nombre2 || '';
      this.apellido1 = data.apellidos || '';
      this.apellido2 = data.apellido2 || '';
      this.nombrePlan = data.nombreplan || '';
      this.anulado = 0;
      
    } 
  
}


module.exports = {
    Contrato
}