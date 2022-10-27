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
const leccionRouter = (0, express_1.Router)();
const { generarJWT } = require('../helpers/jwt');
const { validarJWT } = require('../middlewares/validar-jwt');
const leccion_model_1 = require("../models/leccion.model");
//crear leccion 
leccionRouter.post('/', (req, res) => {
    const body = req.body;
    leccion_model_1.Leccion.create(body).then(LeccionDB => {
        res.json({
            ok: true,
            leccion: LeccionDB
        });
    }).catch(err => {
        res.json(err);
    });
});
//Obetner leccion
leccionRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const leccion = yield leccion_model_1.Leccion.find()
        .populate('admin', 'nombre img');
    res.json({
        ok: true,
        leccion
    });
}));
//Obetner Leccion x2
leccionRouter.get('/obtener', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    const [leccion, total] = yield Promise.all([
        leccion_model_1.Leccion.find()
            .sort({ _id: -1 })
            .skip(desde)
            .limit(5),
        leccion_model_1.Leccion.countDocuments()
    ]);
    res.json({
        ok: true,
        leccion,
        total,
        id: req.id
    });
}));
//Actualizar leccion
leccionRouter.post('/update/:id', (req, res) => {
    const id = req.params.id;
    const leccion = {
        nobre: req.body.nobre,
        descripcion: req.body.descripcion,
        video: req.body.video,
    };
    leccion_model_1.Leccion.findByIdAndUpdate(id, leccion, { new: true }, (err, leccion) => {
        if (err)
            throw err;
        if (!leccion) {
            return res.json({
                ok: false,
                mensaje: 'Invalid data'
            });
        }
        res.json({
            ok: true,
            leccion
        });
    });
});
leccionRouter.post('/filtrar_lecciones', (req, res) => {
    const body = req.body;
    leccion_model_1.Leccion.find({ codigoCurso: body.codigoCurso }, (err, LeccionDB) => {
        if (err)
            throw err;
        if (LeccionDB) {
            const leccion = LeccionDB; //TRAE TODOS
            res.json({
                ok: true,
                leccion,
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
//Eliminar Curso
leccionRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const leccion = yield leccion_model_1.Leccion.findById(id);
        if (!leccion) {
            return res.status(404).json({
                ok: true,
                msg: 'leccion no encontrada por identificador'
            });
        }
        yield leccion_model_1.Leccion.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'leccion eliminado'
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}));
module.exports = leccionRouter;
