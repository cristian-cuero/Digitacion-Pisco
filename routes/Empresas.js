const { Router } = require("express");

const { loadAllEmpresas, loadEmpresasPlan } = require("../controller/EmpresasController");
const { validarJWT } = require("../middleware/validarJWT");

const router = new Router();


router.get("/:nit", [validarJWT], loadEmpresasPlan );


router.get("/", [validarJWT], loadAllEmpresas );



module.exports = router;
