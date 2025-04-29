const { Router } = require("express");
const { loadDepartamentos, loadCiudades } = require("../controller/DepartamentosController");

const { validarJWT } = require("../middleware/validarJWT");

const router = new Router();

router.get("/", [validarJWT], loadDepartamentos );

router.get("/cities", [validarJWT], loadCiudades );

module.exports = router;
