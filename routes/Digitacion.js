const { Router } = require('express');
const {query} = require("express-validator");
const { crearDigitacion, crearDigitacionBenefi, eliminarBenefi, searchBenefi, searchBenefiB } = require('../controller/DigitacionCotroller');
const { validarCampos } = require('../middleware/validarcampos');
const { validarJWT } = require('../middleware/validarJWT');
const { validarAfiliacion, validarAfiliacionBenefi, validarBusqueda } = require('../validations/digitacionValidations');

const router = new Router();

//crear Digitacion
router.post('/create' ,[
    validarJWT,
    validarAfiliacion,
     validarCampos
],crearDigitacion
)


//crear Beneficiario
router.post('/createBenefi' ,[
    validarJWT,
    validarAfiliacionBenefi,
     validarCampos
],crearDigitacionBenefi
)

//eliminar Benificiario

router.delete('/deleteBenefi/' , [
    validarJWT,
], eliminarBenefi)



//buscar Digitaciones

router.get('/searchBenefi/' , [
    validarJWT,
    validarBusqueda,
    validarCampos
], searchBenefi)

//buscarBeneficiario
router.get('/searchBenefiB/' , [
    validarJWT,
    query("iddigitacion")
     .isNumeric()
    .withMessage("El iddigitcion debe ser numerico"),
    validarCampos
], searchBenefiB)



module.exports = router;