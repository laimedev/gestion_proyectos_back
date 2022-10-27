import { Router, Request, Response, response } from "express";
import { Usuario } from '../models/usuario.model';
import  bcrypt  from 'bcrypt';
import Token from "../classes/token";
import TokenQR from "../classes/tokenQR";
import { verificaToken } from "../middlewares/autenticacion";

import  nodemailer  from "nodemailer";

const userRoutes = Router();




//login
userRoutes.post('/login', (req: Request, res: Response) => {
    const body = req.body;
    Usuario.findOne({dni:body.dni} , (err, userDB) => {
        if( err ) throw err;

        if( !userDB ) {
            return res.json({
                ok: false,
                mensaje: 'Usuario / contraseña no son correctos'
            });
        }


        if( userDB.compararPassword(body.password)) {

            const tokenUser = Token.getJwtToken({
                _id: userDB._id, 
                nombre: userDB.nombre,
                dni: userDB.dni,
                avatar: userDB.avatar,
                email: userDB.email,
                celular: userDB.celular,
                ubicacion: userDB.ubicacion,
                departamento: userDB.departamento,
                provincia: userDB.provincia,
                region: userDB.region,
                codigoSeccion: userDB.codigoSeccion,

                password: req.body.password,
                password_show: req.body.password_show,
                
            });


            const id = userDB._id;
            Usuario.findById(id, (err, usuario ) => {
                if(err) throw err;

                const id = usuario?.id;
    
                res.json({
                    ok: true,
                    dni: body.dni,
                    id: id,
                    token: tokenUser
                });
            });

            
        } else {
            return res.json({
                ok: false,
                mensaje: 'Usuario / contraseña no son correctos ****'
            });
        }
    });
});





userRoutes.post('/qr', (req: Request, res: Response) => {
    const body = req.body;
    Usuario.findOne({dni:body.dni} , (err, userDB) => {
        if( err ) throw err;

        if( !userDB ) {
            return res.json({
                ok: false,
                mensaje: 'Usuario / contraseña no son correctos'
            });
        }
        if( userDB.compararPassword(body.password)) {
            const tokenUser = TokenQR.getJwtTokenQR({
                _id: userDB._id, 
                nombre: userDB.nombre,
                dni: userDB.dni,
                avatar: userDB.avatar,
                email: userDB.email,
                celular: userDB.celular,
                ubicacion: userDB.ubicacion,
                departamento: userDB.departamento,
                provincia: userDB.provincia,
                region: userDB.region,

                password: req.body.password,
                password_show: req.body.password_show,
                
            });
            res.json({
                ok: true,
                token: tokenUser
            });
        } else {
            return res.json({
                ok: false,
                mensaje: 'Usuario / contraseña no son correctos ****'
            });
        }
    });
});




//Iniciar Sesion con Facebo
userRoutes.post('/login/createFb', async (req, res = response) => {

    const user = {
        nombre: req.body.nombre,
        avatar: req.body.avatar,
        email: req.body.email,
        idFb: req.body.idFb,
        dni: req.body.dni,

        password: req.body.password
    };

    Usuario.create( user ).then( userDB => {


        const tokenUser = Token.getJwtToken({
            _id: userDB._id, 
            nombre: userDB.nombre,
            avatar: userDB.avatar,
            email: userDB.email,
            // idFb: userDB.idFb,
            dni: userDB.dni,

            password: userDB.password


        });
        res.json({
            ok: true,
            user,
            token: tokenUser
        });

    }).catch(err =>  {
        res.json({
            ok: false,
            err
        });
    });  

});






//Iniciar Sesion con Google
userRoutes.post('/login/google', async (req, res = response) => {

    
    const user = {
        nombre: req.body.nombre,
        dni: req.body.dni,
        email: req.body.email,
        perfil: req.body.perfil,
        password: req.body.password,
        idGoogle: req.body.idGoogle,
        
    };




    try {

        const { nombre, email , dni ,perfil, password, idGoogle } = await user;
        const userDB = await Usuario.findOne({idGoogle});
        
    
                 
        let usuario;


        if(!userDB) {
          
            
            usuario = new Usuario({
                nombre: nombre,
                dni: dni,
                email: email,
                perfil: perfil,
                password: '@@@',
                idGoogle: idGoogle,
                google: true,
            });
        

    

        } else {
            //existe usuario
            usuario = userDB;
            // usuario.google = true

        }

        // Guardar en Base de datos

        await usuario.save();

        const tokenUser = Token.getJwtToken({
            _id: usuario._id, 
            nombre: usuario.nombre,
            dni: usuario.dni,
            avatar: usuario.avatar,
            email: usuario.email,
            celular: usuario.celular,
            ubicacion: usuario.ubicacion,
            departamento: usuario.departamento,
            provincia: usuario.provincia,
            region: usuario.region,

            password: req.body.password,
            password_show: req.body.password_show,
            
        });

        

        res.json({
            ok: true,
            msg: 'Google Login',
            user,
            token: tokenUser 
        });

    } catch {

        res.status(401).json({
            ok: false,
            msg: 'Ups Error'
        })

    }


   

});









