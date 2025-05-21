const { request, response } = require("express");
const { allRolesQuery } = require("../database/queries/Roles");



const allRoles = async (req = request, res = response) => {
 
    try {

        const roles = await allRolesQuery()

        return res.status(200).json(
            roles
        )
        
    } catch (error) {
        res.status(500).json({
            msg: "Se Presento Un Erro Al Consultar Los Roles",
            msg2: error.message
        })
    }
}


module.exports = {allRoles}