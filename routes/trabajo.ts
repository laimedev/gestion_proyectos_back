import { Router, Response, Request, response } from 'express';
import { Proyecto } from '../models/proyectos.model';
import { Trabajo } from '../models/trabajo.model';
const trabajoRouter = Router();

//crear trabajo 
trabajoRouter.post('/' , (req: any, res: Response ) => {
    const body = req.body;
    Trabajo.create(body).then(TrabajoDB => {
        res.json ({
            ok:true,
            trabajo: TrabajoDB
        });
    }).catch( err => {
        res.json(err)
    });
});

//Obetner trabajo
trabajoRouter.get('/show', async (req: any, res: any) => {
    const desde =  Number(req.query.desde) || 0;
    const [ trabajo, total] =  await Promise.all([
                                    Trabajo.find()
                                    .sort({_id: -1})          
                                    .skip( desde )
                                    .limit( 5 ),
                                    Trabajo.countDocuments()
    ]);
    res.json({
        ok: true,
        trabajo,
        total,
        id: req.id 
    });
});


//Obetner 1 Trabajo por ID
trabajoRouter.post('/showByID', async (req: any, res: any) => {
    const body = req.body;
    Trabajo.find({_id:body._id} , (err, TrabajoDB) => {
        if( err ) throw err;
        if( TrabajoDB ) {
            const trabajo = TrabajoDB;  //TRAE TODOS
            res.json({
                ok: true,
                trabajo,
                mensaje: 'Trabajo encontrado!!'
            });
        } else {
            res.json({
                ok: false,
                mensaje: 'Trabajo no encontrado en nuestro sistema!'
            });
        }
    }) 
});


//Actualizar trabajo
trabajoRouter.post('/update/:id', (req: any, res: Response) => {
    const id=req.params.id;
    const trabajo = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
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


//Eliminar trabajo
trabajoRouter.delete('/:id', async (req: any, res: any) => {
    const id = req.params.id;
    try {
        const trabajo = await Trabajo.findById(id);
        if(!trabajo) {
            return res.status(404).json({
                ok: true,
                msg: 'Trabajo no encontrada por identificador'
            });
        }
        await Trabajo.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Trabajo eliminado'
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }

});


module.exports =  trabajoRouter;