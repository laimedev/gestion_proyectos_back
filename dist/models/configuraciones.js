"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuracion = void 0;
const mongoose_1 = require("mongoose");
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
const configuracionSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    logo: {
        type: String,
    }
});
configuracionSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
autoIncrement.initialize(mongoose.connection); // 3. initialize autoIncrement 
configuracionSchema.plugin(autoIncrement.plugin, 'Configuracion');
exports.Configuracion = (0, mongoose_1.model)('Configuracion', configuracionSchema);
