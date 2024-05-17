/* 
    Rutas de usuarios / auth
    login=host + /api/auth    
    register=host + /api/auth/register
    renew=host + /api/auth/renew
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { crearUsuario, loginUsuario, revalidarUsuario } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.post(
    '/register',
    [   //middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de mas de 6v caracteres').isLength({ min: 6 }),
        validarCampos
    ], 
    crearUsuario
);

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El pasword debe ser de mas de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ], 
    loginUsuario
);

router.get('/renew', validarJWT, revalidarUsuario);

module.exports = router;
