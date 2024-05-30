/*
    Routes Events
    /api/players
*/
import { Router } from 'express';
import { check } from 'express-validator';
// const { getEventos, crearTeam, actualizarEvento, borrarEvento } = require('../controllers/events');
// const { getEventos, crearTeam, actualizarEvento, borrarEvento } = require('../controllers/events');
const {crearTeam, getTeams, actualizarTeam } = require('../controllers/teams');
// const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', getTeams );


//Crear player
router.post(
    '/', 
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('point', 'Los puntos son obligatorios').not().isEmpty(),
        check('players', 'Los jugadores son obligatorios').not().isEmpty(),
        // validarCampos
    ],
    crearTeam 
);


//Actualizar team
router.put('/:id', actualizarTeam );


//Eliminar eventos
// router.delete('/:id', borrarEvento );

module.exports = router;