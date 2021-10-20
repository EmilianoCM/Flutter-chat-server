const express = require('express');
const path = require('path');
require('dotenv').config();

//DB config
//tambien se puede llamar asi => require('./database/config').dbConeccion();
const { dbConeccion } = require('./database/config');
dbConeccion();

// App de Express
const app = express();

//Lectura y parseo del Body
app.use( express.json() );

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');


// Path público
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ) );

//Mis rutas
app.use('/api/login', require ('./routes/auth'));


server.listen( process.env.PORT, ( err ) => {

    if ( err ) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT );

});



// function sumaString(valor1='', valor2 = '') {

//   console.log(valor1+' '+valor2);
//   return valor1 + ' ' + valor2;
  
// }

// sumaString('Sebastian', 'Cohene' )


// function resumenInformacion(props = '') {

//   const arrayCanciones = [
//      wishYouWereHere = {
//       nombre: "wishYouWereHere",
//       banda:"Pink Floyd",
//       lanzamiento:1975
//     },
//      bicicleta = {
//       nombre: "bicicleta",
//       banda:"Serú Giran",
//       lanzamiento: 1980
//     }
//   ]

//   const cantAnios = 2021 - arrayCanciones[1].lanzamiento;

//   if(props === arrayCanciones[1].nombre){
//     console.log(arrayCanciones[1].nombre + ' de ' + arrayCanciones[1].banda + ' fue lanzado hace ' + cantAnios + ' años.');
//     return arrayCanciones[1].nombre + ' de ' + arrayCanciones[1].banda + ' fue lanzado hace ' + cantAnios + ' años.';
//   }if(props === arrayCanciones[0].nombre){
//     console.log(arrayCanciones[0].nombre + ' de ' + arrayCanciones[0].banda + ' fue lanzado hace ' + cantAnios + ' años.'); 
//     return arrayCanciones[0].nombre + ' de ' + arrayCanciones[0].banda + ' fue lanzado hace ' + cantAnios + ' años.';
    
//   }
  

// }

// resumenInformacion('wishYouWereHere');
  

// function obtenerElMasCorto(nombre='', apodo=''){
//   if(nombre.length <apodo.length && apodo.length > nombre.length){
//     console.log('Si funciono')
//   } else{
//     console.log('no funciono')
//   }

// }

// function gananciaTotal4(balancesDeUnPeriodo){
//   let sumatoria = 0;

  // sumatoria = sumatoria + balancesDeUnPeriodo[0].ganancia;
  // sumatoria = sumatoria + balancesDeUnPeriodo[1].ganancia;
  // sumatoria = sumatoria + balancesDeUnPeriodo[3].ganancia;
  // sumatoria = sumatoria + balancesDeUnPeriodo[4].ganancia;
  //Se reduce a esta

//   for (let balance of balancesDeUnPeriodo) {
//     sumatoria = sumatoria + balance.ganancia;
//   }
//   return sumatoria;
  
// }
//  console.log( gananciaTotal4( [ 
// { mes: "julio", ganancia: 50 }, 
//  { mes: "agosto", ganancia: -12 }, 
//  { mes: "septiembre", ganancia: 6000 }, 
//  { mes: "octubre", ganancia: 300 }, 
//  { mes:  "noviembre", ganancia: 200 }, 
//  { mes: "diciembre", ganancia: 0 } ] ) );

// console.log( cantidadDeBalancesPositivos([  
//   { mes: "julio", ganancia: 50 }, 
// { mes: "agosto", ganancia: -12 }, 
// { mes: "septiembre", ganancia: -1000 }, 
// { mes: "octubre", ganancia: -300 }, 
// { mes:  "noviembre", ganancia: -200 }, 
// { mes: "diciembre", ganancia: 0 }]))

// function cantidadDeBalancesPositivos(balancesDeUnPeriodo){
//   let cantidad = 0;
//   for (let balance of balancesDeUnPeriodo) {
//     if(balance.ganancia > 0){
//       cantidad= cantidad + 1}
//   }
//   return cantidad;
// }

// function gananciaPositiva(balancesDeUnPeriodo) {
//   let sumatoria = 0;
//   for (let balance of balancesDeUnPeriodo) {
//     if(balance.ganancia > 0){
//     sumatoria = sumatoria + (balance.ganancia);
//     }
//   }
//     return sumatoria;
//   }

// function promedioGananciasPositivas(balancesDeUnPeriodo) {
//   return gananciaPositiva(balancesDeUnPeriodo) / cantidadDeBalancesPositivos(balancesDeUnPeriodo);
// }

// console.log(promedioGananciasPositivas([ { 
//   mes:"noviembre", ganancia:200 },
//   { mes:"asda", ganancia:2 },
//   { mes:"12", ganancia:-1 },
//   { mes:"novieambre", ganancia:-5 },
//   { mes:"noviembre", ganancia:-6 },]))

// function agregar (listas, elemento){
//   listas = ['emiliano', 'sebastian'];
//   listas.push('otra cosa')
// }

// console.log()

// function ganancias(balancesDeUnPeriodo) {
//   let ganancias = [];
//     for (let balance of balancesDeUnPeriodo) {
//           ganancias.push(ganancias, balance.ganancia)
    
//   }
//   return ganancias;
// }

// console.log(ganancias([
//   { mes:"asda", ganancia:2 },
//   { mes:"asda", ganancia:100 },
//   { mes:"asda", ganancia:-4 },
//   { mes:"asda", ganancia:9 },

// ]))

