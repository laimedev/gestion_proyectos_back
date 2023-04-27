"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Zona = void 0;
const mongoose_1 = require("mongoose");
var mongoose = require('mongoose'); // 1. require mongoose
var autoIncrement = require('mongoose-auto-increment');
const zonaSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    cod_zona: {
        type: String,
    },
    nombre: {
        type: String,
    },
    descripcion: {
        type: String,
    },
    estado: {
        type: String,
    },
});
zonaSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Zona = (0, mongoose_1.model)('Zona', zonaSchema);
