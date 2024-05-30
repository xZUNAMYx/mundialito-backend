/*
    Routes Events
    /api/questions
*/
import { Router } from 'express';
import { check } from 'express-validator';
// const { getEventos, crearQuestion, actualizarEvento, borrarEvento } = require('../controllers/events');
const {crearQuestion, getQuestions } = require('../controllers/questions');
// const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', getQuestions );


//Crear evento
router.post(
    '/', 
    [
        check('question', 'La pregunta es obligatoria').not().isEmpty(),
        check('code', 'El code o tip es obligatorio').not().isEmpty(),
        check('answers', 'Las opciones de respuesta son obligatorias').not().isEmpty(),
        check('correctAnswer', 'La respuesta correcta es obligatoria').not().isEmpty(),
        // validarCampos
    ],
    crearQuestion 
);


//Actualizar eventos
// router.put('/:id', actualizarEvento );


//Eliminar eventos
// router.delete('/:id', borrarEvento );

module.exports = router;