const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req: any, res = response, next: any) =>{
    const errores = validationResult( req );

    //manejo de errores
    if (!errores.isEmpty()){
        return res.status(400).json({
            ok: false,
            errores: errores.mapped()
        })
    }

    next();
}

module.exports = {
    validarCampos
}