"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tarea = void 0;
const mongoose_1 = require("mongoose");
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
const tareaSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    nombre: {
        type: String,
        required: true
    },
    actividad: {
        type: String
    }
});
tareaSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
autoIncrement.initialize(mongoose.connection); // 3. initialize autoIncrement 
tareaSchema.plugin(autoIncrement.plugin, 'Tarea');
exports.Tarea = (0, mongoose_1.model)('Tarea', tareaSchema);
