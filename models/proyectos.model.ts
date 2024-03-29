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
    responsable: {
        type: Number
    },
    presupuesto: {
        type: String
    },
    fecha_inicio: {
        type: String
    },
    fecha_fin: {
        type: String
    },
    fecha_termino: {
        type: String
    },
    cotizacion: {
        type: String
    },
    cliente: {
        type: Number
    },
    ev: {
        type: Number
    },
    pv: {
        type: Number
    },
    sv: {
        type: Number
    },
    ac: {
        type: Number
    },
    cv: {
        type: Number
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
    responsable: number;
    presupuesto: string;
    fecha_inicio: string;
    fecha_fin: string;
    cliente: number;
    cotizacion: string;
    fecha_termino: string;
    ev: number;
    pv: number;
    sv: number;

    ac: number;
    cv: number;


    estado: string;
}


autoIncrement.initialize(mongoose.connection); // 3. initialize autoIncrement 
proyectosSchema.plugin(autoIncrement.plugin, 'Proyectos'); 


export const Proyecto = model<IProyecto>('Proyectos', proyectosSchema);