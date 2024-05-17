/*
    Routes Events
    /api/eventss
*/
import { Router } from 'express';
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, borrarEvento } = require('../controllers/events');
import { check } from 'express-validator';
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

const router = Router();

router.use( validarJWT );

//Todas deben pasar por la validacion del JWT
//Obtener eventos
router.get('/', validarJWT, getEventos );


//Crear evento
router.post(
    '/', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatorio').custom( isDate ),
        check('end', 'La fecha de inicio es obligatorio').custom( isDate ),
        validarCampos
    ],
    crearEvento 
);


//Actualizar eventos
router.put('/:id', actualizarEvento );


//Eliminar eventos
router.delete('/:id', borrarEvento );

module.exports = router;