//crear usuario
userRoutes.post('/create',(req: Request, res: Response) => {


    
    const user = {
        nombre: req.body.nombre,
        apellido_p: req.body.apellido_p,
        apellido_m: req.body.apellido_m,
        dni: req.body.dni,
        password_show:  req.body.password_show,
        password: bcrypt.hashSync(req.body.password_show, 10),
        avatar: req.body.avatar,
        email: req.body.email,
        celular: req.body.celular,
        ubicacion: req.body.ubicacion,
        departamento: req.body.departamento,
        provincia: req.body.provincia,
        codigoSeccion: req.body.codigoSeccion,

        region: req.body.region,

        

    };

   

    Usuario.create( user ).then( userDB => {


        const tokenUser = Token.getJwtToken({
            _id: userDB._id, 
            nombre: userDB.nombre,
            dni: userDB.dni,
            avatar: userDB.avatar,
            email: userDB.email,
            celular: userDB.celular,
            ubicacion: userDB.ubicacion,
            departamento: userDB.departamento,
            provincia: userDB.provincia,
            region: userDB.region,
            codigoSeccion: userDB.codigoSeccion
        });
        res.json({
            ok: true,
            token: tokenUser,
        });

        // var transporter = nodemailer.createTransport({

        //     host: "smtp.gmail.com",
        //     port: 465,
        //     secure: true,
        //     auth: {
        //         user: "qhatucacao@gmail.com",
        //         pass: "@D3v@tP*"
        //     }
        // });
    
    //     var mailOptions = {
    //         from: "qhatucacao@gmail.com",
    //         to: user.email,
    //         subject: "BIENVENIDA QHATU CACAO APP",
    //         html: `<html><head><title>QHATU CACAO APP 2021</title></head><body><table style='max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;'><tr><td style='padding: 0'><center><img style='padding: 0; display: block; margin-bottom: -10px' src='https://admin.amazonastrading.com.pe/resources/images/icono-app.png' width='20%'> <br> <br> </center></td></tr><tr><td style='background-color: #ecf0f1'><div style='color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif'><h2 style='color: #e67e22; margin: 0 0 7px'>HOLA ${user.nombre} tus datos fueron actualizados.</h2><p style='margin: 2px; font-size: 15px'> Tus accesos para la plataforma móvil son: </p><ul style='font-size: 15px; margin: 10px 0'>  <br>  <li>DNI: ${user.dni} </li> <li>CLAVE:  ${user.password_show} </li></ul> <br><div style='width: 100%; text-align: center'> <a href='https://play.google.com/store/apps/details?id=com.amazonastrading.app' target='_blank'> <img src='https://admin.amazonastrading.com.pe/resources/images/disponible-en-google-play-badge.png'  width='30%'> </a></div><p style='color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0'>Amazonas Trading Perú SAC</p></div></td></tr></table></body></html>`
    //     }
    //     transporter.sendMail(mailOptions, (error, info) => {
    //         if(error) {
    //             res.status(500).send(error.message);
    //         } else {
    //             res.json({
    //                 ok: true,
    //                 msg: 'Email enviado'
    //             });
    //             console.log("Email enviado");
    //         }
    //     });

    }).catch(err =>  {
        res.json({
            ok: false,
            err
        });
    });  
});




//crear precios 
userRoutes.post('/recuperar',  (req: any, res: Response ) => {

    const body = {
        dni: req.body.dni,
        nombre: req.body.nombre,
        userId: req.body.userId,
    }

    Usuario.create(body).then(userDB => {
        res.json ({
            ok:true,
            usuario: userDB
        });
    }).catch( err => {
        res.json(err)
    });
});







