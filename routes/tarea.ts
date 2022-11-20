import { Router, Response, Request, response } from 'express';
import { Proyecto } from '../models/proyectos.model';
import { Tarea } from '../models/tarea.model';
import { Trabajo } from '../models/trabajo.model';
const tareaRouter = Router();

//crear trabajo 
tareaRouter.post('/' , (req: any, res: Response ) => {
    const body = req.body;
    Tarea.create(body).then(TareaDB => {
        res.json ({
            ok:true,
            tarea: TareaDB
        });
    }).catch( err => {
        res.json(err)
    });
});

//Obetner trabajo
tareaRouter.get('/show', async (req: any, res: any) => {
    const desde =  Number(req.query.desde) || 0;
    const [ tarea, total] =  await Promise.all([
                                    Tarea.find()
                                    .sort({_id: -1})          
                                    .skip( desde )
                                    .limit( 5 ),
                                    Tarea.countDocuments()
    ]);
    res.json({
        ok: true,
        tarea,
        total,
        id: req.id 
    });
});


tareaRouter.post('/showByID', async (req: any, res: any) => {
    const body = req.body;
    Tarea.find({_id:body._id} , (err, TareaDB) => {
        if( err ) throw err;
        if( TareaDB ) {
            const tarea = TareaDB;  //TRAE TODOS
            res.json({
                ok: true,
                tarea,
                mensaje: 'Tarea encontrado!!'
            });
        } else {
            res.json({
                ok: false,
                mensaje: 'Tarea no encontrado en nuestro sistema!'
            });
        }
    }) 
});



//Obetner 1 Trabajo por ID
tareaRouter.post('/showByIDTarea', async (req: any, res: any) => {
    const body = req.body;
    Tarea.find({actividad:body.actividad} , (err, TareaDB) => {
        if( err ) throw err;
        if( TareaDB ) {
            const tarea = TareaDB;  //TRAE TODOS
            res.json({
                ok: true,
                tarea,
                mensaje: 'Tareas encontrado!!'
            });
        } else {
            res.json({
                ok: false,
                mensaje: 'Tareas no encontrado en nuestro sistema!'
            });
        }
    }) 
});


//Actualizar trabajo
tareaRouter.post('/update/:id', (req: any, res: Response) => {
    const id=req.params.id;
    const trabajo = {
        nombre: req.body.nombre,
        // proyecto: req.body.proyecto,
        descripcion: req.body.descripcion,
        costo: req.body.costo,
        estado: req.body.estado,
    }
    Trabajo.findByIdAndUpdate(id, trabajo, {new: true}, (err, trabajo) => {
        if(err) throw err;
        if(!trabajo){
            return res.json({
                ok:false,
                mensaje: 'Invalid data'
            })
        }
        res.json({
            ok: true, 
            trabajo 
        })
    })
});


//FILTRAR TRABAJOS POR ID DE PROYECTO
tareaRouter.post('/showByProyecto', async (req: any, res: any) => {
    const body = req.body;

    
    Trabajo.find({proyecto:body.proyecto} , (err, TrabajoDB) => {
        if( err ) throw err;
        if( TrabajoDB ) {
            const trabajo = TrabajoDB;  //TRAE TODOS
            res.json({
                ok: true,
                trabajo,
                mensaje: 'Trabajos encontrado!!'
            });
        } else {
            res.json({
                ok: false,
                mensaje: 'Trabajos no encontrado en nuestro sistema!'
            });
        }
    }) .sort({_id: -1})          
});



//Eliminar trabajo
tareaRouter.delete('/:id', async (req: any, res: any) => {
    const id = req.params.id;
    try {
        const tarea = await Tarea.findById(id);
        if(!tarea) {
            return res.status(404).json({
                ok: true,
                msg: 'Tarea no encontrada por identificador'
            });
        }
        await Tarea.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Tarea eliminado'
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }

});



//Exportar Excel
tareaRouter.get('/exportar', async (req: any, res: any) => {
    const [ data ] =  await Promise.all([
                                    Trabajo.find({})
                                    .sort({id: -1})    
    ]);
    res.json({
        ok: true,
        data,
    });
});

module.exports =  tareaRouter;