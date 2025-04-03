const { Router } = require("express");
const { loadConvenios } = require("../controller/ConveniosController");
const { validarJWT } = require("../middleware/validarJWT");

const router = new Router();

router.get("/", [validarJWT], loadConvenios );

module.exports = router;
