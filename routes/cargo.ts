import { Router, Response, Request, response } from 'express';
import { Cargo } from '../models/cargo';
const cargoRouter = Router();

//crear cargo 
cargoRouter.post('/' , (req: any, res: Response ) => {
    const body = req.body;
    Cargo.create(body).then(CargoDB => {
        res.json ({
            ok:true,
            cargo: CargoDB
        });
    }).catch( err => {
        res.json(err)
    });
});

//Obetner cargo
cargoRouter.get('/show', async (req: any, res: any) => {
    const desde =  Number(req.query.desde) || 0;
    const [ cargo, total] =  await Promise.all([
                                    Cargo.find()
                                    .sort({_id: -1})          
                                    .skip( desde )
                                    .limit( 5 ),
                                    Cargo.countDocuments()
    ]);
    res.json({
        ok: true,
        cargo,
        total,
        id: req.id 
    });
});


//Obetner 1 Cargo por ID
cargoRouter.post('/showByID', async (req: any, res: any) => {
    const body = req.body;
    Cargo.find({_id:body._id} , (err, CargoDB) => {
        if( err ) throw err;
        if( CargoDB ) {
            const cargo = CargoDB;  //TRAE TODOS
            res.json({
                ok: true,
                cargo,
                mensaje: 'Cargo encontrado!!'
            });
        } else {
            res.json({
                ok: false,
                mensaje: 'Cargo no encontrado en nuestro sistema!'
            });
        }
    }) 
});


//Actualizar cargo
cargoRouter.post('/update/:id', (req: any, res: Response) => {
    const id=req.params.id;
    const cargo = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
    }
    Cargo.findByIdAndUpdate(id, cargo, {new: true}, (err, cargo) => {
        if(err) throw err;
        if(!cargo){
            return res.json({
                ok:false,
                mensaje: 'Invalid data'
            })
        }
        res.json({
            ok: true, 
            cargo 
        })
    })
});


//Eliminar cargo
cargoRouter.delete('/:id', async (req: any, res: any) => {
    const id = req.params.id;
    try {
        const cargo = await Cargo.findById(id);
        if(!cargo) {
            return res.status(404).json({
                ok: true,
                msg: 'Cargo no encontrada por identificador'
            });
        }
        await Cargo.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Cargo eliminado'
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }

});


module.exports =  cargoRouter;