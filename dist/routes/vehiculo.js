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
const vehiculos_model_1 = require("../models/vehiculos.model");
const vehiculoRouter = (0, express_1.Router)();
//crear Vehiculo 
vehiculoRouter.post('/', (req, res) => {
    const body = req.body;
    vehiculos_model_1.Vehiculo.create(body).then(VehiculoDB => {
        res.json({
            ok: true,
            vehiculo: VehiculoDB
        });
    }).catch(err => {
        res.json(err);
    });
});
//Obetner Vehiculo
vehiculoRouter.get('/show', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    const [vehiculo, total] = yield Promise.all([
        vehiculos_model_1.Vehiculo.find()
            .sort({ _id: -1 })
            .skip(desde)
            .limit(5),
        vehiculos_model_1.Vehiculo.countDocuments()
    ]);
    res.json({
        ok: true,
        vehiculo,
        total,
        id: req.id
    });
}));
//Obetner 1 Vehiculo por ID
vehiculoRouter.post('/showByID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    vehiculos_model_1.Vehiculo.find({ _id: body._id }, (err, VehiculoDB) => {
        if (err)
            throw err;
        if (VehiculoDB) {
            const vehiculo = VehiculoDB; //TRAE TODOS
            res.json({
                ok: true,
                vehiculo,
                mensaje: 'Vehiculo encontrado!!'
            });
        }
        else {
            res.json({
                ok: false,
                mensaje: 'Vehiculo no encontrado en nuestro sistema!'
            });
        }
    });
}));
//Actualizar Vehiculo
vehiculoRouter.post('/update/:id', (req, res) => {
    const id = req.params.id;
    const vehiculo = {
        marca: req.body.marca,
        modelo: req.body.modelo,
        placa: req.body.placa,
        id_conductor: req.body.id_conductor,
        cod_vehiculo: req.body.cod_vehiculo,
        estado: req.body.estado,
    };
    vehiculos_model_1.Vehiculo.findByIdAndUpdate(id, vehiculo, { new: true }, (err, vehiculo) => {
        if (err)
            throw err;
        if (!vehiculo) {
            return res.json({
                ok: false,
                mensaje: 'Invalid data'
            });
        }
        res.json({
            ok: true,
            vehiculo
        });
    });
});
//Eliminar vehiculo
vehiculoRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const vehiculo = yield vehiculos_model_1.Vehiculo.findById(id);
        if (!vehiculo) {
            return res.status(404).json({
                ok: true,
                msg: 'Vehiculo no encontrada por identificador'
            });
        }
        yield vehiculos_model_1.Vehiculo.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Vehiculo eliminado'
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
vehiculoRouter.get('/exportar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [data] = yield Promise.all([
        vehiculos_model_1.Vehiculo.find({})
            .sort({ id: -1 })
    ]);
    res.json({
        ok: true,
        data,
    });
}));
module.exports = vehiculoRouter;
