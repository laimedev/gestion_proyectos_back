import { Router, Response, Request, response } from 'express';
import { check, validationResult } from 'express-validator';

const { validarJWT } = require('../middlewares/validar-jwt');
// import { Sede } from "../models/curso.model";
import { Admin } from '../models/admin.model';
import { Cargo } from '../models/cargo';
import { Cliente } from '../models/cliente.model';
import { Departamento } from '../models/departamento';
import { Personal } from '../models/personal.model';
import { Proyecto } from '../models/proyectos.model';
import { Trabajo } from '../models/trabajo.model';
import { Usuario } from "../models/usuario.model";


const busquedaRouter = Router();



//Buscar Todo
busquedaRouter.get('/:busqueda', validarJWT, async (req: any, res: any) => {
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
});




//Buscar por coleccion
// busquedaRouter.get('/coleccion/:tabla/:busqueda', validarJWT, async (req: any, res: any) => {
busquedaRouter.get('/coleccion/:tabla/:busqueda',  async (req: any, res: any) => {


    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i');
    // const regex = new RegExp( busqueda);


    let data = [];


    switch (tabla) {
       
        case 'admin':
            data = await Admin.find({ nombre:regex })
                                                        .populate('usuario', 'nombre img');
            
        break;


        case 'proyecto':
            data = await Proyecto.find({ nombre:regex })
                                                        .populate('proyecto', 'nombre dni email celular');
        break;


        case 'cliente':
            data = await Cliente.find({ razonSocial:regex })
                                                        .populate('cliente', 'nombre dni email celular');
        break;

        case 'personal':
            data = await Personal.find({ nombres:regex })
                                                        .populate('personal', 'nombre dni farmerid email celular');
        break;


        case 'trabajo':
            data = await Trabajo.find({ nombre:regex })
                                                        .populate('trabajo', 'nombre dni email celular');
        break;


        case 'departamento':
            data = await Departamento.find({ nombre:regex })
                                                        .populate('departamento', '_id nombre dni email celular');
        break;

        case 'cargo':
            data = await Cargo.find({ nombre:regex })
                                                        .populate('cargo', '_id nombre dni email celular');
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