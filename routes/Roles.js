const { Router } = require('express');
const { allRoles } = require('../controller/Roles');
const { validarJWT } = require('../middleware/validarJWT');

const router = new Router();


router.get('/list', [
    validarJWT
], allRoles)


module.exports = router