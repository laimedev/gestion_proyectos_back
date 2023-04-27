"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehiculo = void 0;
const mongoose_1 = require("mongoose");
var mongoose = require('mongoose'); // 1. require mongoose
var autoIncrement = require('mongoose-auto-increment');
const vehiculoSchema = new mongoose_1.Schema({
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
        required: [true, 'El codigo de vehiculo es necesario']
    },
    estado: {
        type: String,
        item: null
    },
});
vehiculoSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Vehiculo = (0, mongoose_1.model)('Vehiculo', vehiculoSchema);
