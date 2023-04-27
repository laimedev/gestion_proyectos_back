import {Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
var mongoose = require('mongoose');  // 1. require mongoose
var autoIncrement = require('mongoose-auto-increment');



const clientesSchema = new Schema({
    created: {
        type: Date
    },
    cod_cliente: {
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
    num_documento: {
        type: String,
        unique: true,
        required: [ true, 'El codigo de vehiculo es necesario']
    },
    telefono: {
        type: String,
        item: null
    },
    id_zona: {
        type: String,
    },
    direccion: {
        type: String,
    },
    coordenadas: {
        type: String,
    },
    id_giro_negocio: {
        type: String,
    },
    estado: {
        type: String,
        default: '1'
    },
});

clientesSchema.pre<any>('save', function( next ) {
    this.created = new Date();
    next();
});


interface IClientes extends Document {
    created: Date,
    cod_cliente: string;
    nombre: string;
    apellidos: string;
    tipo_documento: string;
    num_documento: number;
    telefono: string;
    id_zona: string;
    direccion: string;
    coordenadas: string;
    id_giro_negocio: string;
    estado: string;
}

export const Clientes = model<IClientes>('Clientes', clientesSchema);
