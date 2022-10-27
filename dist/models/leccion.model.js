"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Leccion = void 0;
const mongoose_1 = require("mongoose");
const leccionSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    codigoCurso: {
        type: String,
    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    video: {
        type: String
    }
});
leccionSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
//tt
exports.Leccion = (0, mongoose_1.model)('Leccion', leccionSchema);
