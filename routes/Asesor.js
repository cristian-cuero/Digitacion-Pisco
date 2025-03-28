const { Router } = require("express");
const { loadASesores } = require("../controller/AsesoresController");
const { validarJWT } = require("../middleware/validarJWT");

const router = new Router();

router.get("/", [validarJWT], loadASesores );

module.exports = router;
