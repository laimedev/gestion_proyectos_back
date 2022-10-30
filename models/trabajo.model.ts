import { Schema, Document, model} from 'mongoose';
var mongoose = require('mongoose'); 
var autoIncrement = require('mongoose-auto-increment');


const trabajosSchema = new Schema({
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




trabajosSchema.pre<ITrabajo>('save', function( next ) {
    this.created = new Date();
    next();
});


interface ITrabajo extends Document {
    created: Date,
    nombre: string;
    descipcion: string;
    estado: string;
}


autoIncrement.initialize(mongoose.connection); // 3. initialize autoIncrement 
trabajosSchema.plugin(autoIncrement.plugin, 'Trabajos'); 


export const Trabajo = model<ITrabajo>('Trabajos', trabajosSchema);