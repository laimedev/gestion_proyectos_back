import { Router, Response, Request, response } from 'express';
import { Proyecto } from '../models/proyectos.model';
import { Reporte } from '../models/reporte.model';
const reporteRouter = Router();

//crear reporte 
reporteRouter.post('/' , (req: any, res: Response ) => {
    const body = req.body;
    Reporte.create(body).then(ReporteDB => {
        res.json ({
            ok:true,
            reporte: ReporteDB
        });
    }).catch( err => {
        res.json(err)
    });
});

//Obetner reporte
reporteRouter.get('/show', async (req: any, res: any) => {
    const desde =  Number(req.query.desde) || 0;
    const [ reporte, total] =  await Promise.all([
                                    Reporte.find()
                                    .sort({_id: -1})          
                                    .skip( desde )
                                    .limit( 5 ),
                                    Reporte.countDocuments()
    ]);
    res.json({
        ok: true,
        reporte,
        total,
        id: req.id 
    });
});


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
reporteRouter.post('/showByProyecto', async (req: any, res: any) => {
    const body = req.body;
    const desde =  Number(req.query.desde) || 0;

    Reporte.find({proyectoID:body.proyectoID} , (err, ReporteDB) => {
        if( err ) throw err;
        if( ReporteDB ) {
            const reporte = ReporteDB;  //TRAE TODOS
            res.json({
                ok: true,
                reporte,
                mensaje: 'Reportes encontrado!!'
            });
        } else {
            res.json({
                ok: false,
                mensaje: 'Reportes no encontrado en nuestro sistema!'
            });
        }
    }) .sort({_id: -1})          
    .skip( desde )
    .limit( 5 ) 
});





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
reporteRouter.delete('/:id', async (req: any, res: any) => {
    const id = req.params.id;
    try {
        const reporte = await Reporte.findById(id);
        if(!reporte) {
            return res.status(404).json({
                ok: true,
                msg: 'Reporte no encontrada por identificador'
            });
        }
        await Proyecto.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Reporte eliminado'
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }

});



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


module.exports =  reporteRouter;