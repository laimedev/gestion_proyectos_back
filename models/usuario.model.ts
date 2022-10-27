import {Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

var mongoose = require('mongoose');  // 1. require mongoose
var autoIncrement = require('mongoose-auto-increment');



const usuarioSchema = new Schema({


    nombre: {
        type: String,
        // required: [true, 'El nombre es necesario'] 
    },
    foto: {
        type: String,
        default: ''
    },
    dni: {
        type: String,
        unique: true,
        required: [ true, 'El documento de identidad es necesario']
    },
    password: {
        type: String,
        // required: [true, 'La contraseña es necesaria']
    },
    password_show: {
        type: String,
        item: null
    },
    email: {
        type: String,
        required: [true, 'El correo es necesario']
    },
    celular: {
        type: String,
        item: null
    },
    ubicacion: {
        type: String,
        item: null
    },
    departamento: {
        type: String,
        item: null
    },
    provincia: {
        type: String,
        item: null
    },
    region: {
        type: String,
        item: null
    }, 
    avatar: {
        type: String,
        default: 'av-10.png'
    },
    perfil: {
        type: String,
    },
    push: {
        type: String,
    },
    codigoSeccion: {
        type: String,
    },
    pretest: {
        type: Boolean,
        default: false
    },
    lecciones: {
        type: Boolean,
        default: false
    },
    postest: {
        type: Boolean,
        default: false
    },

});



usuarioSchema.method('compararPassword', function( password: string = ''): boolean {
    if( bcrypt .compareSync(password, this.password)){
        return true;
    }else {
        return false;
    }
});




interface IUsuario extends Document {
    nombre: string;
    foto: string;
    avatar: string;
    dni: string;
    password: string;
    password_show: string;
    email: string;
    celular: string;
    ubicacion: string;
    departamento: string;
    provincia: string;
    region: string;
    perfil: String;
    push: string;
    codigoSeccion: string;
    pretest: boolean;
    lecciones: boolean;
    postest: boolean;
    compararPassword(password: string): boolean;
}


// autoIncrement.initialize(mongoose.connection); // 3. initialize autoIncrement 
// usuarioSchema.plugin(autoIncrement.plugin, 'User'); 
// usuarioSchema.plugin(autoIncrement.plugin, 'Usuario'); 


export const Usuario = model<IUsuario>('User', usuarioSchema);
// export const Usuario = model<IUsuario>('Usuario', usuarioSchema);
