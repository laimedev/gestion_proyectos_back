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
const cursoRouter = (0, express_1.Router)();
const { generarJWT } = require('../helpers/jwt');
const { validarJWT } = require('../middlewares/validar-jwt');
const curso_model_1 = require("../models/curso.model");
//crear curso 
cursoRouter.post('/', (req, res) => {
    const body = req.body;
    curso_model_1.Curso.create(body).then(CursoDB => {
        res.json({
            ok: true,
            curso: CursoDB
        });
    }).catch(err => {
        res.json(err);
    });
});
//Obetner cursos
cursoRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const curso = yield curso_model_1.Curso.find()
        .populate('admin', 'nombre img');
    res.json({
        ok: true,
        curso
    });
}));
//Obetner curso x2
cursoRouter.get('/obtener', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    const [curso, total] = yield Promise.all([
        curso_model_1.Curso.find()
            .sort({ _id: -1 })
            .skip(desde)
            .limit(5),
        curso_model_1.Curso.countDocuments()
    ]);
    res.json({
        ok: true,
        curso,
        total,
        id: req.id
    });
}));
//Actualizar Curso
cursoRouter.post('/update/:id', (req, res) => {
    const id = req.params.id;
    const curso = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        portada: req.body.portada,
    };
    curso_model_1.Curso.findByIdAndUpdate(id, curso, { new: true }, (err, curso) => {
        if (err)
            throw err;
        if (!curso) {
            return res.json({
                ok: false,
                mensaje: 'Invalid data'
            });
        }
        res.json({
            ok: true,
            curso
        });
    });
});
//Eliminar Curso
cursoRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const curso = yield curso_model_1.Curso.findById(id);
        if (!curso) {
            return res.status(404).json({
                ok: true,
                msg: 'Curso no encontrada por identificador'
            });
        }
        yield curso_model_1.Curso.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Curso eliminado'
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}));
cursoRouter.post('/filtrar_curso', (req, res) => {
    const body = req.body;
    curso_model_1.Curso.find({ codigoCategoria: body.codigoCategoria }, (err, CursoDB) => {
        if (err)
            throw err;
        if (CursoDB) {
            const curso = CursoDB; //TRAE TODOS
            res.json({
                ok: true,
                curso,
                mensaje: 'Lecciones del curso encontrado!!'
            });
        }
        else {
            res.json({
                ok: false,
                mensaje: 'Leccion del curso no encontrado en nuestro sistema!'
            });
        }
    });
});
module.exports = cursoRouter;