//actualizar usuario
userRoutes.post('/update', verificaToken , (req: any, res: Response) => {

    const user = {
        nombre: req.body.nombre || req.usuario.nombre,
        dni: req.body.dni || req.usuario.dni,
        avatar: req.body.avatar || req.usuario.avatar,
        email: req.body.email || req.usuario.email,
        celular: req.body.celular || req.usuario.celular,
        ubicacion: req.body.ubicacion || req.usuario.ubicacion,
        departamento: req.body.departamento || req.usuario.departamento,
        provincia: req.body.provincia || req.usuario.provincia,
        region: req.body.region || req.usuario.region,

        pretest: req.body.pretest || req.usuario.pretest,
        lecciones: req.body.lecciones || req.usuario.lecciones,
        postest: req.body.postest || req.usuario.postest,
        // password_show:  req.body.password_show,
        // password: bcrypt.hashSync(req.body.password_show, 10),
  
    }


    Usuario.findByIdAndUpdate(req.usuario._id, user, { new: true}, (err, userDB) => {
        if(err) throw err;

        if(!userDB){
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }
        const tokenUser = Token.getJwtToken({
            _id: userDB._id, 
            nombre: userDB.nombre,
            dni: userDB.dni,
            avatar: userDB.avatar,

            // password: userDB.password,
            // password_show: userDB.password_show,

            email: userDB.email,
            celular: userDB.celular,
            ubicacion: userDB.ubicacion,
            departamento: userDB.departamento,
            provincia: userDB.provincia,
            region: userDB.region,
        });
        res.json({
            ok: true,
            token: tokenUser
        });
    });
});



//actualizar push 
userRoutes.post('/updatepush', verificaToken , (req: any, res: Response) => {

    const user = {
        // nombre: req.body.nombre || req.usuario.nombre,
        // dni: req.body.dni || req.usuario.dni,
        // avatar: req.body.avatar || req.usuario.avatar,
        // email: req.body.email || req.usuario.email,
        // celular: req.body.celular || req.usuario.celular,
        // ubicacion: req.body.ubicacion || req.usuario.ubicacion,
        // departamento: req.body.departamento || req.usuario.departamento,
        // provincia: req.body.provincia || req.usuario.provincia,
        // region: req.body.region || req.usuario.region,
        push: req.body.push || req.usuario.push,
        // password_show:  req.body.password_show,
        // password: bcrypt.hashSync(req.body.password_show, 10),
    }



    Usuario.findByIdAndUpdate(req.usuario._id, user, { new: true}, (err, userDB) => {
        if(err) throw err;

        if(!userDB){
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }
        const tokenUser = Token.getJwtToken({
            // _id: userDB._id, 
            // nombre: userDB.nombre,
            // dni: userDB.dni,
            // avatar: userDB.avatar,
            // password: userDB.password,
            // password_show: userDB.password_show,
            // email: userDB.email,
            // celular: userDB.celular,
            // ubicacion: userDB.ubicacion,
            // departamento: userDB.departamento,
            // provincia: userDB.provincia,
            push: userDB.push,
            // region: userDB.region,
        });



        res.json({
            ok: true,
            token: tokenUser
        });
    });

});






