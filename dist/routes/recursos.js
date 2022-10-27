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
const recursosRouter = (0, express_1.Router)();
const { generarJWT } = require('../helpers/jwt');
const { validarJWT } = require('../middlewares/validar-jwt');
const recursos_model_1 = require("../models/recursos.model");
//crear recursos 
recursosRouter.post('/', (req, res) => {
    const body = req.body;
    recursos_model_1.Recursos.create(body).then(RecursosDB => {
        res.json({
            ok: true,
            recurso: RecursosDB
        });
    }).catch(err => {
        res.json(err);
    });
});
//Obetner recursos
recursosRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recurso = yield recursos_model_1.Recursos.find()
        .populate('admin', 'nombre img');
    res.json({
        ok: true,
        recurso
    });
}));
//Obetner recursos x2
recursosRouter.get('/obtener', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    const [recurso, total] = yield Promise.all([
        recursos_model_1.Recursos.find()
            .sort({ _id: -1 })
            .skip(desde)
            .limit(5),
        recursos_model_1.Recursos.countDocuments()
    ]);
    res.json({
        ok: true,
        recurso,
        total,
        id: req.id
    });
}));
//Actualizar recursos
recursosRouter.post('/update/:id', (req, res) => {
    const id = req.params.id;
    const recurso = {
        codigoCurso: req.body.codigoCurso,
        titulo: req.body.titulo,
        pdf: req.body.pdf,
    };
    recursos_model_1.Recursos.findByIdAndUpdate(id, recurso, { new: true }, (err, recurso) => {
        if (err)
            throw err;
        if (!recurso) {
            return res.json({
                ok: false,
                mensaje: 'Invalid data'
            });
        }
        res.json({
            ok: true,
            recurso
        });
    });
});
//Eliminar recursos
recursosRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const recurso = yield recursos_model_1.Recursos.findById(id);
        if (!recurso) {
            return res.status(404).json({
                ok: true,
                msg: 'recurso no encontrada por identificador'
            });
        }
        yield recursos_model_1.Recursos.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'recurso eliminado'
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}));
module.exports = recursosRouter;
