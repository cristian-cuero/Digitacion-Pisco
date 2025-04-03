const { Router } = require("express");
const { loadParentescoPlan } = require("../controller/PlanesController");

const { validarJWT } = require("../middleware/validarJWT");

const router = new Router();


router.get("/:idplan", [validarJWT], loadParentescoPlan );





module.exports = router;
