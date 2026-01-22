const { Router } = require('express');
const { check } = require('express-validator');
const { auth, allUsuarios, updateUser, selectDb } = require('../controller/UserController');
const { validarCampos } = require('../middleware/validarcampos');
const { validarJWT } = require('../middleware/validarJWT');

const router = new Router();

router.post('/login' ,[
    check('username').notEmpty().withMessage('El Nombre De usuario Es Obligatorio'),
     check('password').notEmpty().withMessage('La Contraseña Es Obligatoria'),
     validarCampos
],auth
)

router.post('/login/bd' , [
    check('username').notEmpty().withMessage('El Nombre De usuario Es Obligatorio'),
    check('db').notEmpty().withMessage('La Base De Datos Es Obligatoria'),
    validarCampos
],selectDb)

router.post('/login' ,[
    check('username').notEmpty().withMessage('El Nombre De usuario Es Obligatorio'),
     check('password').notEmpty().withMessage('La Contraseña Es Obligatoria'),
     validarCampos
],auth
)

router.get('/list', [
    validarJWT
], allUsuarios)

router.put('/update', [
    validarJWT,
    check('username').notEmpty().withMessage('El Nombre De usuario Es Obligatorio'),
    check('idPersona').notEmpty().withMessage('El idpersona  Del usuario Es Obligatorio'),
    check('nombre').notEmpty().withMessage('El nombre  Del usuario Es Obligatorio'),
    check('apellido').notEmpty().withMessage('El apellido  Del usuario Es Obligatorio'),
    check('estado').notEmpty().withMessage('El estado  Del usuario Es Obligatorio'),
    check('idVendedor').notEmpty().withMessage('El idVendedor  Del usuario Es Obligatorio'),
    validarCampos
], updateUser)

module.exports = router;