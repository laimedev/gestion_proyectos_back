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
const { generarJWT } = require('../helpers/jwt');
const { validarJWT } = require('../middlewares/validar-jwt');
const cliente_model_1 = require("../models/cliente.model");
const clienteRouter = (0, express_1.Router)();
//crear cliente 
clienteRouter.post('/', (req, res) => {
    const body = req.body;
    // body.password_show = req.body.password_show,
    // body.password = bcrypt.hashSync(req.body.password_show, 10),
    cliente_model_1.Cliente.create(body).then(ClienteDB => {
        res.json({
            ok: true,
            cliente: ClienteDB
        });
    }).catch(err => {
        res.json(err);
    });
});
//Obetner cliente
clienteRouter.get('/show', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    const [cliente, total] = yield Promise.all([
        cliente_model_1.Cliente.find()
            .sort({ _id: -1 })
            .skip(desde)
            .limit(5),
        cliente_model_1.Cliente.countDocuments()
    ]);
    res.json({
        ok: true,
        cliente,
        total,
        id: req.id
    });
}));
//Obetner 1 Cliente por ID
clienteRouter.post('/showByID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    cliente_model_1.Cliente.find({ _id: body._id }, (err, ClienteDB) => {
        if (err)
            throw err;
        if (ClienteDB) {
            const cliente = ClienteDB; //TRAE TODOS
            res.json({
                ok: true,
                cliente,
                mensaje: 'Cliente encontrado!!'
            });
        }
        else {
            res.json({
                ok: false,
                mensaje: 'Cliente no encontrado en nuestro sistema!'
            });
        }
    });
}));
//Actualizar cliente
clienteRouter.post('/update/:id', (req, res) => {
    const id = req.params.id;
    const cliente = {
        razonSocial: req.body.razonSocial,
        ruc: req.body.ruc,
        condicion: req.body.condicion,
        direccion: req.body.direccion,
        departamento: req.body.departamento,
        provincia: req.body.provincia,
        distrito: req.body.distrito,
        telefono: req.body.telefono,
        foto: req.body.foto,
        correo: req.body.correo,
    };
    cliente_model_1.Cliente.findByIdAndUpdate(id, cliente, { new: true }, (err, cliente) => {
        if (err)
            throw err;
        if (!cliente) {
            return res.json({
                ok: false,
                mensaje: 'Invalid data'
            });
        }
        res.json({
            ok: true,
            cliente
        });
    });
});
//Eliminar Cliente
clienteRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const cliente = yield cliente_model_1.Cliente.findById(id);
        if (!cliente) {
            return res.status(404).json({
                ok: true,
                msg: 'Cliente no encontrada por identificador'
            });
        }
        yield cliente_model_1.Cliente.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Cliente eliminado'
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
clienteRouter.get('/exportar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [data] = yield Promise.all([
        cliente_model_1.Cliente.find({})
            .sort({ id: -1 })
    ]);
    res.json({
        ok: true,
        data,
    });
}));
module.exports = clienteRouter;
