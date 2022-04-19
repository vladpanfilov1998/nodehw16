import {Schema, model} from 'mongoose';

const genreSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },

}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
});

export const genreModel = model('genre', genreSchema);