import { response } from 'express';
const TeamModel = require('../models/Team_model');

const getTeams = async(req: any, res: any = response, ) => {
    const teams = await TeamModel.find() //  .populate('user', 'name');  Para obtener cierta informacion espesifica

    res.json({
        ok: true,
        teams: teams
    })
}

const crearTeam = async(req: any, res: any = response, ) => {
    const team = new TeamModel( req.body );

    try {
        // team.players = req.players;
        const teamGuardado = await team.save();

        res.json({
            ok: true,
            team: teamGuardado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al guardar team'
        })
    }
}

const actualizarTeam = async(req: any, res: any = response, ) => {
    const teamId = req.params.id;
    const uid = req.uid;

    try {
        const team = await TeamModel.findById( teamId );

        if(!team){
            return res.status(404).json({
                ok: false,
                msg: 'El team por este Id no existe'
            })
        }

        // if( team.user.toString() !== uid ){
        //     return res.status(401).json({
        //         ok: false,
        //         msg: 'no tiene permitido editar este team'
        //     })
        // }

        const nuevoTeam = {
            ...req.body,
            // user: uid,
            //TODO: verificar si asi se pasan los datos para actualizar los players
            players: req.body.players
        }

        const teamActualizado = await TeamModel.findByIdAndUpdate( teamId, nuevoTeam, {new: true});
      
        res.json({
            ok: true,
            team: teamActualizado
        })
        console.log({req})
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        }) 
    }
}

module.exports = {
    getTeams,
    crearTeam,
    actualizarTeam
}
