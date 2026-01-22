const { response, request } = require("express");
const {
  loadAllEmpresasq,
  loadAllPlanesEmprea,
} = require("../database/queries/Empresas");

//busca Los Asesores  Activos
const loadAllEmpresas = async (req = request, res = response) => {
  try {
    const dbKey = req.dbKey;
    const empresas = await loadAllEmpresasq(dbKey);
    return res.status(200).json(empresas);
  } catch (error) {
    console.log("error :>> ", error);
    return res.status(500).json({
      msg: "se presento un error en la consulta",
    });
  }
};

//busca Los Asesores  Activos
const loadEmpresasPlan = async (req = request, res = response) => {
  try {
    const dbKey = req.dbKey;
    const { nit, idplan } = req.query;
    if (!nit & !idplan) {
      return res.status(400).json({ error: "Faltan parámetros: nit o plan" });
    }

    const planes = await loadAllPlanesEmprea(dbKey, nit, idplan);
    return res.status(200).json(planes);
  } catch (error) {
    console.log("error :>> ", error);
    return res.status(500).json({
      msg: "se presento un error en la consulta",
    });
  }
};

module.exports = {
  loadAllEmpresas,

  loadEmpresasPlan,
};
