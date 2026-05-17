import express from 'express';
import WatchlistMovies from './watchlistMovieModel';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/', async (req, res) => {
    const WatchlistMovies = await WatchlistMovies.find({ userId: `${req.user._id}`});
    res.status(200).json(WatchlistMovies);
});



// Add a watchlist movie
router.post('/', asyncHandler(async (req, res) => {
    const newWatchlistMovie = req.body;
    newWatchlistMovie.userId = req.user._id;
    const watchlistMovie = await WatchlistMovies(newWatchlistMovie).save();
    res.status(201).json(watchlistMovie);
}));

router.delete('/:id', async (req, res) => {
    const result = await WatchlistMovies.deleteOne({
        movieId: req.params.id,
    });
    if (result.deletedCount) {
        res.status(204).json();
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to find Watchlist Movie' });
    }
});

export default router