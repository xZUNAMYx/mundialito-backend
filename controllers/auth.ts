const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario_model');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req: any, res: any = response) => {  
    const { email, password } = req.body;
    try {
        let usuario = await Usuario.findOne({ email: email});
        
        if (usuario){
            return res.status(400).json({
                ok: false,
                msg: "Un usuario ya existe con este correo",
            })
        }
        
        usuario = new Usuario( req.body );
        //Encriptar contraseña 
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();
        //Generar JWT
        const token = await generarJWT( usuario.id, usuario.name );
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token: token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }

}

const loginUsuario = async (req: any, res: any = response) => {  
    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email: email});
        
        if (!usuario){
            return res.status(400).json({
                ok: false,
                msg: "Usuario o contraseña incorrecto",
            })
        }

        //Validar los passwords
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if (!validPassword){
            return res.status(400).json({
                ok: false, 
                msg: "Contraseña incorrecta",
            })
        }

        //Generar nuestro JWT
        const token = await generarJWT( usuario.id, usuario.name );

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token: token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }
}

const revalidarUsuario = async (req: any, res: any = response) => { 
    const uid = req.uid;
    const name = req.name;

    //Generar un nuevo JWT y retornarlo en esta peticion
    // const token = generarJWT(uid, name)
    const token = await generarJWT( uid, name );
    
    res.json({
        ok: true,
        token: token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarUsuario,
}