"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const producto_model_1 = require("../models/producto.model");
const productoRouter = (0, express_1.Router)();
//crear Producto 
productoRouter.post('/', (req, res) => {
    const body = req.body;
    producto_model_1.Producto.create(body).then(ProductoDB => {
        res.json({
            ok: true,
            producto: ProductoDB
        });
    }).catch(err => {
        res.json(err);
    });
});
//Obetner Producto
productoRouter.get('/show', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    const [producto, total] = yield Promise.all([
        producto_model_1.Producto.find()
            .sort({ _id: -1 })
            .skip(desde)
            .limit(5),
        producto_model_1.Producto.countDocuments()
    ]);
    res.json({
        ok: true,
        producto,
        total,
        id: req.id
    });
}));
//Obetner 1 Producto por ID
productoRouter.post('/showByID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    producto_model_1.Producto.find({ _id: body._id }, (err, ProductoDB) => {
        if (err)
            throw err;
        if (ProductoDB) {
            const producto = ProductoDB; //TRAE TODOS
            res.json({
                ok: true,
                producto,
                mensaje: 'Producto encontrado!!'
            });
        }
        else {
            res.json({
                ok: false,
                mensaje: 'Producto no encontrado en nuestro sistema!'
            });
        }
    });
}));
//Actualizar Producto
productoRouter.post('/update/:id', (req, res) => {
    const id = req.params.id;
    const producto = {
        id_categoria: req.body.id_categoria,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        stock: req.body.stock,
        u_medida: req.body.u_medida,
        estado: req.body.estado,
    };
    producto_model_1.Producto.findByIdAndUpdate(id, producto, { new: true }, (err, producto) => {
        if (err)
            throw err;
        if (!producto) {
            return res.json({
                ok: false,
                mensaje: 'Invalid data'
            });
        }
        res.json({
            ok: true,
            producto
        });
    });
});
//Eliminar Producto
productoRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const producto = yield producto_model_1.Producto.findById(id);
        if (!producto) {
            return res.status(404).json({
                ok: true,
                msg: 'Producto no encontrada por identificador'
            });
        }
        yield producto_model_1.Producto.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Producto eliminado'
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}));
//Exportar Excel
productoRouter.get('/exportar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [data] = yield Promise.all([
        producto_model_1.Producto.find({})
            .sort({ id: -1 })
    ]);
    res.json({
        ok: true,
        data,
    });
}));
module.exports = productoRouter;
