import { Router, Response, Request, response } from 'express';
import { Configuracion } from '../models/configuraciones';
const configuracionRouter = Router();

//crear configracion 
configuracionRouter.post('/' , (req: any, res: Response ) => {
    const body = req.body;
    Configuracion.create(body).then(ConfiguracionDB => {
        res.json ({
            ok:true,
            configuracion: ConfiguracionDB
        });
    }).catch( err => {
        res.json(err)
    });
});

//Obetner configracion
configuracionRouter.get('/show', async (req: any, res: any) => {
    const desde =  Number(req.query.desde) || 0;
    const [ configuracion, total] =  await Promise.all([
                                    Configuracion.find()
                                    .sort({_id: -1})          
                                    .skip( desde )
                                    .limit( 5 ),
                                    Configuracion.countDocuments()
    ]);
    res.json({
        ok: true,
        configuracion,
        total,
        id: req.id 
    });
});


//Obetner 1 Configuracion por ID
configuracionRouter.post('/showByID', async (req: any, res: any) => {
    const body = req.body;
    Configuracion.find({_id:body._id} , (err, ConfiguracionDB) => {
        if( err ) throw err;
        if( ConfiguracionDB ) {
            const configuracion = ConfiguracionDB;  //TRAE TODOS
            res.json({
                ok: true,
                configuracion,
                mensaje: 'Configuracion encontrado!!'
            });
        } else {
            res.json({
                ok: false,
                mensaje: 'Configuracion no encontrado en nuestro sistema!'
            });
        }
    }) 
});


//Actualizar configuracion
configuracionRouter.post('/update/:id', (req: any, res: Response) => {
    const id=req.params.id;
    const configuracion = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        ruc: req.body.ruc,
        razonSocial: req.body.razonSocial,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        correo: req.body.correo,
        web: req.body.web,
        logo: req.body.logo,
    }
    Configuracion.findByIdAndUpdate(id, configuracion, {new: true}, (err, configuracion) => {
        if(err) throw err;
        if(!configuracion){
            return res.json({
                ok:false,
                mensaje: 'Invalid data'
            })
        }
        res.json({
            ok: true, 
            configuracion 
        })
    })
});


//Eliminar configuracion
configuracionRouter.delete('/:id', async (req: any, res: any) => {
    const id = req.params.id;
    try {
        const configuracion = await Configuracion.findById(id);
        if(!configuracion) {
            return res.status(404).json({
                ok: true,
                msg: 'Configuracion no encontrada por identificador'
            });
        }
        await Configuracion.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Configuracion eliminado'
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }

});


module.exports =  configuracionRouter;