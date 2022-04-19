import {Schema, model} from 'mongoose';
import {genreModel} from './genre.model';

const movieSchema = new Schema({
    title: {
        type: String,
        trim: true,
    },
    imdb_id: {
        type: String,
        trim: true,
        unique: true,
    },
    genres: [
        {
            type: Schema.Types.ObjectId,
            ref: genreModel,
        },
    ],

}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
});

export const movieModel = model('movie', movieSchema);