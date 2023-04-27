"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehivulo = void 0;
const mongoose_1 = require("mongoose");
var mongoose = require('mongoose'); // 1. require mongoose
var autoIncrement = require('mongoose-auto-increment');
const detallePedidoSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    id_pedido: {
        type: String,
    },
    id_producto: {
        type: String,
    },
    cantidad: {
        type: String,
    },
    estado: {
        type: String,
    },
});
detallePedidoSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Vehivulo = (0, mongoose_1.model)('IdetallePedido', detallePedidoSchema);
