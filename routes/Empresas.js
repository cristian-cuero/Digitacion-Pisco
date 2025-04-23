const { Router } = require("express");

const { loadAllEmpresas, loadEmpresasPlan } = require("../controller/EmpresasController");
const { validarJWT } = require("../middleware/validarJWT");

const router = new Router();

router.get("/list", [validarJWT], loadAllEmpresas );

router.get("/:nit", [validarJWT], loadEmpresasPlan );






module.exports = router;
