"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categoria = void 0;
const mongoose_1 = require("mongoose");
var mongoose = require('mongoose'); // 1. require mongoose
var autoIncrement = require('mongoose-auto-increment');
const categoriaSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    nombre: {
        type: String,
    },
    descripcion: {
        type: String,
    },
    estado: {
        type: String,
        default: '1'
    },
});
categoriaSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Categoria = (0, mongoose_1.model)('Categoria', categoriaSchema);
