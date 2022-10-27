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
const categoria_model_1 = require("../models/categoria.model");
const categoriaRouter = (0, express_1.Router)();
//crear categoria 
categoriaRouter.post('/', (req, res) => {
    const body = req.body;
    categoria_model_1.Categoria.create(body).then(CategoriaDB => {
        res.json({
            ok: true,
            categoria: CategoriaDB
        });
    }).catch(err => {
        res.json(err);
    });
});
//Obetner categoria
categoriaRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoria = yield categoria_model_1.Categoria.find()
        .populate('admin', 'nombre img');
    res.json({
        ok: true,
        categoria
    });
}));
//Obetner categoria x2
categoriaRouter.get('/obtener', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    const [categoria, total] = yield Promise.all([
        categoria_model_1.Categoria.find()
            .sort({ _id: -1 })
            .skip(desde)
            .limit(5),
        categoria_model_1.Categoria.countDocuments()
    ]);
    res.json({
        ok: true,
        categoria,
        total,
        id: req.id
    });
}));
//Actualizar categoria
categoriaRouter.post('/update/:id', (req, res) => {
    const id = req.params.id;
    const categoria = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        icono: req.body.icono,
        codigoSeccion: req.body.codigoSeccion
    };
    categoria_model_1.Categoria.findByIdAndUpdate(id, categoria, { new: true }, (err, categoria) => {
        if (err)
            throw err;
        if (!categoria) {
            return res.json({
                ok: false,
                mensaje: 'Invalid data'
            });
        }
        res.json({
            ok: true,
            categoria
        });
    });
});
//Eliminar Curso
categoriaRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const categoria = yield categoria_model_1.Categoria.findById(id);
        if (!categoria) {
            return res.status(404).json({
                ok: true,
                msg: 'Categoria no encontrada por identificador'
            });
        }
        yield categoria_model_1.Categoria.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Categoria eliminado'
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}));
module.exports = categoriaRouter;