//actualizar usuario
userRoutes.post('/updatepass', verificaToken , (req: any, res: Response) => {
    const user = {
        nombre: req.body.nombre || req.usuario.nombre,
        dni: req.body.dni || req.usuario.dni,
        avatar: req.body.avatar || req.usuario.avatar,
        email: req.body.email || req.usuario.email,
        celular: req.body.celular || req.usuario.celular,
        ubicacion: req.body.ubicacion || req.usuario.ubicacion,
        departamento: req.body.departamento || req.usuario.departamento,
        provincia: req.body.provincia || req.usuario.provincia,
        region: req.body.region || req.usuario.region,
        farmerid: req.body.farmerid || req.usuario.farmerid,

        password_show:  req.body.password_show,
        password: bcrypt.hashSync(req.body.password_show, 10),
    }
    Usuario.findByIdAndUpdate(req.usuario._id, user, { new: true}, (err, userDB) => {
        if(err) throw err;

        if(!userDB){
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }
        const tokenUser = Token.getJwtToken({
            _id: userDB._id, 
            nombre: userDB.nombre,
            dni: userDB.dni,
            avatar: userDB.avatar,
            password: userDB.password,
            password_show: userDB.password_show,
            email: userDB.email,
            celular: userDB.celular,
            ubicacion: userDB.ubicacion,
            departamento: userDB.departamento,
            provincia: userDB.provincia,
            // farmerid: userDB.farmerid,
            region: userDB.region,
        });




        var transporter = nodemailer.createTransport({

            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "qhatucacao@gmail.com",
                pass: "@D3v@tP*"
            }
        });
    
        var mailOptions = {
            from: "qhatucacao@gmail.com",
            to: user.email,
            subject: "ACTUALIZACION DE CONTRASEÑA QHATU CACAO APP",
            html: `<html><head><title>QHATU CACAO APP 2020</title></head><body><table style='max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;'><tr><td style='padding: 0'><center><img style='padding: 0; display: block; margin-bottom: -10px' src='https://admin.amazonastrading.com.pe/resources/images/icono-app.png' width='20%'> <br> <br> </center></td></tr><tr><td style='background-color: #ecf0f1'><div style='color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif'><h2 style='color: #e67e22; margin: 0 0 7px'>HOLA ${user.nombre} tu cambio de contraseña fue un exito.</h2><p style='margin: 2px; font-size: 15px'> Tus accesos para la plataforma móvil son: </p><ul style='font-size: 15px; margin: 10px 0'>  <br>  <li>DNI: ${user.dni} </li> <li>CLAVE:  ${user.password_show} </li></ul> <br><div style='width: 100%; text-align: center'> <a href='https://play.google.com/store/apps/details?id=com.amazonastrading.app' target='_blank'> <img src='https://admin.amazonastrading.com.pe/resources/images/disponible-en-google-play-badge.png'  width='30%'> </a></div><p style='color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0'>Amazonas Trading Perú SAC</p></div></td></tr></table></body></html>`
        }
    
    
    
        transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                res.status(500).send(error.message);
            } else {
                res.json({
                    ok: true,
                    msg: 'Email enviado'
                });
    
                console.log("Email enviado");
            }
        });


        res.json({
            ok: true,
            token: tokenUser
        });
    });
});





//Actualizar Contraseña del Usuario Seleccionado
userRoutes.post('/update_pass/:id', (req: any, res: Response) => {
    const id=req.params.id;
    const usuario = {
        nombre: req.body.nombre || req.usuario.nombre,
        dni: req.body.dni || req.usuario.dni,
        email: req.body.email || req.usuario.email,

        password_show:  req.body.password_show,
        password: bcrypt.hashSync(req.body.password_show, 10),
    }
    Usuario.findByIdAndUpdate(id, usuario, {new: true}, (err, usuario) => {
        if(err) throw err;
        if(!usuario){
            return res.json({
                ok:false,
                mensaje: 'Invalid data'
            })
        }


        var transporter = nodemailer.createTransport({

            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "qhatucacao@gmail.com",
                pass: "@D3v@tP*"
            }
        });
    
        var mailOptions = {
            from: "qhatucacao@gmail.com",
            to: usuario.email,
            subject: "ACCESOS QHATU CACAO APP - IMPORTANTE",
            html: `<html><head><title>DINDON APP</title></head><body><table style='max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;'><tr><td style='padding: 0'><center><img style='padding: 0; display: block; margin-bottom: -10px' src='https://deliverydindon.com/assets/img/landing/mapa.png' width='20%'> <br> <br> </center></td></tr><tr><td style='background-color: #ecf0f1'><div style='color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif'><h2 style='color: #e67e22; margin: 0 0 7px'>BIENVENIDO Chamo, tu registro fue un exito.</h2><p style='margin: 2px; font-size: 15px'> Tus accesos son los siguientes: </p><ul style='font-size: 15px; margin: 10px 0'>  <br>  <li>USUARIO: dindon@gmail.com </li> <li>CLAVE:  *&$#*_% </li></ul> <br><div style='width: 100%; text-align: center'> <a href='https://play.google.com/store/apps/details?id=com.amazonastrading.app' target='_blank'> <img src='https://admin.amazonastrading.com.pe/resources/images/disponible-en-google-play-badge.png'  width='30%'> </a></div><p style='color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0'>Amazonas Trading Perú SAC</p></div></td></tr></table></body></html>`
        }
    
    
    
        transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                res.status(500).send(error.message);
            } else {
                res.json({
                    ok: true,
                    msg: 'Email enviado'
                });
    
                console.log("Email enviado");
            }
        });



        res.json({
            ok: true,
            msg: 'Contraseña actualizada correctamente',
            usuario
            
        });usuario
    })
});












