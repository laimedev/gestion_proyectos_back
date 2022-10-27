import { Router, Response, Request, response } from 'express';
import { Personal } from '../models/personal.model';
import  bcrypt  from 'bcrypt';
import { check, validationResult } from 'express-validator';

const { generarJWT } = require ('../helpers/jwt'); 
const { validarJWT } = require('../middlewares/validar-jwt');
import { getMenuFrontEnd } from '../helpers/menu-frontend';

const personalRouter = Router();

//crear personal 
personalRouter.post('/' , (req: any, res: Response ) => {
    const body = req.body;
    body.password_show = req.body.password_show,
    body.password = bcrypt.hashSync(req.body.password_show, 10),
    Personal.create(body).then(PersonalDB => {
        res.json ({
            ok:true,
            personal: PersonalDB
        });
    }).catch( err => {
        res.json(err)
    });
});




//Iniciar Sesion Personal
personalRouter.post('/login',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty()
    ],
    async  (req: Request, res = response) => { 
    const { email, password} = req.body;

    try { 
        //Verificar email
        const personalDB = await Personal.findOne({ email });
        if( !personalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no valida'
            });
        }
        //Verificar contraseña
        const validPassword = bcrypt.compareSync( password, personalDB.password);  

        if ( !validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            });
        }
        //Generar el Token -JWT
        const token = await  generarJWT(personalDB.id);
        res.json({
            ok: true,
            // msg: 'Hola Laime esto es LOGIN'
            token,
            user: personalDB.nombres,
            menu: getMenuFrontEnd(personalDB.role)
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
});






//Obetner personal
personalRouter.get('/show', async (req: any, res: any) => {
    const desde =  Number(req.query.desde) || 0;
    const [ personal, total] =  await Promise.all([
                                    Personal.find()
                                    .sort({_id: -1})          
                                    .skip( desde )
                                    .limit( 5 ),
                                    Personal.countDocuments()
    ]);
    res.json({
        ok: true,
        personal,
        total,
        id: req.id 
    });
});



//Obetner 1 personal por ID
personalRouter.post('/showByID', async (req: any, res: any) => {
    const body = req.body;
    Personal.find({_id:body._id} , (err, PersonalDB) => {
        if( err ) throw err;
        if( PersonalDB ) {
            const personal = PersonalDB;  //TRAE TODOS
            res.json({
                ok: true,
                personal,
                mensaje: 'Personal encontrado!!'
            });
        } else {
            res.json({
                ok: false,
                mensaje: 'Personal no encontrado en nuestro sistema!'
            });
        }
    }) 
});



//Actualizar personal
personalRouter.post('/update/:id', (req: any, res: Response) => {
    const id=req.params.id;
    const personal = {
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        departamento: req.body.departamento,
        cargo: req.body.cargo,
        email: req.body.email,
        avatar: req.body.avatar,
        estado: req.body.estado,
    }
    Personal.findByIdAndUpdate(id, personal, {new: true}, (err, personal) => {
        if(err) throw err;
        if(!personal){
            return res.json({
                ok:false,
                mensaje: 'Invalid data'
            })
        }
        res.json({
            ok: true, 
            personal 
        })
    })
});


//Eliminar personal
personalRouter.delete('/:id', async (req: any, res: any) => {
    const id = req.params.id;
    try {
        const personal = await Personal.findById(id);
        if(!personal) {
            return res.status(404).json({
                ok: true,
                msg: 'Personal no encontrada por identificador'
            });
        }
        await Personal.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Personal eliminado'
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }

});


module.exports =  personalRouter;