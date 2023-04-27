import { Router, Response, Request, response } from 'express';
import { GiroNegocio } from '../models/giroNegocio.model';
const giroNegocioRouter = Router();

//crear GiroNegocio 
giroNegocioRouter.post('/' , (req: any, res: Response ) => {
    const body = req.body;
    GiroNegocio.create(body).then(GiroNegocioDB => {
        res.json ({
            ok:true,
            giroNegocio: GiroNegocioDB
        });
    }).catch( err => {
        res.json(err)
    });
});

//Obetner GiroNegocio
giroNegocioRouter.get('/show', async (req: any, res: any) => {
    const desde =  Number(req.query.desde) || 0;
    const [ giroNegocio, total] =  await Promise.all([
                                    GiroNegocio.find()
                                    .sort({_id: -1})          
                                    .skip( desde )
                                    .limit( 5 ),
                                    GiroNegocio.countDocuments()
    ]);
    res.json({
        ok: true,
        giroNegocio,
        total,
        id: req.id 
    });
});


//Obetner 1 GiroNegocio por ID
giroNegocioRouter.post('/showByID', async (req: any, res: any) => {
    const body = req.body;
    GiroNegocio.find({_id:body._id} , (err, GiroNegocioDB) => {
        if( err ) throw err;
        if( GiroNegocioDB ) {
            const giroNegocio = GiroNegocioDB;  //TRAE TODOS
            res.json({
                ok: true,
                giroNegocio,
                mensaje: 'GiroNegocio encontrado!!'
            });
        } else {
            res.json({
                ok: false,
                mensaje: 'GiroNegocio no encontrado en nuestro sistema!'
            });
        }
    }) 
});


//Actualizar GiroNegocio
giroNegocioRouter.post('/update/:id', (req: any, res: Response) => {
    const id=req.params.id;
    const giroNegocio = {
        nombre: req.body.nombre,
        cod_zona: req.body.cod_zona,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
    }
    GiroNegocio.findByIdAndUpdate(id, giroNegocio, {new: true}, (err, giroNegocio) => {
        if(err) throw err;
        if(!giroNegocio){
            return res.json({
                ok:false,
                mensaje: 'Invalid data'
            })
        }
        res.json({
            ok: true, 
            giroNegocio 
        })
    })
});


//Eliminar zona
giroNegocioRouter.delete('/:id', async (req: any, res: any) => {
    const id = req.params.id;
    try {
        const giroNegocio = await GiroNegocio.findById(id);
        if(!giroNegocio) {
            return res.status(404).json({
                ok: true,
                msg: 'Giro Negocio no encontrada por identificador'
            });
        }
        await GiroNegocio.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Giro Negocio eliminado'
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }

});


//Exportar Excel
giroNegocioRouter.get('/exportar', async (req: any, res: any) => {
    const [ data ] =  await Promise.all([
                                    GiroNegocio.find({})
                                    .sort({id: -1})    
    ]);
    res.json({
        ok: true,
        data,
    });
});


module.exports =  giroNegocioRouter;