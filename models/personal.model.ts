import { Schema, Document, model} from 'mongoose';
var mongoose = require('mongoose'); 
var autoIncrement = require('mongoose-auto-increment');


const personalSchema = new Schema({
    created: {
        type: Date
    },
    nombres: {
         type: String,
         required: true
    },
    apellidos: {
        type: String
    },
    fecha_nacimiento: {
        type: String
    },
    sexo: {
        type: String,
    },
    departamento: {
        type: Number,
    },
    cargo: {
        type: Number,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    password_show: {
        type: String,
    },
    avatar: {
        type: String,
    },
    estado: {
        type: String,
        default: 'Activo'
    },
    role: {
        type: String,
        required: true,
        default: '1'
    }
});




personalSchema.pre<IPersonal>('save', function( next ) {
    this.created = new Date();
    next();
});


interface IPersonal extends Document {
    created: Date,
    nombres: string;
    apellidos: string;
    fecha_nacimiento: string;
    sexo: string;
    departamento: number;
    cargo: number;
    email: string;
    password: string;
    password_show: string;
    avatar: string;
    estado: string;
    role: string

}


autoIncrement.initialize(mongoose.connection); // 3. initialize autoIncrement 
personalSchema.plugin(autoIncrement.plugin, 'Personal'); 


export const Personal = model<IPersonal>('Personal', personalSchema);