const { response, request } = require("express");
const {
  loadAllEmpresasq,
  loadAllPlanesEmprea,
} = require("../database/queries/Empresas");

//busca Los Asesores  Activos
const loadAllEmpresas = async (req = request, res = response) => {
  try {
    const empresas = await loadAllEmpresasq();
    return res.status(200).json({
        empresas,
    });
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

    console.log('req.params :>> ', req.params.nit);
    const planes = await loadAllPlanesEmprea(req.params.nit);
    return res.status(200).json({
        planes,
    });
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
