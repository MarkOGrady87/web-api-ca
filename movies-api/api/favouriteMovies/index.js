import express from 'express';
import FavouriteMovies from './favouriteMovieModel'
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/', async (req, res) => {
    const favouriteMovies = await FavouriteMovies.find({ userId: `${req.user._id}`});
    res.status(200).json(favouriteMovies);
});



// Add a favourite movie
router.post('/', asyncHandler(async (req, res) => {
    const newFavouriteMovie = req.body;
    newFavouriteMovie.userId = req.user._id;
    const favouriteMovie = await FavouriteMovies(newFavouriteMovie).save();
    res.status(201).json(favouriteMovie);
}));

router.delete('/:id', async (req, res) => {
    const result = await FavouriteMovies.deleteOne({
        movieId: req.params.id,
    });
    if (result.deletedCount) {
        res.status(204).json();
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to find Favourite Movie' });
    }
});

export default router