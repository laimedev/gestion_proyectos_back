import Server from "./classes/server";
import userRoutes from './routes/usuario';
import user1Routes from './routes/user';
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

//FileUpload
server.app.use(fileUpload() );
//Directorio Publico
server.app.use( express.static('public'));
server.app.use(express.json({limit: '50mb'}));
server.app.use(express.urlencoded({limit: '50mb'}));
//rutas de mi aplicacion
server.app.use('/user', userRoutes);
server.app.use('/user1', user1Routes);
server.app.use('/admin', require('./routes/admin'));
server.app.use('/proyecto', require('./routes/proyecto'));
server.app.use('/personal', require('./routes/personal'));

mongoose.set('useFindAndModify', false);
mongoose
              
    .connect('mongodb+srv://developer:developer@cluster0.sqf1s.mongodb.net/gestion_app?retryWrites=true&w=majority', {
        useCreateIndex:true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
    });
    console.log('BD CONECTADAA');

//levantar express
server.start ( () => {
    console.log(`Servidor corriendo en el puerto ${ server.port }`);
});






