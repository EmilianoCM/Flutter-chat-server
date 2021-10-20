/* 
    path:api/login
*/
//Al no trabajar con typescript, se usea response de la libreria express para tener algun tipado.
const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsuario, loginUsuario, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.post('/new', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    check('email','no es un Email').isEmail(),
    validarCampos
] , crearUsuario);


router.post('/',[
    check('password','El password es obligatorio').not().isEmpty(),
    check('email','no es un Email').isEmail(),
    validarCampos
] , loginUsuario);

router.get('/renew', validarJWT, renewToken)


module.exports = router;