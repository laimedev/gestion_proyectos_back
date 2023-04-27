"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Zona = void 0;
const mongoose_1 = require("mongoose");
var mongoose = require('mongoose'); // 1. require mongoose
var autoIncrement = require('mongoose-auto-increment');
const pedidoSchema = new mongoose_1.Schema({
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
pedidoSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Zona = (0, mongoose_1.model)('Pedidos', pedidoSchema);
