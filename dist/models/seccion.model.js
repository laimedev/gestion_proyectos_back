"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seccion = void 0;
const mongoose_1 = require("mongoose");
const seccionSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    codigoSeccion: {
        type: String
    },
    nombre: {
        type: String,
        required: true
    }
});
seccionSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Seccion = (0, mongoose_1.model)('Seccion', seccionSchema);
