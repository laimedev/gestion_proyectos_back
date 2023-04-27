import { Router, Response, Request, response } from 'express';
import { Producto } from '../models/producto.model';
const productoRouter = Router();

//crear Producto 
productoRouter.post('/' , (req: any, res: Response ) => {
    const body = req.body;
    Producto.create(body).then(ProductoDB => {
        res.json ({
            ok:true,
            producto: ProductoDB
        });
    }).catch( err => {
        res.json(err)
    });
});

//Obetner Producto
productoRouter.get('/show', async (req: any, res: any) => {
    const desde =  Number(req.query.desde) || 0;
    const [ producto, total] =  await Promise.all([
                                    Producto.find()
                                    .sort({_id: -1})          
                                    .skip( desde )
                                    .limit( 5 ),
                                    Producto.countDocuments()
    ]);
    res.json({
        ok: true,
        producto,
        total,
        id: req.id 
    });
});


//Obetner 1 Producto por ID
productoRouter.post('/showByID', async (req: any, res: any) => {
    const body = req.body;
    Producto.find({_id:body._id} , (err, ProductoDB) => {
        if( err ) throw err;
        if( ProductoDB ) {
            const producto = ProductoDB;  //TRAE TODOS
            res.json({
                ok: true,
                producto,
                mensaje: 'Producto encontrado!!'
            });
        } else {
            res.json({
                ok: false,
                mensaje: 'Producto no encontrado en nuestro sistema!'
            });
        }
    }) 
});


//Actualizar Producto
productoRouter.post('/update/:id', (req: any, res: Response) => {
    const id=req.params.id;
    const producto = {
        id_categoria: req.body.id_categoria,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        stock: req.body.stock,
        u_medida: req.body.u_medida,
        estado: req.body.estado,
    }
    Producto.findByIdAndUpdate(id, producto, {new: true}, (err, producto) => {
        if(err) throw err;
        if(!producto){
            return res.json({
                ok:false,
                mensaje: 'Invalid data'
            })
        }
        res.json({
            ok: true, 
            producto 
        })
    })
});


//Eliminar Producto
productoRouter.delete('/:id', async (req: any, res: any) => {
    const id = req.params.id;
    try {
        const producto = await Producto.findById(id);
        if(!producto) {
            return res.status(404).json({
                ok: true,
                msg: 'Producto no encontrada por identificador'
            });
        }
        await Producto.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Producto eliminado'
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }

});


//Exportar Excel
productoRouter.get('/exportar', async (req: any, res: any) => {
    const [ data ] =  await Promise.all([
                                    Producto.find({})
                                    .sort({id: -1})    
    ]);
    res.json({
        ok: true,
        data,
    });
});


module.exports =  productoRouter;