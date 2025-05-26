class Plan {
    constructor(data = {}) {
      this.id = data.id || null;
      this.nombrePlan = data.nombrePlan || '';
      this.valorBase = data.valorBase || 0;
    }
  }


  module.exports = {
    Plan
  }