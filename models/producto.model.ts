import {Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
var mongoose = require('mongoose');  // 1. require mongoose
var autoIncrement = require('mongoose-auto-increment');



const productoSchema = new Schema({
    created: {
        type: Date
    },
    nombre: {
        type: String,
    },
    descripcion: {
        type: String,
    },
    precio: {
        type: String,
    },
    stock: {
        type: String,
    },
    u_medida: {
        type: String,
    },
    estado: {
        type: String,
    },
    id_categoria: {
        type: String,
    },
});

productoSchema.pre<any>('save', function( next ) {
    this.created = new Date();
    next();
});


interface IProducto extends Document {
    created: Date,
    nombre: string;
    descripcion: string;
    precio: string;
    stock: string;
    u_medida: string;
    id_categoria: string;
    estado: string;
}

export const Producto = model<IProducto>('Producto', productoSchema);
