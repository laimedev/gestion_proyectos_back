import { Schema, Document, model} from 'mongoose';
var mongoose = require('mongoose'); 
var autoIncrement = require('mongoose-auto-increment');


const tareaSchema = new Schema({
    created: {
        type: Date
    },
    nombre: {
         type: String,
         required: true
    },
    actividad: {
        type: String
    }
});




tareaSchema.pre<ITarea>('save', function( next ) {
    this.created = new Date();
    next();
});


interface ITarea extends Document {
    created: Date,
    nombre: string;
    actividad: string;
}


autoIncrement.initialize(mongoose.connection); // 3. initialize autoIncrement 
tareaSchema.plugin(autoIncrement.plugin, 'Tarea'); 


export const Tarea = model<ITarea>('Tarea', tareaSchema);