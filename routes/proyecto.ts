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
    const [ proyecto, total] =  await Promise.all([
                                    Proyecto.find()
                                    .sort({_id: -1})          
                                    .skip( desde )
                                    .limit( 5 ),
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


//Actualizar proyecto
proyectoRouter.post('/update/:id', (req: any, res: Response) => {
    const id=req.params.id;
    const proyecto = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
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


//Eliminar Curso
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


module.exports =  proyectoRouter;