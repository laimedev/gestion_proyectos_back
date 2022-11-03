import { Schema, Document, model} from 'mongoose';
var mongoose = require('mongoose'); 
var autoIncrement = require('mongoose-auto-increment');


const reportesSchema = new Schema({
    created: {
        type: Date
    },
    trabajo: {
         type: String,
         required: true
    },
    fecha_desde: {
        type: String
    },
    fecha_hasta: {
        type: String
    },
    horas: {
        type: Number
    },
    observacion: {
        type: String
    },
    proyectoNombre: {
        type: String,
    },
    proyectoID: {
        type: Number,
    },
    personalNombre: {
        type: String,
    },
    personalID: {
        type: Number,
    }
});




reportesSchema.pre<IReporte>('save', function( next ) {
    this.created = new Date();
    next();
});


interface IReporte extends Document {
    created: Date,
    trabajo: string;
    fecha_desde: string;
    fecha_hasta: string;
    horas: number;
    observacion: string;
    proyectoNombre: string;
    proyectoID: number;
    personalNombre: string;
    personalID: number;
}


autoIncrement.initialize(mongoose.connection); // 3. initialize autoIncrement 
reportesSchema.plugin(autoIncrement.plugin, 'Reportes'); 


export const Reporte = model<IReporte>('Reportes', reportesSchema);