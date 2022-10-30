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
    descipcion: string;
    logo: string;
}


autoIncrement.initialize(mongoose.connection); // 3. initialize autoIncrement 
configuracionSchema.plugin(autoIncrement.plugin, 'Configuracion'); 


export const Configuracion = model<IConfiguracion>('Configuracion', configuracionSchema);