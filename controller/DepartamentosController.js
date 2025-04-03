const { response, request } = require("express");
const { loadDepartamentosq } = require("../database/queries/Departamento");


//busca Los Asesores  Activos
const loadDepartamentos = async (req = request  , res =response )=> {

    try {
        const departamentos =  await loadDepartamentosq()
        return res.status(200).json({
            departamentos
        })
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json({
            msg: "se presento un error en la consulta"
        })
    }
   



}


module.exports = {
    loadDepartamentos
}