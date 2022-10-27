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
const recuperar_model_1 = require("../models/recuperar.model");
const recuperarRoutes = (0, express_1.Router)();
// Crear recuperacion
recuperarRoutes.post('/', (req, res) => {
    const body = req.body;
    recuperar_model_1.Recuperar.create(body).then((recuperarDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield recuperarDB.populate('usuario').execPopulate();
        res.json({
            ok: true,
            recuperar: recuperarDB
        });
    })).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
//Obetner Servicios x2
recuperarRoutes.get('/obtener', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    // console.log(desde);
    const [recuperar, total] = yield Promise.all([
        recuperar_model_1.Recuperar.find()
            .sort({ _id: -1 })
            // .populate('usuario', 'nombre celular email dni avatar')
            .skip(desde)
            .limit(5),
        recuperar_model_1.Recuperar.countDocuments()
    ]);
    res.json({
        ok: true,
        recuperar,
        total,
        id: req.id
    });
}));
//Borrar Servicio Recojo de cacao
recuperarRoutes.delete('/:id', (req, res) => {
    const id = req.params.id;
    recuperar_model_1.Recuperar.findByIdAndRemove(id, (err, recuperar) => {
        if (err)
            throw err;
        res.json({
            ok: true,
            mensaje: 'Mensaje Eliminado',
            body: recuperar
        });
    });
});
//Actualizar Servicio Asistencia Tecnica
recuperarRoutes.post('/update/:id', (req, res) => {
    const id = req.params.id;
    const recuperar = {
        userId: req.body.userId,
        email: req.body.email,
        dni: req.body.dni,
        mensaje: req.body.mensaje
    };
    recuperar_model_1.Recuperar.findByIdAndUpdate(id, recuperar, { new: true }, (err, recuperar) => {
        if (err)
            throw err;
        if (!recuperar) {
            return res.json({
                ok: false,
                mensaje: 'Invalid data'
            });
        }
        res.json({
            ok: true,
            recuperar
        });
    });
});
exports.default = recuperarRoutes;