userRoutes.get('/', [ verificaToken ], ( req: any, res: Response ) => {
    const usuario = req.usuario;
    res.json({
        ok: true,
        usuario
    });
});


userRoutes.get('/', [verificaToken], (req: any, res: Response) => {
    const usuario = req.usuario;
    res.json({
        ok: true,
        usuario
    });
});




//Obetner Usuarios x2
userRoutes.get('/obtener', async (req: any, res: any) => {
    const desde =  Number(req.query.desde) || 0;
    console.log(desde);

    const [ usuario, total] =  await Promise.all([
                                    Usuario.find()
                                    .sort({_id: -1})          
                                    // .populate('usuario', 'nombre celular email dni avatar')
                                    .skip( desde )
                                    .limit( 10 ),
                                    Usuario.countDocuments()
    ]);
    res.json({
        ok: true,
        usuario,
        total,
        id: req.id 
    });
});








//Borrar 

userRoutes.delete('/:id',    (req: any, res: Response) => {
    const id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuario ) => {
        if(err) throw err;

        res.json({
            ok: true,
            mensaje: 'Usuario APP Eliminado',
            body: usuario
        })
    }); 
});


//OBTENER INFO POR DNI
userRoutes.get('/view/:id',    (req: any, res: Response) => {
    const id = req.params.id;

    Usuario.findById(id, (err, usuario ) => {
        if(err) throw err;

        res.json({
            ok: true,
            mensaje: 'Informacion Usuario',
            user: usuario
        })
    }); 
});



//ACTUALIZAR INFO POR DNI
userRoutes.put('/update/:id', (req: any, res: Response) => {
    const id=req.params.id;
    const usuario = {
        nombre: req.body.nombre || req.usuario.nombre,
        email: req.body.email || req.usuario.email,
        celular: req.body.celular || req.usuario.celular,
        foto: req.body.foto || req.usuario.foto,
    }
    Usuario.findByIdAndUpdate(id, usuario, {new: true}, (err, usuario) => {
        if(err) throw err;
        if(!usuario){
            return res.json({
                ok:false,
                mensaje: 'Invalid data'
            })
        }
        res.json({
            ok: true,
            msg: 'Usuario actualizado correctamente',
            usuario
            
        });usuario
    })
});




// ACTUALIZAR  PRETEST 

userRoutes.put('/update_pretest/:id', (req: any, res: Response) => {
    const id=req.params.id;
    const usuario = {
        pretest: req.body.pretest || req.usuario.pretest,
    }
    Usuario.findByIdAndUpdate(id, usuario, {new: true}, (err, usuario) => {
        if(err) throw err;
        if(!usuario){
            return res.json({
                ok:false,
                mensaje: 'Invalid data'
            })
        }
        res.json({
            ok: true,
            msg: 'Prueba inicial actualizada correctamente',
            // usuario ___
            
        });usuario
    })
});




userRoutes.put('/update_historia/:id', (req: any, res: Response) => {
    const id=req.params.id;
    const usuario = {
        pretest: req.body.pretest || req.usuario.pretest,
        lecciones: req.body.lecciones || req.usuario.lecciones,
        postest: req.body.postest || req.usuario.postest
    }
    Usuario.findByIdAndUpdate(id, usuario, {new: true}, (err, usuario) => {
        if(err) throw err;
        if(!usuario){
            return res.json({
                ok:false,
                mensaje: 'Invalid data'
            })
        }
        res.json({
            ok: true,
            msg: 'Usuario actualizado correctamente',
            usuario
            
        });usuario
    })
});



userRoutes.post('/forget_password',  (req: any, res: Response ) => {

    const body = req.body;
    Usuario.findOne({dni:body.dni} , (err, userDB) => {
        if( err ) throw err;

        if( userDB ) {
            const email = userDB.email;
            const user = userDB;
            // return res.json({
            res.json({
                ok: true,
                email: email,
                user,
                mensaje: 'Usurio encontrado, se le enviara la contraseña a su correo electronico!!'
            });

        } else {
            res.json({
                ok: false,
                mensaje: 'Usuario no encontrado en nuestro sistema!'
            });
        }
    }) 
});

