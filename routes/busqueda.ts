import { Router, Response, Request, response } from 'express';
import { check, validationResult } from 'express-validator';

const { validarJWT } = require('../middlewares/validar-jwt');
// import { Sede } from "../models/curso.model";
import { Admin } from '../models/admin.model';
import { Usuario } from "../models/usuario.model";


const busquedaRouter = Router();



//Buscar Todo
busquedaRouter.get('/:busqueda', validarJWT, async (req: any, res: any) => {
    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i');
    const [ admin ] = await Promise.all([
        Admin.find({ nombre: regex }),
        // Sede.find({ nombre: regex }),
    ])
    res.json({
        ok: true,
        admin,
    })
});




//Buscar por coleccion
// busquedaRouter.get('/coleccion/:tabla/:busqueda', validarJWT, async (req: any, res: any) => {
busquedaRouter.get('/coleccion/:tabla/:busqueda',  async (req: any, res: any) => {


    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    // const regex = new RegExp( busqueda, 'i');
    const regex = new RegExp( busqueda);


    let data = [];


    switch (tabla) {
       
        case 'admin':
            data = await Admin.find({ nombre:regex })
                                                        .populate('usuario', 'nombre img');
            
        break;


        case 'usuario':
            data = await Usuario.find({ nombre:regex })
                                                        .populate('usuario', 'nombre dni email celular');
        break;

        case 'dni':
            data = await Usuario.find({ dni:regex })
                                                        .populate('usuario', 'nombre dni email celular');
        break;

        case 'farmerid':
            data = await Usuario.find({ farmerid:regex })
                                                        .populate('usuario', 'nombre dni farmerid email celular');
        break;


        case 'email':
            data = await Usuario.find({ email:regex })
                                                        .populate('usuario', 'nombre dni email celular');
        break;


        case '_id':
            data = await Usuario.find({ _id:regex })
                                                        .populate('usuario', '_id nombre dni email celular');
        break;


      

        default:
            return res.status(400).json({
                ok:false,
                msg: 'La coleccion tiene que ser admin/sede/tecnico/usuario'

            })        
    }
    res.json({
        ok: true,
        resultados: data
    }) 
});



module.exports =  busquedaRouter;