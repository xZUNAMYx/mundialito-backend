
// require('dotenv').config();
import 'dotenv/config'
import express from 'express'; //TODO: forma de usar express con typescript 

const cors = require('cors');
// import cors from 'cors';
const { dbConection } = require('./database/config'); 
// import dbConection from './database/config.ts'; 


//Crear el servidor de express
const app = express();


//Base de datos mongo
dbConection();


// CORS
app.use(cors());


//Directorio publico
app.use( express.static('public') );


//Lectura y parseo del body
app.use( express.json() );


//Rutas
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/events', require('./routes/events'));
app.use('/api/questions', require('./routes/questions'));
app.use('/api/players', require('./routes/players'));
app.use('/api/teams', require('./routes/teams'));
// app.use('/api/championships', require('./routes/championships'));
// TODO: CRUD: Eventos


//Escuchar peticiones
app.listen( process.env.PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
})