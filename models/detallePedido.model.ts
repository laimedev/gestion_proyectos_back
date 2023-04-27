import {Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
var mongoose = require('mongoose');  // 1. require mongoose
var autoIncrement = require('mongoose-auto-increment');

const detallePedidoSchema = new Schema({
    created: {
        type: Date
    },
    id_pedido: {
        type: String,
    },
    id_producto: {
        type: String,
    },
    cantidad: {
        type: String,
    },
    estado: {
        type: String,
    },
});

detallePedidoSchema.pre<any>('save', function( next ) {
    this.created = new Date();
    next();
});


interface IdetallePedido extends Document {
    created: Date,
    id_pedido: string;
    id_producto: string;
    cantidad: string;
    estado: string;
}

export const Vehivulo = model<IdetallePedido>('IdetallePedido', detallePedidoSchema);
