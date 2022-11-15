import { Router, Response, Request, response } from 'express';
import { Proyecto } from '../models/proyectos.model';
const proyectoRouter = Router();

//crear proyecto 
proyectoRouter.post('/' , (req: any, res: Response ) => {
    const body = req.body;
    Proyecto.create(body).then(ProyectoDB => {
        res.json ({
            ok:true,
            proyecto: ProyectoDB
        });
    }).catch( err => {
        res.json(err)
    });
});

//Obetner proyecto
proyectoRouter.get('/show', async (req: any, res: any) => {
    const desde =  Number(req.query.desde) || 0;
    const limit =  Number(req.query.limit) || 5;
    const [ proyecto, total] =  await Promise.all([
                                    Proyecto.find()
                                    .sort({_id: -1})          
                                    .skip( desde )
                                    .limit( limit ),
                                    Proyecto.countDocuments()
    ]);
    res.json({
        ok: true,
        proyecto,
        total,
        id: req.id 
    });
});


//Obetner 1 proyecto por ID
proyectoRouter.post('/showByID', async (req: any, res: any) => {
    const body = req.body;

    Proyecto.find({_id:body._id} , (err, ProyectoDB) => {
        if( err ) throw err;
        if( ProyectoDB ) {
            const proyecto = ProyectoDB;  //TRAE TODOS
            res.json({
                ok: true,
                proyecto,
                mensaje: 'Proyecto encontrado!!'
            });
        } else {
            res.json({
                ok: false,
                mensaje: 'Proyecto no encontrado en nuestro sistema!'
            });
        }
    }) 
});



//Obetner proyecto por ESTADOS
proyectoRouter.post('/showByStatus', async (req: any, res: any) => {
    const body = req.body;
    const desde =  Number(req.query.desde) || 0;

    Proyecto.find({estado:body.estado} , (err, ProyectoDB) => {
        if( err ) throw err;
        if( ProyectoDB ) {
            const proyecto = ProyectoDB;  //TRAE TODOS
            res.json({
                ok: true,
                proyecto,
                mensaje: 'Proyectos encontrado!!'
            });
        } else {
            res.json({
                ok: false,
                mensaje: 'Proyectos no encontrado en nuestro sistema!'
            });
        }
    }) .sort({_id: -1})          
    .skip( desde )
    .limit( 5 ) 
});





//Obetner proyecto por PERSONAL
proyectoRouter.post('/showByPersonal', async (req: any, res: any) => {
    const body = req.body;
    const desde =  Number(req.query.desde) || 0;

    Proyecto.find({responsable:body.responsable} , (err, ProyectoDB) => {
        if( err ) throw err;
        if( ProyectoDB ) {
            const proyecto = ProyectoDB;  //TRAE TODOS
            res.json({
                ok: true,
                proyecto,
                mensaje: 'Proyectos encontrado!!'
            });
        } else {
            res.json({
                ok: false,
                mensaje: 'Proyectos no encontrado en nuestro sistema!'
            });
        }
    }) .sort({_id: -1})          
    .skip( desde )
    .limit( 5 ) 
});


//Actualizar proyecto
proyectoRouter.post('/update/:id', (req: any, res: Response) => {
    const id=req.params.id;
    const proyecto = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
        responsable: req.body.responsable,
        presupuesto: req.body.presupuesto,
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_fin,
        cliente: req.body.cliente,
        fecha_termino: req.body.fecha_termino,
        ev: req.body.ev,
        pv: req.body.pv,
        sv: req.body.sv,
        ac: req.body.ac,
        cv: req.body.cv,
        cotizacion: req.body.cotizacion,
    }
    Proyecto.findByIdAndUpdate(id, proyecto, {new: true}, (err, proyecto) => {
        if(err) throw err;
        if(!proyecto){
            return res.json({
                ok:false,
                mensaje: 'Invalid data'
            })
        }
        res.json({
            ok: true, 
            proyecto 
        })
    })
});



//Actualizar proyecto cerrar
proyectoRouter.post('/update_cerrar/:id', (req: any, res: Response) => {
    const id=req.params.id;
    const proyecto = {
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_fin,
        fecha_termino: req.body.fecha_termino,
        ev: req.body.ev,
        pv: req.body.pv,
        sv: req.body.sv,
        ac: req.body.ac,
        cv: req.body.cv,
    }
    Proyecto.findByIdAndUpdate(id, proyecto, {new: true}, (err, proyecto) => {
        if(err) throw err;
        if(!proyecto){
            return res.json({
                ok:false,
                mensaje: 'Invalid data'
            })
        }
        res.json({
            ok: true, 
            proyecto 
        })
    })
});



//Obtener rangos Proyecto
proyectoRouter.post('/showRangeDate', async (req: any, res: any) => {
    var query = {
        // username: req.body.username,
        fecha_inicio: {
            $gte: new Date(req.body.fecha_inicio).toISOString(),
            $lte: new Date(req.body.fecha_fin).toISOString()
        },
        leave: { $exists: false }
    }

    Proyecto.find(query, function (err, data) {
        if (err) { return res.status(300).json("Error") }
        else {
            return res.status(200).json({ data: data })
        }
    })
});


//Eliminar Proyecto
proyectoRouter.delete('/:id', async (req: any, res: any) => {
    const id = req.params.id;
    try {
        const proyecto = await Proyecto.findById(id);
        if(!proyecto) {
            return res.status(404).json({
                ok: true,
                msg: 'Proyecto no encontrada por identificador'
            });
        }
        await Proyecto.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Proyecto eliminado'
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }

});



//Exportar Excel
proyectoRouter.get('/exportar', async (req: any, res: any) => {
    const [ data ] =  await Promise.all([
                                    Proyecto.find({})
                                    .sort({id: -1})    
    ]);
    res.json({
        ok: true,
        data,
    });
});


module.exports =  proyectoRouter;