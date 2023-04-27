import {Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
var mongoose = require('mongoose');  // 1. require mongoose
var autoIncrement = require('mongoose-auto-increment');



const usuarioSchema = new Schema({
    cod_conductor: {
        type: String,
    },
    nombre: {
        type: String,
    },
    apellidos: {
        type: String,
    },
    tipo_documento: {
        type: String,
        default: ''
    },
    numero_documento: {
        type: Number,
        unique: true,
        required: [ true, 'El documento de identidad es necesario']
    },
    password: {
        type: String,
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
    fecha_nacimiento: {
        type: String,
        item: null
    },
    id_vehiculo: {
        type: String,
        item: null
    },
    num_licencia: {
        type: String,
        item: null
    },
    estado: {
        type: Number,
        default: 1
    },
    avatar: {
        type: String,
        default: 'av-10.png'
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
    cod_conductor: string;
    nombre: string;
    apellidos: string;
    tipo_documento: string;
    numero_documento: number;
    password: string;
    password_show: string;
    email: string;
    celular: string;
    fecha_nacimiento: string;
    id_vehiculo: string;
    num_licencia: string;
    estado: number;
    avatar: string;
    compararPassword(password: string): boolean;
}


// autoIncrement.initialize(mongoose.connection); // 3. initialize autoIncrement 
// usuarioSchema.plugin(autoIncrement.plugin, 'User'); 
// usuarioSchema.plugin(autoIncrement.plugin, 'Usuario'); 

export const Usuario = model<IUsuario>('User', usuarioSchema);
// export const Usuario = model<IUsuario>('Usuario', usuarioSchema);
