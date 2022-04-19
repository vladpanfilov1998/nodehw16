import { Router } from 'express';
import { movieController } from '../controller/movie.controller';

const router = Router();

router.get('/', movieController.getMovies);
router.post('/', movieController.setMovie);
router.patch('/:id', movieController.updateMovie);

export const movieRouter = router;