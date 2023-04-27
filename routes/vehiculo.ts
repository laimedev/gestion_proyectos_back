import { Router, Response, Request, response } from 'express';
import { Vehiculo } from '../models/vehiculos.model';
const vehiculoRouter = Router();

//crear Vehiculo 
vehiculoRouter.post('/' , (req: any, res: Response ) => {
    const body = req.body;
    Vehiculo.create(body).then(VehiculoDB => {
        res.json ({
            ok:true,
            vehiculo: VehiculoDB
        });
    }).catch( err => {
        res.json(err)
    });
});

//Obetner Vehiculo
vehiculoRouter.get('/show', async (req: any, res: any) => {
    const desde =  Number(req.query.desde) || 0;
    const [ vehiculo, total] =  await Promise.all([
                                    Vehiculo.find()
                                    .sort({_id: -1})          
                                    .skip( desde )
                                    .limit( 5 ),
                                    Vehiculo.countDocuments()
    ]);
    res.json({
        ok: true,
        vehiculo,
        total,
        id: req.id 
    });
});


//Obetner 1 Vehiculo por ID
vehiculoRouter.post('/showByID', async (req: any, res: any) => {
    const body = req.body;
    Vehiculo.find({_id:body._id} , (err, VehiculoDB) => {
        if( err ) throw err;
        if( VehiculoDB ) {
            const vehiculo = VehiculoDB;  //TRAE TODOS
            res.json({
                ok: true,
                vehiculo,
                mensaje: 'Vehiculo encontrado!!'
            });
        } else {
            res.json({
                ok: false,
                mensaje: 'Vehiculo no encontrado en nuestro sistema!'
            });
        }
    }) 
});


//Actualizar Vehiculo
vehiculoRouter.post('/update/:id', (req: any, res: Response) => {
    const id=req.params.id;
    const vehiculo = {
        marca: req.body.marca,
        modelo: req.body.modelo,
        placa: req.body.placa,
        id_conductor: req.body.id_conductor,
        cod_vehiculo: req.body.cod_vehiculo,
        estado: req.body.estado,
    }
    Vehiculo.findByIdAndUpdate(id, vehiculo, {new: true}, (err, vehiculo) => {
        if(err) throw err;
        if(!vehiculo){
            return res.json({
                ok:false,
                mensaje: 'Invalid data'
            })
        }
        res.json({
            ok: true, 
            vehiculo 
        })
    })
});


//Eliminar vehiculo
vehiculoRouter.delete('/:id', async (req: any, res: any) => {
    const id = req.params.id;
    try {
        const vehiculo = await Vehiculo.findById(id);
        if(!vehiculo) {
            return res.status(404).json({
                ok: true,
                msg: 'Vehiculo no encontrada por identificador'
            });
        }
        await Vehiculo.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Vehiculo eliminado'
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }

});


//Exportar Excel
vehiculoRouter.get('/exportar', async (req: any, res: any) => {
    const [ data ] =  await Promise.all([
                                    Vehiculo.find({})
                                    .sort({id: -1})    
    ]);
    res.json({
        ok: true,
        data,
    });
});


module.exports =  vehiculoRouter;