userRoutes.post('/forget_password',  (req: any, res: Response ) => {

    const body = req.body;
    Usuario.findOne({dni:body.dni} , (err, userDB) => {
        if( err ) throw err;

        if( userDB ) {
            const email = userDB.email;
            const user = userDB;
            // return res.json({
            res.json({
                ok: true,
                email: email,
                user,
                mensaje: 'Usurio encontrado, se le enviara la contraseña a su correo electronico!!'
            });

            var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "systemdevsperu@gmail.com",
                pass: "alx1x2x3exmux"
            }
            });
            var mailOptions = {
                from: "systemdevsperu@gmail.com",
                to: user.email,
                subject: "CONTRASEÑA RECUPERADA",
                html: `<html><head><title>NEW APP 2022</title></head><body><table style='max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;'><tr><td style='padding: 0'><center><img style='padding: 0; display: block; margin-bottom: -10px' src='https://midatic.com/wp-content/uploads/2021/03/logo-midatic.png' width='50%'> <br> <br> </center></td></tr><tr><td style='background-color: #ecf0f1'><div style='color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif'><h2 style='color: #e43030; margin: 0 0 7px'>HOLA  <p style="color: #6694e1"> ${user.nombre} </p> tus datos fueron recuperados.</h2><p style='margin: 2px; font-size: 15px'> Tus accesos para la plataforma móvil son: </p><ul style='font-size: 15px; margin: 10px 0'>  <br>  <li>DNI: ${user.dni} </li> <li>CLAVE:  ${user.password_show} </li></ul> <br><div style='width: 100%; text-align: center'> <a href='https://play.google.com/store/apps/' target='_blank'> <img src='https://play.google.com/intl/es-419/badges/static/images/badges/es-419_badge_web_generic.png'  width='40%'> </a></div><p style='color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0'>Midatic SAC</p></div></td></tr></table></body></html>`
            }
            transporter.sendMail(mailOptions, (error, info) => {
                if(error) {
                    res.status(500).send(error.message);
                } else {
                    res.json({
                        ok: true,
                        msg: 'Email enviado'
                    });
                    console.log("Email enviado");
                }
            });

        } else {
            res.json({
                ok: false,
                mensaje: 'Usuario no encontrado en nuestro sistema!'
            });
        }
    }) 
});

// ll
        


//Obetner Usuarios TODOS
userRoutes.get('/exportar', async (req: any, res: any) => {
    const [ usuario] =  await Promise.all([
                                    Usuario.find({}, ' -_id nombre email celular dni password password_show ubicacion departamento provincia region push farmerid avatar')
                                    .sort({_id: -1})    
    ]);
    res.json({
        ok: true,
        usuario,
    });
});



userRoutes.post('/send-email', (req, res) => {
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "qhatucacao@gmail.com",
            pass: "@D3v@tP*"
        }
    });
    var mailOptions = {
        from: "qhatucacao@gmail.com",
        to: "alaimes64@gmail.com",
        subject: "Enviado desde nodemailer XX",
        text: "Hola alex laime como haz estado causita, nos metemos una peli de hackers :x",
        html: "<p style='background: green; color: red;'>HTML version of the message</p> <br> <br> <h1>Hoooola </h1>"
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            res.status(500).send(error.message);
        } else {
            res.json({
                ok: true,
                msg: 'Email enviado'
            });

            console.log("Email enviado");
        }
    });
});




//Actualizar Farmer ID del Usuario Seleccionado
userRoutes.post('/update_farmerid/:id', (req: any, res: Response) => {
    const id=req.params.id;
    const usuario = {
        nombre: req.body.nombre || req.usuario.nombre,
        dni: req.body.dni || req.usuario.dni,
        email: req.body.email || req.usuario.email,
        codigoSeccion: req.body.codigoSeccion || req.usuario.codigoSeccion,



    }
    Usuario.findByIdAndUpdate(id, usuario, {new: true}, (err, usuario) => {
        if(err) throw err;
        if(!usuario){
            return res.json({
                ok:false,
                mensaje: 'Invalid data'
            })
        }

        res.json({
            ok: true,
            msg: 'Farmer ID actualizada correctamente',
            usuario
            
        });usuario
    })
});






export default userRoutes;