const mongoose = require('mongoose');

const dbConeccion = async() => {
    
    
    try {
       await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            // useCreateIndex:true
        });

        console.log('Db conectado')
    } catch (error) {
        console.log(error);
        throw Error('Error en la base de datos - hable con administrador')
    }
}

module.exports = {
    dbConeccion,
}