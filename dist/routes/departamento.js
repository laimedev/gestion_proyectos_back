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
const departamento_1 = require("../models/departamento");
const departamentoRouter = (0, express_1.Router)();
//crear departamento 
departamentoRouter.post('/', (req, res) => {
    const body = req.body;
    departamento_1.Departamento.create(body).then(DepartamentoDB => {
        res.json({
            ok: true,
            departamento: DepartamentoDB
        });
    }).catch(err => {
        res.json(err);
    });
});
//Obetner departamento
departamentoRouter.get('/show', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    const [departamento, total] = yield Promise.all([
        departamento_1.Departamento.find()
            .sort({ _id: -1 })
            .skip(desde)
            .limit(5),
        departamento_1.Departamento.countDocuments()
    ]);
    res.json({
        ok: true,
        departamento,
        total,
        id: req.id
    });
}));
//Obetner 1 departamento por ID
departamentoRouter.post('/showByID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    departamento_1.Departamento.find({ _id: body._id }, (err, DepartamentoDB) => {
        if (err)
            throw err;
        if (DepartamentoDB) {
            const departamento = DepartamentoDB; //TRAE TODOS
            res.json({
                ok: true,
                departamento,
                mensaje: 'Departamento encontrado!!'
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
//Actualizar departamento
departamentoRouter.post('/update/:id', (req, res) => {
    const id = req.params.id;
    const departamento = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
    };
    departamento_1.Departamento.findByIdAndUpdate(id, departamento, { new: true }, (err, departamento) => {
        if (err)
            throw err;
        if (!departamento) {
            return res.json({
                ok: false,
                mensaje: 'Invalid data'
            });
        }
        res.json({
            ok: true,
            departamento
        });
    });
});
//Eliminar departamento
departamentoRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const departamento = yield departamento_1.Departamento.findById(id);
        if (!departamento) {
            return res.status(404).json({
                ok: true,
                msg: 'Departamento no encontrada por identificador'
            });
        }
        yield departamento_1.Departamento.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Departamento eliminado'
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
departamentoRouter.get('/exportar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [data] = yield Promise.all([
        departamento_1.Departamento.find({})
            .sort({ id: -1 })
    ]);
    res.json({
        ok: true,
        data,
    });
}));
module.exports = departamentoRouter;
