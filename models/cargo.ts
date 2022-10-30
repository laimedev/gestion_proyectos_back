import { Schema, Document, model} from 'mongoose';
var mongoose = require('mongoose'); 
var autoIncrement = require('mongoose-auto-increment');


const cargoSchema = new Schema({
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
    departamento: {
        type: String
    },
    estado: {
        type: String,
        default: 'Nuevo'
    }
});




cargoSchema.pre<ICargo>('save', function( next ) {
    this.created = new Date();
    next();
});


interface ICargo extends Document {
    created: Date,
    nombre: string;
    descipcion: string;
    estado: string;
}


autoIncrement.initialize(mongoose.connection); // 3. initialize autoIncrement 
cargoSchema.plugin(autoIncrement.plugin, 'Cargo'); 


export const Cargo = model<ICargo>('Cargo', cargoSchema);