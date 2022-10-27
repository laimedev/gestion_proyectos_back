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
const seccion_model_1 = require("../models/seccion.model");
const seccionRoutes = (0, express_1.Router)();
//Crear SECCIONES
seccionRoutes.post('/', (req, res) => {
    const body = req.body;
    seccion_model_1.Seccion.create(body).then(seccionDB => {
        res.json({
            ok: true,
            seccion: seccionDB
        });
    }).catch(err => {
        res.json(err);
    });
});
//Obetner SECCIONES
seccionRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const seccion = yield seccion_model_1.Seccion.find()
        .populate('admin', 'nombre img');
    res.json({
        ok: true,
        seccion
    });
}));
//Obetner SECCIONES x2
seccionRoutes.get('/obtener', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    const [seccion, total] = yield Promise.all([
        seccion_model_1.Seccion.find()
            .sort({ _id: -1 })
            .skip(desde)
            .limit(5),
        seccion_model_1.Seccion.countDocuments()
    ]);
    res.json({
        ok: true,
        seccion,
        total,
        id: req.id
    });
}));
//Eliminar SECCIONES
seccionRoutes.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const seccion = yield seccion_model_1.Seccion.findById(id);
        if (!seccion) {
            return res.status(404).json({
                ok: true,
                msg: 'Seccion no encontrada por identificador'
            });
        }
        yield seccion_model_1.Seccion.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Seccion eliminado'
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}));
exports.default = seccionRoutes;
