const { response, request } = require("express");
const { loadDirectores } = require("../database/queries/Directores");


//busca Los Asesores  Activos
const loaddirector = async (req = request  , res =response )=> {

    try {
        const asesores =  await loadDirectores()
        return res.status(200).json(
            asesores
        )
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json({
            msg: "se presento un error en la consulta"
        })
    }
   



}


module.exports = {
    loaddirector
}