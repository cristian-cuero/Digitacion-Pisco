const { Router } = require("express");
const { loadASesores } = require("../controller/AsesoresController");
const { validarJWT } = require("../middleware/validarJWT");
const { validarCampos } = require('../middleware/validarcampos');
const { check } = require("express-validator");
const router = new Router();

router.get("/list",  [
    check('tipoEmpleado')
      .notEmpty().withMessage(' tipo De Empleado es requerido')
      .isIn(['VENDEDOR', 'COBRADOR']).withMessage('codDepartamento debe ser "COBRADOR" o "VENDEDOR"'),
      validarCampos
  ], [validarJWT], loadASesores );

module.exports = router;
