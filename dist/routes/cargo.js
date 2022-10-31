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
const cargo_1 = require("../models/cargo");
const cargoRouter = (0, express_1.Router)();
//crear cargo 
cargoRouter.post('/', (req, res) => {
    const body = req.body;
    cargo_1.Cargo.create(body).then(CargoDB => {
        res.json({
            ok: true,
            cargo: CargoDB
        });
    }).catch(err => {
        res.json(err);
    });
});
//Obetner cargo
cargoRouter.get('/show', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    const [cargo, total] = yield Promise.all([
        cargo_1.Cargo.find()
            .sort({ _id: -1 })
            .skip(desde)
            .limit(5),
        cargo_1.Cargo.countDocuments()
    ]);
    res.json({
        ok: true,
        cargo,
        total,
        id: req.id
    });
}));
//Obetner 1 Cargo por ID
cargoRouter.post('/showByID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    cargo_1.Cargo.find({ _id: body._id }, (err, CargoDB) => {
        if (err)
            throw err;
        if (CargoDB) {
            const cargo = CargoDB; //TRAE TODOS
            res.json({
                ok: true,
                cargo,
                mensaje: 'Cargo encontrado!!'
            });
        }
        else {
            res.json({
                ok: false,
                mensaje: 'Cargo no encontrado en nuestro sistema!'
            });
        }
    });
}));
//Actualizar cargo
cargoRouter.post('/update/:id', (req, res) => {
    const id = req.params.id;
    const cargo = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
    };
    cargo_1.Cargo.findByIdAndUpdate(id, cargo, { new: true }, (err, cargo) => {
        if (err)
            throw err;
        if (!cargo) {
            return res.json({
                ok: false,
                mensaje: 'Invalid data'
            });
        }
        res.json({
            ok: true,
            cargo
        });
    });
});
//Eliminar cargo
cargoRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const cargo = yield cargo_1.Cargo.findById(id);
        if (!cargo) {
            return res.status(404).json({
                ok: true,
                msg: 'Cargo no encontrada por identificador'
            });
        }
        yield cargo_1.Cargo.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Cargo eliminado'
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
cargoRouter.get('/exportar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [data] = yield Promise.all([
        cargo_1.Cargo.find({})
            .sort({ id: -1 })
    ]);
    res.json({
        ok: true,
        data,
    });
}));
module.exports = cargoRouter;
