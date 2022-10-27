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
const { validarJWT } = require('../middlewares/validar-jwt');
// import { Sede } from "../models/curso.model";
const admin_model_1 = require("../models/admin.model");
const usuario_model_1 = require("../models/usuario.model");
const busquedaRouter = (0, express_1.Router)();
//Buscar Todo
busquedaRouter.get('/:busqueda', validarJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const busqueda = req.params.busqueda;
    // const regex = new RegExp( busqueda, 'i');
    // const [ admin, sede ] = await Promise.all([
    //     Admin.find({ nombre: regex }),
    //     // Sede.find({ nombre: regex }),
    // ])
    // res.json({
    //     ok: true,
    //     admin,
    //     sede,
    // })
}));
//Buscar por coleccion
// busquedaRouter.get('/coleccion/:tabla/:busqueda', validarJWT, async (req: any, res: any) => {
busquedaRouter.get('/coleccion/:tabla/:busqueda', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    // const regex = new RegExp( busqueda, 'i');
    const regex = new RegExp(busqueda);
    let data = [];
    switch (tabla) {
        case 'admin':
            data = yield admin_model_1.Admin.find({ nombre: regex })
                .populate('usuario', 'nombre img');
            break;
        case 'usuario':
            data = yield usuario_model_1.Usuario.find({ nombre: regex })
                .populate('usuario', 'nombre dni email celular');
            break;
        case 'dni':
            data = yield usuario_model_1.Usuario.find({ dni: regex })
                .populate('usuario', 'nombre dni email celular');
            break;
        case 'farmerid':
            data = yield usuario_model_1.Usuario.find({ farmerid: regex })
                .populate('usuario', 'nombre dni farmerid email celular');
            break;
        case 'email':
            data = yield usuario_model_1.Usuario.find({ email: regex })
                .populate('usuario', 'nombre dni email celular');
            break;
        case '_id':
            data = yield usuario_model_1.Usuario.find({ _id: regex })
                .populate('usuario', '_id nombre dni email celular');
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La coleccion tiene que ser admin/sede/tecnico/usuario'
            });
    }
    res.json({
        ok: true,
        resultados: data
    });
}));
module.exports = busquedaRouter;
