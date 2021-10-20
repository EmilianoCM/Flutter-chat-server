const { response } = require('express');
const bcrypt = require('bcryptjs')

const Usuario = require('../models/usuario')
const  {generarJWT}  = require('../helpers/jwt');
const usuario = require('../models/usuario');


const crearUsuario = async (req, res = response) => {

    const {email, password, nombre} = req.body; 

    try {

        const existeEmail = await Usuario.findOne({email: email});
        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg: 'Hubo un Error'
            })
        }

          //Filtra toda la informacion del body que no esta definido en el modelo y se graba en la base de datos
        const usuario = new Usuario( req.body );

        //Encriptar Contrasenia
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        //Generar mi JWT
        const token = await generarJWT(usuario.id); 

        res.json({
            ok:true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const loginUsuario = async(req, res = response) =>{
    const {email, password} = req.body; 

    try {
        
        const usuarioDB = await Usuario.findOne({email});
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'error con el email o password'
            });
        }

        //Validar el Password
        const validarPassword = bcrypt.compareSync( password, usuarioDB.password );
        if(!validarPassword){
            return res.status(400).json({
                ok:false,
                msg:'error con el password o el email'
            });
        }

        //Generar el JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok:true,
            usuario: usuarioDB,
            token
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        });
    }

   }

const renewToken = async (req, res = response) =>{
    const  uid  = req.uid;

    
    const token = await generarJWT(uid);
    
    const usuario = await Usuario.findById(uid);
    
    res.json({
        ok:true,
        usuario,
        token
    });

}


module.exports = {
    crearUsuario,
    loginUsuario,
    renewToken
}