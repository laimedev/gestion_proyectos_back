import {Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
var mongoose = require('mongoose');  // 1. require mongoose
var autoIncrement = require('mongoose-auto-increment');



const ubicacionesSchema = new Schema({
    created: {
        type: Date
    },
    id_conductor: {
        type: String,
    },
    id_vehiculo: {
        type: String,
    },
    coordenadas: {
        type: String,
        default: ''
    },
    fecha_hora: {
        type: String,
        unique: true,
    },
});

ubicacionesSchema.pre<any>('save', function( next ) {
    this.created = new Date();
    next();
});


interface IUbicaciones extends Document {
    created: Date,
    id_conductor: string;
    id_vehiculo: string;
    coordenadas: string;
    fecha_hora: string;
}

export const Vehivulo = model<IUbicaciones>('Ubicaciones', ubicacionesSchema);
