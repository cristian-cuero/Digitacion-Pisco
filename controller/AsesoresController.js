const { response, request } = require("express");
const { loadAsesores } = require("../database/queries/asesores");


//busca Los Asesores  Activos
const loadASesores = async (req = request  , res =response )=> {

    try {
        const asesores =  await loadAsesores()
        return res.status(200).json({
            asesores
        })
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json({
            msg: "se presento un error en la consulta"
        })
    }
   



}


module.exports = {
    loadASesores
}