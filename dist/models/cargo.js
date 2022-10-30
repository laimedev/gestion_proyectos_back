"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cargo = void 0;
const mongoose_1 = require("mongoose");
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
const cargoSchema = new mongoose_1.Schema({
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
    departamento: {
        type: String
    },
    estado: {
        type: String,
        default: 'Nuevo'
    }
});
cargoSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
autoIncrement.initialize(mongoose.connection); // 3. initialize autoIncrement 
cargoSchema.plugin(autoIncrement.plugin, 'Cargo');
exports.Cargo = (0, mongoose_1.model)('Cargo', cargoSchema);
