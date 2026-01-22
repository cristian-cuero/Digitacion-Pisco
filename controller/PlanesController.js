const { response, request } = require("express");
const { loadParentescoPlanesq } = require("../database/queries/Planes");



//busca Los Asesores  Activos
const loadParentescoPlan = async (req = request  , res =response )=> {

    try {
        const dbKey = req.dbKey;
        const convenios =  await loadParentescoPlanesq(dbKey, req.params.idplan)
        return res.status(200).json(
            Object.values(convenios)
        )
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json({
            msg: "se presento un error en la consulta"
        })
    }
   



}


module.exports = {
    loadParentescoPlan
}