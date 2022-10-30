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
const configuraciones_1 = require("../models/configuraciones");
const configuracionRouter = (0, express_1.Router)();
//crear configracion 
configuracionRouter.post('/', (req, res) => {
    const body = req.body;
    configuraciones_1.Configuracion.create(body).then(ConfiguracionDB => {
        res.json({
            ok: true,
            configuracion: ConfiguracionDB
        });
    }).catch(err => {
        res.json(err);
    });
});
//Obetner configracion
configuracionRouter.get('/show', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    const [configuracion, total] = yield Promise.all([
        configuraciones_1.Configuracion.find()
            .sort({ _id: -1 })
            .skip(desde)
            .limit(5),
        configuraciones_1.Configuracion.countDocuments()
    ]);
    res.json({
        ok: true,
        configuracion,
        total,
        id: req.id
    });
}));
//Obetner 1 Configuracion por ID
configuracionRouter.post('/showByID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    configuraciones_1.Configuracion.find({ _id: body._id }, (err, ConfiguracionDB) => {
        if (err)
            throw err;
        if (ConfiguracionDB) {
            const configuracion = ConfiguracionDB; //TRAE TODOS
            res.json({
                ok: true,
                configuracion,
                mensaje: 'Configuracion encontrado!!'
            });
        }
        else {
            res.json({
                ok: false,
                mensaje: 'Configuracion no encontrado en nuestro sistema!'
            });
        }
    });
}));
//Actualizar configuracion
configuracionRouter.post('/update/:id', (req, res) => {
    const id = req.params.id;
    const configuracion = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        logo: req.body.logo,
    };
    configuraciones_1.Configuracion.findByIdAndUpdate(id, configuracion, { new: true }, (err, configuracion) => {
        if (err)
            throw err;
        if (!configuracion) {
            return res.json({
                ok: false,
                mensaje: 'Invalid data'
            });
        }
        res.json({
            ok: true,
            configuracion
        });
    });
});
//Eliminar configuracion
configuracionRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const configuracion = yield configuraciones_1.Configuracion.findById(id);
        if (!configuracion) {
            return res.status(404).json({
                ok: true,
                msg: 'Configuracion no encontrada por identificador'
            });
        }
        yield configuraciones_1.Configuracion.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Configuracion eliminado'
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}));
module.exports = configuracionRouter;
