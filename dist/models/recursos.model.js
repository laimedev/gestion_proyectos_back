"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recursos = void 0;
const mongoose_1 = require("mongoose");
const recursosSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    codigoCurso: {
        type: String
    },
    titulo: {
        type: String
    },
    pdf: {
        type: String
    }
});
recursosSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Recursos = (0, mongoose_1.model)('Recursos', recursosSchema);
