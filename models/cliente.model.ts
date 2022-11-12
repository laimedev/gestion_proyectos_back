import { Schema, Document, model} from 'mongoose';
var mongoose = require('mongoose'); 
var autoIncrement = require('mongoose-auto-increment');


const clienteSchema = new Schema({
    created: {
        type: Date
    },
    razonSocial: {
         type: String,
         required: true
    },
    ruc: {
        type: String
    },
    condicion: {
        type: String
    },
    direccion: {
        type: String,
    },
    departamento: {
        type: String,
    },
    provincia: {
        type: String,
    },
    distrito: {
        type: String,
    },
    telefono: {
        type: String,
    },
    foto: {
        type: String,
    },
    correo: {
        type: String,
    }
});




clienteSchema.pre<ICliente>('save', function( next ) {
    this.created = new Date();
    next();
});


interface ICliente extends Document {
    created: Date,
    razonSocial: string;
    ruc: string;
    condicion: string;
    direccion: string;
    departamento: string;
    provincia: string;
    distrito: string;
    telefono: string;
    foto: string;
    correo: string;
}


autoIncrement.initialize(mongoose.connection); // 3. initialize autoIncrement 
clienteSchema.plugin(autoIncrement.plugin, 'Cliente'); 


export const Cliente = model<ICliente>('Cliente', clienteSchema);