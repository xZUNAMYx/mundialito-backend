/*
    Routes Events
    /api/players
*/
import { Router } from 'express';
import { check } from 'express-validator';
// const { getEventos, crearPlayer, actualizarEvento, borrarEvento } = require('../controllers/events');
const {crearPlayer, getPlayers } = require('../controllers/players');
// const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', getPlayers );


//Crear player
router.post(
    '/', 
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('point', 'Los puntos son obligatorios').not().isEmpty(),
        // validarCampos
    ],
    crearPlayer 
);


//Actualizar eventos
// router.put('/:id', actualizarEvento );


//Eliminar eventos
// router.delete('/:id', borrarEvento );

module.exports = router;