"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
const mongoose_1 = require("mongoose");
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
const clienteSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    razonSocial: {
        type: String,
        required: true
    },
    ruc: {
        type: String
    },
    condicion: {
        type: String
    },
    direccion: {
        type: String,
    },
    departamento: {
        type: String,
    },
    provincia: {
        type: String,
    },
    distrito: {
        type: String,
    },
    telefono: {
        type: String,
    },
    foto: {
        type: String,
    },
    correo: {
        type: String,
    }
});
clienteSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
autoIncrement.initialize(mongoose.connection); // 3. initialize autoIncrement 
clienteSchema.plugin(autoIncrement.plugin, 'Cliente');
exports.Cliente = (0, mongoose_1.model)('Cliente', clienteSchema);
