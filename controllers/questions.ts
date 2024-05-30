import { response } from 'express';
const QuestionModel = require('../models/Question_model');

const getQuestions = async(req: any, res: any = response, ) => {
    const questions = await QuestionModel.find() //  .populate('user', 'name');  Para obtener cierta informacion espesifica

    res.json({
        ok: true,
        questions: questions
    })
}

const crearQuestion = async(req: any, res: any = response, ) => {
    const question = new QuestionModel( req.body );

    try {
        question.user = req.uid;
        const questionGuardada = await question.save();

        res.json({
            ok: true,
            question: questionGuardada
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al guardar pregunta'
        })
    }
}

// const actualizarQuestion = async(req: any, res: any = response, ) => {
//     const questionId = req.params.id;
//     const uid = req.uid;

//     try {
//         const question = await QuestionModel.findById( questionId );

//         if(!question){
//             return res.status(404).json({
//                 ok: false,
//                 msg: 'El question por este Id no existe'
//             })
//         }

//         if( question.user.toString() !== uid ){
//             return res.status(401).json({
//                 ok: false,
//                 msg: 'no tiene permitido editar este question'
//             })
//         }

//         const nuevaQuestion = {
//             ...req.body,
//             user: uid,
//         }

//         const questionActualizada = await QuestionModel.findByIdAndUpdate( questionId, nuevaQuestion, {new: true});
      
//         res.json({
//             ok: true,
//             question: questionActualizada
//         })
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             ok: false,
//             msg: 'Hable con el administrador'
//         }) 
//     }
// }

// const borrarQuestion = async(req: any, res: any = response, ) => {
//     const questionId = req.params.id;
//     const uid = req.uid;

//     try {
//         const question = await QuestionModel.findById( questionId );

//         if(!question){
//             return res.status(404).json({
//                 ok: false,
//                 msg: 'El question por este Id no existe'
//             })
//         }

//         if( question.user.toString() !== uid ){
//             return res.status(401).json({
//                 ok: false,
//                 msg: 'no tiene permitido borrar este question'
//             })
//         }

//         await QuestionModel.findByIdAndDelete( questionId );
      
//         res.json({
//             ok: true,
//             msg: 'Evento eliminado'
//         })

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             ok: false,
//             msg: 'Hable con el administrador',
//             error: error
//         }) 
//     }
// }

module.exports = {
    getQuestions,
    crearQuestion,
    // actualizarQuestion,
    // borrarQuestion
}
