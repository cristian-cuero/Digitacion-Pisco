const { Router } = require("express");
const { loaddirector } = require("../controller/DirectorController");
const { validarJWT } = require("../middleware/validarJWT");

const router = new Router();

router.get("/", [validarJWT], loaddirector );

module.exports = router;
