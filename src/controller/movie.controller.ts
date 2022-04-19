import {NextFunction, Response} from 'express';

import {IRequestExtended} from '../interfaces';
import {movieModel} from '../models/movie.model';

class MovieController {
    public async getMovies(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const movies = await movieModel.find({});

            res.json(movies);
        } catch (e: any) {
            next(e);
        }
    }

    public async setMovie(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const movie = await movieModel.create(req.body);

            res.status(201).json(movie);
        } catch (e: any) {
            next(e);
        }
    }

    public async updateMovie(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const movie = await movieModel.findByIdAndUpdate(id, req.body);

            res.status(204).json(movie);
        } catch (e: any) {
            next(e);
        }
    }
}

export const movieController = new MovieController();