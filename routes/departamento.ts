import { Router, Response, Request, response } from 'express';
import { Departamento } from '../models/departamento';
import { Trabajo } from '../models/trabajo.model';
const departamentoRouter = Router();

//crear departamento 
departamentoRouter.post('/' , (req: any, res: Response ) => {
    const body = req.body;
    Departamento.create(body).then(DepartamentoDB => {
        res.json ({
            ok:true,
            departamento: DepartamentoDB
        });
    }).catch( err => {
        res.json(err)
    });
});

//Obetner departamento
departamentoRouter.get('/show', async (req: any, res: any) => {
    const desde =  Number(req.query.desde) || 0;
    const [ departamento, total] =  await Promise.all([
                                    Departamento.find()
                                    .sort({_id: -1})          
                                    .skip( desde )
                                    .limit( 5 ),
                                    Departamento.countDocuments()
    ]);
    res.json({
        ok: true,
        departamento,
        total,
        id: req.id 
    });
});


//Obetner 1 departamento por ID
departamentoRouter.post('/showByID', async (req: any, res: any) => {
    const body = req.body;
    Departamento.find({_id:body._id} , (err, DepartamentoDB) => {
        if( err ) throw err;
        if( DepartamentoDB ) {
            const departamento = DepartamentoDB;  //TRAE TODOS
            res.json({
                ok: true,
                departamento,
                mensaje: 'Departamento encontrado!!'
            });
        } else {
            res.json({
                ok: false,
                mensaje: 'Trabajo no encontrado en nuestro sistema!'
            });
        }
    }) 
});


//Actualizar departamento
departamentoRouter.post('/update/:id', (req: any, res: Response) => {
    const id=req.params.id;
    const departamento = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
    }
    Departamento.findByIdAndUpdate(id, departamento, {new: true}, (err, departamento) => {
        if(err) throw err;
        if(!departamento){
            return res.json({
                ok:false,
                mensaje: 'Invalid data'
            })
        }
        res.json({
            ok: true, 
            departamento 
        })
    })
});


//Eliminar departamento
departamentoRouter.delete('/:id', async (req: any, res: any) => {
    const id = req.params.id;
    try {
        const departamento = await Departamento.findById(id);
        if(!departamento) {
            return res.status(404).json({
                ok: true,
                msg: 'Departamento no encontrada por identificador'
            });
        }
        await Departamento.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Departamento eliminado'
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }

});



//Exportar Excel
departamentoRouter.get('/exportar', async (req: any, res: any) => {
    const [ data ] =  await Promise.all([
                                    Departamento.find({})
                                    .sort({id: -1})    
    ]);
    res.json({
        ok: true,
        data,
    });
});



module.exports =  departamentoRouter;