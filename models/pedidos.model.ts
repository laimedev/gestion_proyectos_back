import {Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
var mongoose = require('mongoose');  // 1. require mongoose
var autoIncrement = require('mongoose-auto-increment');



const pedidoSchema = new Schema({
    created: {
        type: Date
    },
    num_guia: {
        type: String,
    },
    precio_total: {
        type: String,
    },
    id_zona: {
        type: String,
    },
    id_cliente: {
        type: String,
    },
    id_conductor: {
        type: String,
    },
    id_vehiculo: {
        type: String,
    },
    estado: {
        type: String,
    },
});

pedidoSchema.pre<any>('save', function( next ) {
    this.created = new Date();
    next();
});


interface IPedidos extends Document {
    created: Date,
    num_guia: string;
    precio_total: string;
    id_zona: string;
    id_cliente: string;
    id_conductor: string;
    id_vehiculo: string;
    estado: string;
}

export const Zona = model<IPedidos>('Pedidos', pedidoSchema);
