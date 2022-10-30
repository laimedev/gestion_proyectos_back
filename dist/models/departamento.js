"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Departamento = void 0;
const mongoose_1 = require("mongoose");
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
const departamentoSchema = new mongoose_1.Schema({
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
    estado: {
        type: String,
        default: 0
    }
});
departamentoSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
autoIncrement.initialize(mongoose.connection); // 3. initialize autoIncrement 
departamentoSchema.plugin(autoIncrement.plugin, 'Departamento');
exports.Departamento = (0, mongoose_1.model)('Departamento', departamentoSchema);
