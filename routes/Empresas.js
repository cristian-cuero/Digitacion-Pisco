const { Router } = require("express");

const { loadAllEmpresas, loadEmpresasPlan } = require("../controller/EmpresasController");
const { validarJWT } = require("../middleware/validarJWT");

const router = new Router();

router.get("/", [validarJWT], loadEmpresasPlan );

router.get("/list", [validarJWT], loadAllEmpresas );








module.exports = router;
