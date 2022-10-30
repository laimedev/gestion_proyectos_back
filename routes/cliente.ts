import { Router, Response, Request, response } from 'express';
import { Personal } from '../models/personal.model';
import  bcrypt  from 'bcrypt';
import { check, validationResult } from 'express-validator';

const { generarJWT } = require ('../helpers/jwt'); 
const { validarJWT } = require('../middlewares/validar-jwt');
import { getMenuFrontEnd } from '../helpers/menu-frontend';
import { Cliente } from '../models/cliente.model';

const clienteRouter = Router();

//crear cliente 
clienteRouter.post('/' , (req: any, res: Response ) => {
    const body = req.body;
    // body.password_show = req.body.password_show,
    // body.password = bcrypt.hashSync(req.body.password_show, 10),
    Cliente.create(body).then(ClienteDB => {
        res.json ({
            ok:true,
            cliente: ClienteDB
        });
    }).catch( err => {
        res.json(err)
    });
});









//Obetner cliente
clienteRouter.get('/show', async (req: any, res: any) => {
    const desde =  Number(req.query.desde) || 0;
    const [ cliente, total] =  await Promise.all([
                                    Cliente.find()
                                    .sort({_id: -1})          
                                    .skip( desde )
                                    .limit( 5 ),
                                    Cliente.countDocuments()
    ]);
    res.json({
        ok: true,
        cliente,
        total,
        id: req.id 
    });
});



//Obetner 1 Cliente por ID
clienteRouter.post('/showByID', async (req: any, res: any) => {
    const body = req.body;
    Cliente.find({_id:body._id} , (err, ClienteDB) => {
        if( err ) throw err;
        if( ClienteDB ) {
            const cliente = ClienteDB;  //TRAE TODOS
            res.json({
                ok: true,
                cliente,
                mensaje: 'Cliente encontrado!!'
            });
        } else {
            res.json({
                ok: false,
                mensaje: 'Cliente no encontrado en nuestro sistema!'
            });
        }
    }) 
});



//Actualizar cliente
clienteRouter.post('/update/:id', (req: any, res: Response) => {
    const id=req.params.id;
    const cliente = {
        razonSocial: req.body.razonSocial,
        ruc: req.body.ruc,
        condicion: req.body.condicion,
        direccion: req.body.direccion,
        departamento: req.body.departamento,
        provincia: req.body.provincia,
        distrito: req.body.distrito,
        telefono: req.body.telefono,
        correo: req.body.correo,
    }
    Cliente.findByIdAndUpdate(id, cliente, {new: true}, (err, cliente) => {
        if(err) throw err;
        if(!cliente){
            return res.json({
                ok:false,
                mensaje: 'Invalid data'
            })
        }
        res.json({
            ok: true, 
            cliente 
        })
    })
});


//Eliminar Cliente
clienteRouter.delete('/:id', async (req: any, res: any) => {
    const id = req.params.id;
    try {
        const cliente = await Cliente.findById(id);
        if(!cliente) {
            return res.status(404).json({
                ok: true,
                msg: 'Cliente no encontrada por identificador'
            });
        }
        await Cliente.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Cliente eliminado'
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }

});


module.exports =  clienteRouter;