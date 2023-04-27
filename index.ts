import Server from "./classes/server";
import userRoutes from './routes/usuario';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import { Router, Response, Request, response } from 'express';
import express from 'express';











const server = new Server();
// const mongoose = require("mongoose");

//configurar cors 
server.app.use(cors({origin:true, credentials:true}));


//body parser
// server.app.use(bodyParser.urlencoded({ extended: true }));
// server.app.use(bodyParser.json());


//FileUpload
server.app.use(fileUpload() );



//Directorio Publico
server.app.use( express.static('public'));
    

server.app.use(express.json({limit: '50mb'}));
server.app.use(express.urlencoded({limit: '50mb'}));




//rutas de mi aplicacion
server.app.use('/user', userRoutes);

// server.app.use('/productor', productorRouterRoutes);



server.app.use('/admin', require('./routes/admin'));













mongoose.set('useFindAndModify', false);






mongoose
              
    .connect('mongodb+srv://developer:developer@cluster0.sqf1s.mongodb.net/curtis_app?retryWrites=true&w=majority', {
        useCreateIndex:true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
    });

    console.log('BD CONECTADAA');











//levantar express
server.start ( () => {
    console.log(`Servidor corriendo en el puerto ${ server.port }`);
});






