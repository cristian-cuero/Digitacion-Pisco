const { response, request } = require("express");
const { loadDepartamentosq, loadCiudadesDepartamento } = require("../database/queries/Departamento");


//busca Los Asesores  Activos
const loadDepartamentos = async (req = request  , res =response )=> {
    try {
        const dbKey = req.dbKey; // extraigo solo lo necesario
       
        const departamentos =  await loadDepartamentosq( dbKey)
        return res.status(200).json(
            departamentos
        )
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json({
            msg: "se presento un error en la consulta"
        })
    }
   



}

const loadCiudades = async (req = request  , res =response )=> {
   // extraigo solo lo necesario
    try {
        const dbKey = req.dbKey; 
        
        const ciudades =  await loadCiudadesDepartamento( dbKey,req.query.codDepartamento)
        return res.status(200).json(
            ciudades
        )
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json({
            msg: "se presento un error en la consulta"
        })
    }
   



}


module.exports = {
    loadDepartamentos,
    loadCiudades
}