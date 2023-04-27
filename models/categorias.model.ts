import {Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
var mongoose = require('mongoose');  // 1. require mongoose
var autoIncrement = require('mongoose-auto-increment');



const categoriaSchema = new Schema({
    created: {
        type: Date
    },
    nombre: {
        type: String,
    },
    descripcion: {
        type: String,
    },
    estado: {
        type: String,
        default: '1'
    },
});

categoriaSchema.pre<any>('save', function( next ) {
    this.created = new Date();
    next();
});


interface ICategoria extends Document {
    created: Date,
    nombre: string;
    descripcion: string;
    estado: string;
}

export const Categoria = model<ICategoria>('Categoria', categoriaSchema);
