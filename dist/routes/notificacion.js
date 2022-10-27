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
const notificacionRouter = (0, express_1.Router)();
const notificaciones_model_1 = require("../models/notificaciones.model");
// Crear un sipo de solicitud en la seccion NOTICIAS
notificacionRouter.post('/crear', (req, res) => {
    const notificacion = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        portada: req.body.portada,
        url: req.body.url,
        userId: req.body.userId,
        pushId: req.body.pushId,
    };
    notificaciones_model_1.Notificacion.create(notificacion).then(notificacionDB => {
        res.json({
            ok: true,
            notificacion: notificacionDB
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
//Obetner Servicios x2
notificacionRouter.get('/obtener', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    // console.log(desde);
    const [notificacion, total] = yield Promise.all([
        notificaciones_model_1.Notificacion.find()
            .sort({ _id: -1 })
            // .populate('usuario', 'nombre celular email dni avatar')
            .skip(desde)
            .limit(10),
        notificaciones_model_1.Notificacion.countDocuments()
    ]);
    res.json({
        ok: true,
        notificacion,
        total,
        id: req.id
    });
}));
module.exports = notificacionRouter;
