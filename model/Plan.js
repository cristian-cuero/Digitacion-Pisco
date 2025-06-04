class Plan {
    constructor(data = {}) {
      this.id = data.idplan || null;
      this.idtipoplan = data.idplan || null;
      this.nombrePlan = data.nombreplan || '';
      this.valorBase = data.valorBase || 0;
    }
  }


  module.exports = {
    Plan
  }