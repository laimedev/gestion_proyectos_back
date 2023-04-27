"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clientes = void 0;
const mongoose_1 = require("mongoose");
var mongoose = require('mongoose'); // 1. require mongoose
var autoIncrement = require('mongoose-auto-increment');
const clientesSchema = new mongoose_1.Schema({
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
        required: [true, 'El codigo de vehiculo es necesario']
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
clientesSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Clientes = (0, mongoose_1.model)('Clientes', clientesSchema);
