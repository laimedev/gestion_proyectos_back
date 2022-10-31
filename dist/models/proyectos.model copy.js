"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proyecto = void 0;
const mongoose_1 = require("mongoose");
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
const proyectosSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    responsable: {
        type: Number
    },
    presupuesto: {
        type: String
    },
    fecha_inicio: {
        type: String
    },
    fecha_fin: {
        type: String
    },
    cliente: {
        type: Number
    },
    estado: {
        type: String,
        default: 'Nuevo'
    }
});
proyectosSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
autoIncrement.initialize(mongoose.connection); // 3. initialize autoIncrement 
proyectosSchema.plugin(autoIncrement.plugin, 'Proyectos');
exports.Proyecto = (0, mongoose_1.model)('Proyectos', proyectosSchema);
