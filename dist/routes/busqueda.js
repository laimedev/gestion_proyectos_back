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
const cargo_1 = require("../models/cargo");
const cliente_model_1 = require("../models/cliente.model");
const departamento_1 = require("../models/departamento");
const personal_model_1 = require("../models/personal.model");
const proyectos_model_1 = require("../models/proyectos.model");
const trabajo_model_1 = require("../models/trabajo.model");
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
    const regex = new RegExp(busqueda, 'i');
    // const regex = new RegExp( busqueda);
    let data = [];
    switch (tabla) {
        case 'admin':
            data = yield admin_model_1.Admin.find({ nombre: regex })
                .populate('usuario', 'nombre img');
            break;
        case 'proyecto':
            data = yield proyectos_model_1.Proyecto.find({ nombre: regex })
                .populate('proyecto', 'nombre dni email celular');
            break;
        case 'cliente':
            data = yield cliente_model_1.Cliente.find({ razonSocial: regex })
                .populate('cliente', 'nombre dni email celular');
            break;
        case 'personal':
            data = yield personal_model_1.Personal.find({ nombres: regex })
                .populate('personal', 'nombre dni farmerid email celular');
            break;
        case 'trabajo':
            data = yield trabajo_model_1.Trabajo.find({ nombre: regex })
                .populate('trabajo', 'nombre dni email celular');
            break;
        case 'departamento':
            data = yield departamento_1.Departamento.find({ nombre: regex })
                .populate('departamento', '_id nombre dni email celular');
            break;
        case 'cargo':
            data = yield cargo_1.Cargo.find({ nombre: regex })
                .populate('cargo', '_id nombre dni email celular');
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
