import { response } from 'express';
const PlayerModel = require('../models/Player_model');

const getPlayers = async(req: any, res: any = response, ) => {
    const players = await PlayerModel.find() //  .populate('user', 'name');  Para obtener cierta informacion espesifica

    res.json({
        ok: true,
        players: players
    })
}

const crearPlayer = async(req: any, res: any = response, ) => {
    const player = new PlayerModel( req.body );

    try {
        player.user = req.uid;
        const playerGuardado = await player.save();

        res.json({
            ok: true,
            player: playerGuardado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al guardar player'
        })
    }
}


module.exports = {
    getPlayers,
    crearPlayer,
}
