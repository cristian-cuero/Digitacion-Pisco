const { Router } = require('express');
const { check } = require('express-validator');
const { auth } = require('../controller/UserController');
const { validarCampos } = require('../middleware/validarcampos');

const router = new Router();

router.post('/login' ,[
    check('username').notEmpty().withMessage('El Nombre De usuario Es Obligatorio'),
     check('password').notEmpty().withMessage('La Contraseña Es Obligatoria'),
     validarCampos
],auth
)



module.exports = router;