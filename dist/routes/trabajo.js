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
const trabajo_model_1 = require("../models/trabajo.model");
const trabajoRouter = (0, express_1.Router)();
//crear trabajo 
trabajoRouter.post('/', (req, res) => {
    const body = req.body;
    trabajo_model_1.Trabajo.create(body).then(TrabajoDB => {
        res.json({
            ok: true,
            trabajo: TrabajoDB
        });
    }).catch(err => {
        res.json(err);
    });
});
//Obetner trabajo
trabajoRouter.get('/show', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    const [trabajo, total] = yield Promise.all([
        trabajo_model_1.Trabajo.find()
            .sort({ _id: -1 })
            .skip(desde)
            .limit(5),
        trabajo_model_1.Trabajo.countDocuments()
    ]);
    res.json({
        ok: true,
        trabajo,
        total,
        id: req.id
    });
}));
//Obetner 1 Trabajo por ID
trabajoRouter.post('/showByID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    trabajo_model_1.Trabajo.find({ _id: body._id }, (err, TrabajoDB) => {
        if (err)
            throw err;
        if (TrabajoDB) {
            const trabajo = TrabajoDB; //TRAE TODOS
            res.json({
                ok: true,
                trabajo,
                mensaje: 'Trabajo encontrado!!'
            });
        }
        else {
            res.json({
                ok: false,
                mensaje: 'Trabajo no encontrado en nuestro sistema!'
            });
        }
    });
}));
//Actualizar trabajo
trabajoRouter.post('/update/:id', (req, res) => {
    const id = req.params.id;
    const trabajo = {
        nombre: req.body.nombre,
        // proyecto: req.body.proyecto,
        descripcion: req.body.descripcion,
        costo: req.body.costo,
        estado: req.body.estado,
    };
    trabajo_model_1.Trabajo.findByIdAndUpdate(id, trabajo, { new: true }, (err, trabajo) => {
        if (err)
            throw err;
        if (!trabajo) {
            return res.json({
                ok: false,
                mensaje: 'Invalid data'
            });
        }
        res.json({
            ok: true,
            trabajo
        });
    });
});
//FILTRAR TRABAJOS POR ID DE PROYECTO
trabajoRouter.post('/showByProyecto', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    trabajo_model_1.Trabajo.find({ proyecto: body.proyecto }, (err, TrabajoDB) => {
        if (err)
            throw err;
        if (TrabajoDB) {
            const trabajo = TrabajoDB; //TRAE TODOS
            res.json({
                ok: true,
                trabajo,
                mensaje: 'Trabajos encontrado!!'
            });
        }
        else {
            res.json({
                ok: false,
                mensaje: 'Trabajos no encontrado en nuestro sistema!'
            });
        }
    }).sort({ _id: -1 });
}));
//Eliminar trabajo
trabajoRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const trabajo = yield trabajo_model_1.Trabajo.findById(id);
        if (!trabajo) {
            return res.status(404).json({
                ok: true,
                msg: 'Trabajo no encontrada por identificador'
            });
        }
        yield trabajo_model_1.Trabajo.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Trabajo eliminado'
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
trabajoRouter.get('/exportar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [data] = yield Promise.all([
        trabajo_model_1.Trabajo.find({})
            .sort({ id: -1 })
    ]);
    res.json({
        ok: true,
        data,
    });
}));
module.exports = trabajoRouter;
