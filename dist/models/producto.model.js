"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto = void 0;
const mongoose_1 = require("mongoose");
var mongoose = require('mongoose'); // 1. require mongoose
var autoIncrement = require('mongoose-auto-increment');
const productoSchema = new mongoose_1.Schema({
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
productoSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Producto = (0, mongoose_1.model)('Producto', productoSchema);
