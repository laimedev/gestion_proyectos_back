import { Router, Response, Request, response } from 'express';
import { Zona } from '../models/zonas.model';
const zonaRouter = Router();

//crear Zona 
zonaRouter.post('/' , (req: any, res: Response ) => {
    const body = req.body;
    Zona.create(body).then(ZonaDB => {
        res.json ({
            ok:true,
            zona: ZonaDB
        });
    }).catch( err => {
        res.json(err)
    });
});

//Obetner zona
zonaRouter.get('/show', async (req: any, res: any) => {
    const desde =  Number(req.query.desde) || 0;
    const [ zona, total] =  await Promise.all([
                                    Zona.find()
                                    .sort({_id: -1})          
                                    .skip( desde )
                                    .limit( 5 ),
                                    Zona.countDocuments()
    ]);
    res.json({
        ok: true,
        zona,
        total,
        id: req.id 
    });
});


//Obetner 1 zona por ID
zonaRouter.post('/showByID', async (req: any, res: any) => {
    const body = req.body;
    Zona.find({_id:body._id} , (err, ZonaDB) => {
        if( err ) throw err;
        if( ZonaDB ) {
            const zona = ZonaDB;  //TRAE TODOS
            res.json({
                ok: true,
                zona,
                mensaje: 'Zona encontrado!!'
            });
        } else {
            res.json({
                ok: false,
                mensaje: 'Zona no encontrado en nuestro sistema!'
            });
        }
    }) 
});


//Actualizar zona
zonaRouter.post('/update/:id', (req: any, res: Response) => {
    const id=req.params.id;
    const zona = {
        nombre: req.body.nombre,
        cod_zona: req.body.cod_zona,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
    }
    Zona.findByIdAndUpdate(id, zona, {new: true}, (err, zona) => {
        if(err) throw err;
        if(!zona){
            return res.json({
                ok:false,
                mensaje: 'Invalid data'
            })
        }
        res.json({
            ok: true, 
            zona 
        })
    })
});


//Eliminar zona
zonaRouter.delete('/:id', async (req: any, res: any) => {
    const id = req.params.id;
    try {
        const zona = await Zona.findById(id);
        if(!zona) {
            return res.status(404).json({
                ok: true,
                msg: 'Zona no encontrada por identificador'
            });
        }
        await Zona.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Zona eliminado'
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }

});


//Exportar Excel
zonaRouter.get('/exportar', async (req: any, res: any) => {
    const [ data ] =  await Promise.all([
                                    Zona.find({})
                                    .sort({id: -1})    
    ]);
    res.json({
        ok: true,
        data,
    });
});


module.exports =  zonaRouter;