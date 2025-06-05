const { Router } = require("express");
const { validarJWT } = require("../middleware/validarJWT");
const { validarCampos } = require("../middleware/validarcampos");
const { query } = require("express-validator");
const upload = require("../middleware/uploads");
const { CargarImagen } = require("../controller/digitacionImagenesController");

const router = new Router();




router.post(
  "/create",
  [
    query("iddigitacion")
      .isNumeric()
      .withMessage("El iddigitacion debe ser una cadena Numerica"),
    validarCampos,
    validarJWT
  ],
  upload.single("file"), // nombre del campo que espera el archivo,
  [validarJWT],
  CargarImagen
);

module.exports = router;
