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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const personal_model_1 = require("../models/personal.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_validator_1 = require("express-validator");
const { generarJWT } = require('../helpers/jwt');
const { validarJWT } = require('../middlewares/validar-jwt');
const menu_frontend_1 = require("../helpers/menu-frontend");
const personalRouter = (0, express_1.Router)();
//crear personal 
personalRouter.post('/', (req, res) => {
    const body = req.body;
    body.password_show = req.body.password_show,
        body.password = bcrypt_1.default.hashSync(req.body.password_show, 10),
        personal_model_1.Personal.create(body).then(PersonalDB => {
            res.json({
                ok: true,
                personal: PersonalDB
            });
        }).catch(err => {
            res.json(err);
        });
});
//Iniciar Sesion Personal
personalRouter.post('/login', [
    (0, express_validator_1.check)('email', 'El email es obligatorio').isEmail(),
    (0, express_validator_1.check)('password', 'El password es obligatorio').not().isEmpty()
], (req, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        //Verificar email
        const personalDB = yield personal_model_1.Personal.findOne({ email });
        if (!personalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no valida'
            });
        }
        //Verificar contraseña
        const validPassword = bcrypt_1.default.compareSync(password, personalDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            });
        }
        //Generar el Token -JWT
        const token = yield generarJWT(personalDB.id);
        res.json({
            ok: true,
            // msg: 'Hola Laime esto es LOGIN'
            token,
            user: personalDB.nombres,
            menu: (0, menu_frontend_1.getMenuFrontEnd)(personalDB.role)
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
}));
//Obetner personal
personalRouter.get('/show', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    const [personal, total] = yield Promise.all([
        personal_model_1.Personal.find()
            .sort({ _id: -1 })
            .skip(desde)
            .limit(5),
        personal_model_1.Personal.countDocuments()
    ]);
    res.json({
        ok: true,
        personal,
        total,
        id: req.id
    });
}));
//Obetner 1 personal por ID
personalRouter.post('/showByID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    personal_model_1.Personal.find({ _id: body._id }, (err, PersonalDB) => {
        if (err)
            throw err;
        if (PersonalDB) {
            const personal = PersonalDB; //TRAE TODOS
            res.json({
                ok: true,
                personal,
                mensaje: 'Personal encontrado!!'
            });
        }
        else {
            res.json({
                ok: false,
                mensaje: 'Personal no encontrado en nuestro sistema!'
            });
        }
    });
}));
//Actualizar personal
personalRouter.post('/update/:id', (req, res) => {
    const id = req.params.id;
    const personal = {
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        departamento: req.body.departamento,
        cargo: req.body.cargo,
        email: req.body.email,
        avatar: req.body.avatar,
        estado: req.body.estado,
    };
    personal_model_1.Personal.findByIdAndUpdate(id, personal, { new: true }, (err, personal) => {
        if (err)
            throw err;
        if (!personal) {
            return res.json({
                ok: false,
                mensaje: 'Invalid data'
            });
        }
        res.json({
            ok: true,
            personal
        });
    });
});
//Eliminar personal
personalRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const personal = yield personal_model_1.Personal.findById(id);
        if (!personal) {
            return res.status(404).json({
                ok: true,
                msg: 'Personal no encontrada por identificador'
            });
        }
        yield personal_model_1.Personal.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Personal eliminado'
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}));
module.exports = personalRouter;
