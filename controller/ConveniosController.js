const { response, request } = require("express");

const { loadConvevionsq } = require("../database/queries/Convenios");


//busca Los Asesores  Activos
const loadConvenios = async (req = request  , res =response )=> {
    const dbKey = req.dbKey; // extraigo solo lo necesario
    try {
        const convenios =  await loadConvevionsq(dbKey)
        return res.status(200).json({
            convenios
        })
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json({
            msg: "se presento un error en la consulta"
        })
    }
   



}


module.exports = {
    loadConvenios
}