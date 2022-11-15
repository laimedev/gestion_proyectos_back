"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trabajo = void 0;
const mongoose_1 = require("mongoose");
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
const trabajosSchema = new mongoose_1.Schema({
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
    costo: {
        type: Number
    },
    estado: {
        type: String,
        default: 'Nuevo'
    }
});
trabajosSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
autoIncrement.initialize(mongoose.connection); // 3. initialize autoIncrement 
trabajosSchema.plugin(autoIncrement.plugin, 'Trabajos');
exports.Trabajo = (0, mongoose_1.model)('Trabajos', trabajosSchema);
