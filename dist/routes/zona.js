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
const zonas_model_1 = require("../models/zonas.model");
const zonaRouter = (0, express_1.Router)();
//crear Zona 
zonaRouter.post('/', (req, res) => {
    const body = req.body;
    zonas_model_1.Zona.create(body).then(ZonaDB => {
        res.json({
            ok: true,
            zona: ZonaDB
        });
    }).catch(err => {
        res.json(err);
    });
});
//Obetner zona
zonaRouter.get('/show', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    const [zona, total] = yield Promise.all([
        zonas_model_1.Zona.find()
            .sort({ _id: -1 })
            .skip(desde)
            .limit(5),
        zonas_model_1.Zona.countDocuments()
    ]);
    res.json({
        ok: true,
        zona,
        total,
        id: req.id
    });
}));
//Obetner 1 zona por ID
zonaRouter.post('/showByID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    zonas_model_1.Zona.find({ _id: body._id }, (err, ZonaDB) => {
        if (err)
            throw err;
        if (ZonaDB) {
            const zona = ZonaDB; //TRAE TODOS
            res.json({
                ok: true,
                zona,
                mensaje: 'Zona encontrado!!'
            });
        }
        else {
            res.json({
                ok: false,
                mensaje: 'Zona no encontrado en nuestro sistema!'
            });
        }
    });
}));
//Actualizar zona
zonaRouter.post('/update/:id', (req, res) => {
    const id = req.params.id;
    const zona = {
        nombre: req.body.nombre,
        cod_zona: req.body.cod_zona,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
    };
    zonas_model_1.Zona.findByIdAndUpdate(id, zona, { new: true }, (err, zona) => {
        if (err)
            throw err;
        if (!zona) {
            return res.json({
                ok: false,
                mensaje: 'Invalid data'
            });
        }
        res.json({
            ok: true,
            zona
        });
    });
});
//Eliminar zona
zonaRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const zona = yield zonas_model_1.Zona.findById(id);
        if (!zona) {
            return res.status(404).json({
                ok: true,
                msg: 'Zona no encontrada por identificador'
            });
        }
        yield zonas_model_1.Zona.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Zona eliminado'
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
zonaRouter.get('/exportar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [data] = yield Promise.all([
        zonas_model_1.Zona.find({})
            .sort({ id: -1 })
    ]);
    res.json({
        ok: true,
        data,
    });
}));
module.exports = zonaRouter;
