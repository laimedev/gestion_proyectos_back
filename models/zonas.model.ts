import {Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
var mongoose = require('mongoose');  // 1. require mongoose
var autoIncrement = require('mongoose-auto-increment');



const zonaSchema = new Schema({
    created: {
        type: Date
    },
    cod_zona: {
        type: String,
    },
    nombre: {
        type: String,
    },
    descripcion: {
        type: String,
    },
    estado: {
        type: String,
    },
});

zonaSchema.pre<any>('save', function( next ) {
    this.created = new Date();
    next();
});


interface IZona extends Document {
    created: Date,
    cod_zona: string;
    nombre: string;
    descripcion: string;
    estado: string;
}

export const Zona = model<IZona>('Zona', zonaSchema);
