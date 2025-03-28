const { Router } = require('express');
const { crearDigitacion } = require('../controller/DigitacionCotroller');
const { validarCampos } = require('../middleware/validarcampos');
const { validarJWT } = require('../middleware/validarJWT');
const { validarAfiliacion } = require('../validations/digitacionValidations');

const router = new Router();

router.post('/create' ,[
    validarJWT,
    validarAfiliacion,
     validarCampos
],crearDigitacion
)



module.exports = router;