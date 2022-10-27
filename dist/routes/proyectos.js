"use strict";
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
module.exports = proyectoRouter;
