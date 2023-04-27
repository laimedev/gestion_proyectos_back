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
const giroNegocio_model_1 = require("../models/giroNegocio.model");
const giroNegocioRouter = (0, express_1.Router)();
//crear GiroNegocio 
giroNegocioRouter.post('/', (req, res) => {
    const body = req.body;
    giroNegocio_model_1.GiroNegocio.create(body).then(GiroNegocioDB => {
        res.json({
            ok: true,
            giroNegocio: GiroNegocioDB
        });
    }).catch(err => {
        res.json(err);
    });
});
//Obetner GiroNegocio
giroNegocioRouter.get('/show', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    const [giroNegocio, total] = yield Promise.all([
        giroNegocio_model_1.GiroNegocio.find()
            .sort({ _id: -1 })
            .skip(desde)
            .limit(5),
        giroNegocio_model_1.GiroNegocio.countDocuments()
    ]);
    res.json({
        ok: true,
        giroNegocio,
        total,
        id: req.id
    });
}));
//Obetner 1 GiroNegocio por ID
giroNegocioRouter.post('/showByID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    giroNegocio_model_1.GiroNegocio.find({ _id: body._id }, (err, GiroNegocioDB) => {
        if (err)
            throw err;
        if (GiroNegocioDB) {
            const giroNegocio = GiroNegocioDB; //TRAE TODOS
            res.json({
                ok: true,
                giroNegocio,
                mensaje: 'GiroNegocio encontrado!!'
            });
        }
        else {
            res.json({
                ok: false,
                mensaje: 'GiroNegocio no encontrado en nuestro sistema!'
            });
        }
    });
}));
//Actualizar GiroNegocio
giroNegocioRouter.post('/update/:id', (req, res) => {
    const id = req.params.id;
    const giroNegocio = {
        nombre: req.body.nombre,
        cod_zona: req.body.cod_zona,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
    };
    giroNegocio_model_1.GiroNegocio.findByIdAndUpdate(id, giroNegocio, { new: true }, (err, giroNegocio) => {
        if (err)
            throw err;
        if (!giroNegocio) {
            return res.json({
                ok: false,
                mensaje: 'Invalid data'
            });
        }
        res.json({
            ok: true,
            giroNegocio
        });
    });
});
//Eliminar zona
giroNegocioRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const giroNegocio = yield giroNegocio_model_1.GiroNegocio.findById(id);
        if (!giroNegocio) {
            return res.status(404).json({
                ok: true,
                msg: 'Giro Negocio no encontrada por identificador'
            });
        }
        yield giroNegocio_model_1.GiroNegocio.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Giro Negocio eliminado'
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
giroNegocioRouter.get('/exportar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [data] = yield Promise.all([
        giroNegocio_model_1.GiroNegocio.find({})
            .sort({ id: -1 })
    ]);
    res.json({
        ok: true,
        data,
    });
}));
module.exports = giroNegocioRouter;
