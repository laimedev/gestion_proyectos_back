"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Personal = void 0;
const mongoose_1 = require("mongoose");
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
const personalSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String
    },
    fecha_nacimiento: {
        type: String
    },
    sexo: {
        type: String,
    },
    departamento: {
        type: String,
    },
    cargo: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    password_show: {
        type: String,
    },
    avatar: {
        type: String,
    },
    estado: {
        type: String,
    },
});
personalSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
autoIncrement.initialize(mongoose.connection); // 3. initialize autoIncrement 
personalSchema.plugin(autoIncrement.plugin, 'Personal');
exports.Personal = (0, mongoose_1.model)('Personal', personalSchema);
