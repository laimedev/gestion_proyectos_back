"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehivulo = void 0;
const mongoose_1 = require("mongoose");
var mongoose = require('mongoose'); // 1. require mongoose
var autoIncrement = require('mongoose-auto-increment');
const ubicacionesSchema = new mongoose_1.Schema({
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
ubicacionesSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Vehivulo = (0, mongoose_1.model)('Ubicaciones', ubicacionesSchema);
