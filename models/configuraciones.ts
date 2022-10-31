import { Schema, Document, model} from 'mongoose';
var mongoose = require('mongoose'); 
var autoIncrement = require('mongoose-auto-increment');


const configuracionSchema = new Schema({
    created: {
        type: Date
    },
    titulo: {
         type: String,
         required: true
    },
    descripcion: {
        type: String
    },
    ruc: {
        type: String
    },
    razonSocial: {
        type: String
    },
    direccion: {
        type: String
    },
    telefono: {
        type: String
    },
    correo: {
        type: String
    },
    web: {
        type: String
    },
    logo: {
        type: String,
    }
});




configuracionSchema.pre<IConfiguracion>('save', function( next ) {
    this.created = new Date();
    next();
});


interface IConfiguracion extends Document {
    created: Date,
    titulo: string;
    descripcion: string;
    ruc: string;
    razonSocial: string;
    direccion: string;
    telefono: string;
    correo: string;
    web: string;
    logo: string;
}


autoIncrement.initialize(mongoose.connection); // 3. initialize autoIncrement 
configuracionSchema.plugin(autoIncrement.plugin, 'Configuracion'); 


export const Configuracion = model<IConfiguracion>('Configuracion', configuracionSchema);