import {Schema, model, Document } from 'mongoose';

const giroNegocioSchema = new Schema({
    created: {
        type: Date
    },
    codigo: {
        type: String,
    },
    nombre: {
        type: String,
    },
    estado: {
        type: String,
        item: null
    },
});


giroNegocioSchema.pre<any>('save', function( next ) {
    this.created = new Date();
    next();
});



interface IGiroNegocio extends Document {
    created: Date,
    codigo: string;
    estado: string;
}

export const GiroNegocio = model<IGiroNegocio>('giroNegocio', giroNegocioSchema);
