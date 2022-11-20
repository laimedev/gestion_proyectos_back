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
const tarea_model_1 = require("../models/tarea.model");
const trabajo_model_1 = require("../models/trabajo.model");
const tareaRouter = (0, express_1.Router)();
//crear trabajo 
tareaRouter.post('/', (req, res) => {
    const body = req.body;
    tarea_model_1.Tarea.create(body).then(TareaDB => {
        res.json({
            ok: true,
            tarea: TareaDB
        });
    }).catch(err => {
        res.json(err);
    });
});
//Obetner trabajo
tareaRouter.get('/show', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    const [tarea, total] = yield Promise.all([
        tarea_model_1.Tarea.find()
            .sort({ _id: -1 })
            .skip(desde)
            .limit(5),
        tarea_model_1.Tarea.countDocuments()
    ]);
    res.json({
        ok: true,
        tarea,
        total,
        id: req.id
    });
}));
tareaRouter.post('/showByID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    tarea_model_1.Tarea.find({ _id: body._id }, (err, TareaDB) => {
        if (err)
            throw err;
        if (TareaDB) {
            const tarea = TareaDB; //TRAE TODOS
            res.json({
                ok: true,
                tarea,
                mensaje: 'Tarea encontrado!!'
            });
        }
        else {
            res.json({
                ok: false,
                mensaje: 'Tarea no encontrado en nuestro sistema!'
            });
        }
    });
}));
//Obetner 1 Trabajo por ID
tareaRouter.post('/showByIDTarea', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    tarea_model_1.Tarea.find({ actividad: body.actividad }, (err, TareaDB) => {
        if (err)
            throw err;
        if (TareaDB) {
            const tarea = TareaDB; //TRAE TODOS
            res.json({
                ok: true,
                tarea,
                mensaje: 'Tareas encontrado!!'
            });
        }
        else {
            res.json({
                ok: false,
                mensaje: 'Tareas no encontrado en nuestro sistema!'
            });
        }
    });
}));
//Actualizar trabajo
tareaRouter.post('/update/:id', (req, res) => {
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
tareaRouter.post('/showByProyecto', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
tareaRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const tarea = yield tarea_model_1.Tarea.findById(id);
        if (!tarea) {
            return res.status(404).json({
                ok: true,
                msg: 'Tarea no encontrada por identificador'
            });
        }
        yield tarea_model_1.Tarea.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Tarea eliminado'
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
tareaRouter.get('/exportar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [data] = yield Promise.all([
        trabajo_model_1.Trabajo.find({})
            .sort({ id: -1 })
    ]);
    res.json({
        ok: true,
        data,
    });
}));
module.exports = tareaRouter;
