const { Router } = require("express");
const { loadDepartamentos } = require("../controller/DepartamentosController");

const { validarJWT } = require("../middleware/validarJWT");

const router = new Router();

router.get("/", [validarJWT], loadDepartamentos );

module.exports = router;
