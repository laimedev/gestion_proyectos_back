"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reporte = void 0;
const mongoose_1 = require("mongoose");
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
const reportesSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    trabajo: {
        type: String,
        required: true
    },
    fecha_desde: {
        type: String
    },
    fecha_hasta: {
        type: String
    },
    fecha_fin: {
        type: String
    },
    horas: {
        type: Number
    },
    observacion: {
        type: String
    },
    proyectoNombre: {
        type: String,
    },
    proyectoID: {
        type: Number,
    },
    personalNombre: {
        type: String,
    },
    personalID: {
        type: Number,
    },
    ev: {
        type: Number
    },
    tareaNombre: {
        type: String,
    },
    tareaID: {
        type: Number,
    },
    pv: {
        type: Number
    },
    sv: {
        type: Number
    },
    ac: {
        type: Number
    },
    cv: {
        type: Number
    },
    presupuesto: {
        type: Number
    }
});
reportesSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
autoIncrement.initialize(mongoose.connection); // 3. initialize autoIncrement 
reportesSchema.plugin(autoIncrement.plugin, 'Reportes');
exports.Reporte = (0, mongoose_1.model)('Reportes', reportesSchema);
