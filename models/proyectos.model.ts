import { Schema, Document, model} from 'mongoose';
var mongoose = require('mongoose'); 
var autoIncrement = require('mongoose-auto-increment');


const proyectosSchema = new Schema({
    created: {
        type: Date
    },
    nombre: {
         type: String,
         required: true
    },
    descripcion: {
        type: String
    },
    estado: {
        type: String,
        default: 'Nuevo'
    }
});




proyectosSchema.pre<IProyecto>('save', function( next ) {
    this.created = new Date();
    next();
});


interface IProyecto extends Document {
    created: Date,
    nombre: string;
    descipcion: string;
    estado: string;
}


autoIncrement.initialize(mongoose.connection); // 3. initialize autoIncrement 
proyectosSchema.plugin(autoIncrement.plugin, 'Proyectos'); 


export const Proyecto = model<IProyecto>('Proyectos', proyectosSchema);