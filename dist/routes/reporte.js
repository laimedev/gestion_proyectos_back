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
const reporte_model_1 = require("../models/reporte.model");
const reporteRouter = (0, express_1.Router)();
//crear reporte 
reporteRouter.post('/', (req, res) => {
    const body = req.body;
    reporte_model_1.Reporte.create(body).then(ReporteDB => {
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
    const limit = Number(req.query.limit) || 5;
    const [reporte, total] = yield Promise.all([
        reporte_model_1.Reporte.find()
            .sort({ _id: -1 })
            .skip(desde)
            .limit(limit),
        reporte_model_1.Reporte.countDocuments()
    ]);
    res.json({
        ok: true,
        reporte,
        total,
        id: req.id
    });
}));
reporteRouter.post('/showRangeDate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var query = {
        // username: req.body.username,
        created: {
            $gte: new Date(req.body.fecha_inicio).toISOString(),
            $lte: new Date(req.body.fecha_fin).toISOString()
        },
        leave: { $exists: false }
    };
    reporte_model_1.Reporte.find(query, function (err, data) {
        if (err) {
            return res.status(300).json("Error");
        }
        else {
            return res.status(200).json({ data: data });
        }
    });
}));
// fetchHistorybydate = (req, res) => {
// }
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
// Obetner reportes por PROYECTOS
reporteRouter.post('/showByProyecto', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const desde = Number(req.query.desde) || 0;
    reporte_model_1.Reporte.find({ proyectoID: body.proyectoID }, (err, ReporteDB) => {
        if (err)
            throw err;
        if (ReporteDB) {
            const reporte = ReporteDB; //TRAE TODOS
            res.json({
                ok: true,
                reporte,
                mensaje: 'Reportes encontrado!!'
            });
        }
        else {
            res.json({
                ok: false,
                mensaje: 'Reportes no encontrado en nuestro sistema!'
            });
        }
    }).sort({ _id: -1 })
        .skip(desde)
        .limit(5);
}));
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
//Actualizar reporte cerrar
reporteRouter.post('/update_cerrar/:id', (req, res) => {
    const id = req.params.id;
    const reporte = {
        fecha_desde: req.body.fecha_desde,
        fecha_hasta: req.body.fecha_hasta,
        fecha_fin: req.body.fecha_fin,
        fecha_termino: req.body.fecha_termino,
        ev: req.body.ev,
        pv: req.body.pv,
        sv: req.body.sv,
        ac: req.body.ac,
        cv: req.body.cv,
    };
    reporte_model_1.Reporte.findByIdAndUpdate(id, reporte, { new: true }, (err, reporte) => {
        if (err)
            throw err;
        if (!reporte) {
            return res.json({
                ok: false,
                mensaje: 'Invalid data'
            });
        }
        res.json({
            ok: true,
            reporte
        });
    });
});
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
        yield reporte_model_1.Reporte.findByIdAndDelete(id);
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
