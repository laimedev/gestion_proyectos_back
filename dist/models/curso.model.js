"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Curso = void 0;
const mongoose_1 = require("mongoose");
const cursoSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    codigo: {
        type: String
    },
    codigoCategoria: {
        type: String
    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    portada: {
        type: String
    }
});
cursoSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Curso = (0, mongoose_1.model)('Curso', cursoSchema);
