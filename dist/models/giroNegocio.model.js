"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiroNegocio = void 0;
const mongoose_1 = require("mongoose");
const giroNegocioSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    codigo: {
        type: String,
    },
    nombre: {
        type: String,
    },
    estado: {
        type: String,
        item: null
    },
});
giroNegocioSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.GiroNegocio = (0, mongoose_1.model)('giroNegocio', giroNegocioSchema);
