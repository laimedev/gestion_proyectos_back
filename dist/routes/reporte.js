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
const proyectos_model_1 = require("../models/proyectos.model");
const reporte_model_1 = require("../models/reporte.model");
const reporteRouter = (0, express_1.Router)();
//crear reporte 
reporteRouter.post('/', (req, res) => {
    const body = req.body;
    proyectos_model_1.Proyecto.create(body).then(ReporteDB => {
        res.json({
            ok: true,
            reporte: ReporteDB
        });
    }).catch(err => {
        res.json(err);
    });
});
//Obetner reporte
reporteRouter.get('/show', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    const [reporte, total] = yield Promise.all([
        reporte_model_1.Reporte.find()
            .sort({ _id: -1 })
            .skip(desde)
            .limit(5),
        reporte_model_1.Reporte.countDocuments()
    ]);
    res.json({
        ok: true,
        reporte,
        total,
        id: req.id
    });
}));
//Obetner 1 proyecto por ID
// reporteRouter.post('/showByID', async (req: any, res: any) => {
//     const body = req.body;
//     Proyecto.find({_id:body._id} , (err, ProyectoDB) => {
//         if( err ) throw err;
//         if( ProyectoDB ) {
//             const proyecto = ProyectoDB;  //TRAE TODOS
//             res.json({
//                 ok: true,
//                 proyecto,
//                 mensaje: 'Proyecto encontrado!!'
//             });
//         } else {
//             res.json({
//                 ok: false,
//                 mensaje: 'Proyecto no encontrado en nuestro sistema!'
//             });
//         }
//     }) 
// });
//Obetner proyecto por ESTADOS
// proyectoRouter.post('/showByStatus', async (req: any, res: any) => {
//     const body = req.body;
//     const desde =  Number(req.query.desde) || 0;
//     Proyecto.find({estado:body.estado} , (err, ProyectoDB) => {
//         if( err ) throw err;
//         if( ProyectoDB ) {
//             const proyecto = ProyectoDB;  //TRAE TODOS
//             res.json({
//                 ok: true,
//                 proyecto,
//                 mensaje: 'Proyectos encontrado!!'
//             });
//         } else {
//             res.json({
//                 ok: false,
//                 mensaje: 'Proyectos no encontrado en nuestro sistema!'
//             });
//         }
//     }) .sort({_id: -1})          
//     .skip( desde )
//     .limit( 5 ) 
// });
//Obetner proyecto por PERSONAL
// proyectoRouter.post('/showByPersonal', async (req: any, res: any) => {
//     const body = req.body;
//     const desde =  Number(req.query.desde) || 0;
//     Proyecto.find({responsable:body.responsable} , (err, ProyectoDB) => {
//         if( err ) throw err;
//         if( ProyectoDB ) {
//             const proyecto = ProyectoDB;  //TRAE TODOS
//             res.json({
//                 ok: true,
//                 proyecto,
//                 mensaje: 'Proyectos encontrado!!'
//             });
//         } else {
//             res.json({
//                 ok: false,
//                 mensaje: 'Proyectos no encontrado en nuestro sistema!'
//             });
//         }
//     }) .sort({_id: -1})          
//     .skip( desde )
//     .limit( 5 ) 
// });
//Actualizar reporte
// reporteRouter.post('/update/:id', (req: any, res: Response) => {
//     const id=req.params.id;
//     const reporte = {
//         nombre: req.body.nombre,
//         descripcion: req.body.descripcion,
//         estado: req.body.estado,
//         responsable: req.body.responsable,
//         presupuesto: req.body.presupuesto,
//         fecha_inicio: req.body.fecha_inicio,
//         fecha_fin: req.body.fecha_fin,
//         cliente: req.body.cliente,
//     }
//     Reporte.findByIdAndUpdate(id, reporte, {new: true}, (err, reporte) => {
//         if(err) throw err;
//         if(!reporte){
//             return res.json({
//                 ok:false,
//                 mensaje: 'Invalid data'
//             })
//         }
//         res.json({
//             ok: true, 
//             reporte 
//         })
//     })
// });
//Eliminar Curso
reporteRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const reporte = yield reporte_model_1.Reporte.findById(id);
        if (!reporte) {
            return res.status(404).json({
                ok: true,
                msg: 'Reporte no encontrada por identificador'
            });
        }
        yield proyectos_model_1.Proyecto.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Reporte eliminado'
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
// proyectoRouter.get('/exportar', async (req: any, res: any) => {
//     const [ data ] =  await Promise.all([
//                                     Proyecto.find({})
//                                     .sort({id: -1})    
//     ]);
//     res.json({
//         ok: true,
//         data,
//     });
// });
module.exports = reporteRouter;
