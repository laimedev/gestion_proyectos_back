import { Schema, Document, model} from 'mongoose';
var mongoose = require('mongoose'); 
var autoIncrement = require('mongoose-auto-increment');


const departamentoSchema = new Schema({
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
        default: 0
    }
});




departamentoSchema.pre<IDepartamento>('save', function( next ) {
    this.created = new Date();
    next();
});


interface IDepartamento extends Document {
    created: Date,
    nombre: string;
    descipcion: string;
    estado: string;
}


autoIncrement.initialize(mongoose.connection); // 3. initialize autoIncrement 
departamentoSchema.plugin(autoIncrement.plugin, 'Departamento'); 


export const Departamento = model<IDepartamento>('Departamento', departamentoSchema);