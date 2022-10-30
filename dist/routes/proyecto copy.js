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
const proyectos_model_1 = require("../models/proyectos.model");
const proyectoRouter = (0, express_1.Router)();
//crear proyecto 
proyectoRouter.post('/', (req, res) => {
    const body = req.body;
    proyectos_model_1.Proyecto.create(body).then(ProyectoDB => {
        res.json({
            ok: true,
            proyecto: ProyectoDB
        });
    }).catch(err => {
        res.json(err);
    });
});
//Obetner proyecto
proyectoRouter.get('/show', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    const [proyecto, total] = yield Promise.all([
        proyectos_model_1.Proyecto.find()
            .sort({ _id: -1 })
            .skip(desde)
            .limit(5),
        proyectos_model_1.Proyecto.countDocuments()
    ]);
    res.json({
        ok: true,
        proyecto,
        total,
        id: req.id
    });
}));
//Obetner 1 proyecto por ID
proyectoRouter.post('/showByID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    proyectos_model_1.Proyecto.find({ _id: body._id }, (err, ProyectoDB) => {
        if (err)
            throw err;
        if (ProyectoDB) {
            const proyecto = ProyectoDB; //TRAE TODOS
            res.json({
                ok: true,
                proyecto,
                mensaje: 'Proyecto encontrado!!'
            });
        }
        else {
            res.json({
                ok: false,
                mensaje: 'Proyecto no encontrado en nuestro sistema!'
            });
        }
    });
}));
//Actualizar proyecto
proyectoRouter.post('/update/:id', (req, res) => {
    const id = req.params.id;
    const proyecto = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
    };
    proyectos_model_1.Proyecto.findByIdAndUpdate(id, proyecto, { new: true }, (err, proyecto) => {
        if (err)
            throw err;
        if (!proyecto) {
            return res.json({
                ok: false,
                mensaje: 'Invalid data'
            });
        }
        res.json({
            ok: true,
            proyecto
        });
    });
});
//Eliminar Curso
proyectoRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const proyecto = yield proyectos_model_1.Proyecto.findById(id);
        if (!proyecto) {
            return res.status(404).json({
                ok: true,
                msg: 'Proyecto no encontrada por identificador'
            });
        }
        yield proyectos_model_1.Proyecto.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Proyecto eliminado'
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}));
module.exports = proyectoRouter;
