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
    costo: {
        type: Number
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
    descripcion: string;
    costo: number;
    estado: string;
}


autoIncrement.initialize(mongoose.connection); // 3. initialize autoIncrement 
trabajosSchema.plugin(autoIncrement.plugin, 'Trabajos'); 


export const Trabajo = model<ITrabajo>('Trabajos', trabajosSchema);