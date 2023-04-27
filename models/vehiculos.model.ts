import {Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
var mongoose = require('mongoose');  // 1. require mongoose
var autoIncrement = require('mongoose-auto-increment');



const vehiculoSchema = new Schema({
    created: {
        type: Date
    },
    marca: {
        type: String,
    },
    modelo: {
        type: String,
    },
    placa: {
        type: String,
    },
    id_conductor: {
        type: String,
        default: ''
    },
    cod_vehiculo: {
        type: String,
        unique: true,
        required: [ true, 'El codigo de vehiculo es necesario']
    },
    estado: {
        type: String,
        item: null
    },
});

vehiculoSchema.pre<any>('save', function( next ) {
    this.created = new Date();
    next();
});


interface IVehiculo extends Document {
    created: Date,
    marca: string;
    modelo: string;
    placa: string;
    id_conductor: string;
    cod_vehiculo: number;
    estado: string;
}

export const Vehiculo = model<IVehiculo>('Vehiculo', vehiculoSchema);
