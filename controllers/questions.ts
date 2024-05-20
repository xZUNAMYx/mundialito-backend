import { response } from 'express';
const EventoModel = require('../models/Evento_model');

const getEventos = async(req: any, res: any = response, ) => {
    const eventos = await EventoModel.find()
                                    .populate('user', 'name'); // Para obtener cierta informacion espesifica

    res.json({
        ok: true,
        eventos: eventos
    })
}

const crearEvento = async(req: any, res: any = response, ) => {
    const evento = new EventoModel( req.body );

    try {
        evento.user = req.uid;
        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const actualizarEvento = async(req: any, res: any = response, ) => {
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await EventoModel.findById( eventoId );

        if(!evento){
            return res.status(404).json({
                ok: false,
                msg: 'El evento por este Id no existe'
            })
        }

        if( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'no tiene permitido editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid,
        }

        const eventoActualizado = await EventoModel.findByIdAndUpdate( eventoId, nuevoEvento, {new: true});
      
        res.json({
            ok: true,
            evento: eventoActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        }) 
    }
}

const borrarEvento = async(req: any, res: any = response, ) => {
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await EventoModel.findById( eventoId );

        if(!evento){
            return res.status(404).json({
                ok: false,
                msg: 'El evento por este Id no existe'
            })
        }

        if( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'no tiene permitido borrar este evento'
            })
        }

        await EventoModel.findByIdAndDelete( eventoId );
      
        res.json({
            ok: true,
            msg: 'Evento eliminado'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
            error: error
        }) 
    }
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    borrarEvento
}
