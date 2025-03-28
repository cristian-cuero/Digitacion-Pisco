//archivo encargado de las validaciones de las rutas
const { validationResult } = require('express-validator');

// next si pasa las validacions
const validarCampos = ( req, res, next ) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    next();
}



module.exports = {
    validarCampos
}
