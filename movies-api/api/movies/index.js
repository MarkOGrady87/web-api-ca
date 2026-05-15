import express from 'express';
import asyncHandler from 'express-async-handler';
import { getMovies } from '../tmdb-api';
import { getUpcomingMovies } from '../tmdb-api'; 
import { getTopRatedMovies } from '../tmdb-api';
import { getPopularMovies } from '../tmdb-api';
import { getNowPlayingMovies } from '../tmdb-api';
import { getMovie } from '../tmdb-api';
import { getGenres } from '../tmdb-api';
import { getMovieImages } from '../tmdb-api';
import { getMovieReviews } from '../tmdb-api';
import { getMovieCredits } from '../tmdb-api';
import { getSimilarMovies } from '../tmdb-api';

const router = express.Router();

// movie routes to be added
router.get('/discover/:pageId', asyncHandler(async (req, res) => {
    const discoverMovies = await getMovies(req.params.pageId);
    res.status(200).json(discoverMovies);
}));

router.get('/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

router.get('/top_rated/:pageId', asyncHandler(async (req, res) => {
    const topRatedMovies = await getTopRatedMovies(req.params.pageId);
    res.status(200).json(topRatedMovies);
}));

router.get('/popular/:pageId', asyncHandler(async (req, res) => {
    const popularMovies = await getPopularMovies(req.params.pageId);
    res.status(200).json(popularMovies);
}));

router.get('/now_playing', asyncHandler(async (req, res) => {
    const nowPlayingMovies = await getNowPlayingMovies();
    res.status(200).json(nowPlayingMovies);
}));

router.get('/genre', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const movie = await getMovie(req.params.id);
    res.status(200).json(movie);
}));

router.get('/:id/images', asyncHandler(async (req, res) => {
    const movieImages = await getMovieImages(req.params.id);
    res.status(200).json(movieImages);
}));

router.get('/:id/reviews', asyncHandler(async (req, res) => {
    const movieReviews = await getMovieReviews(req.params.id);
    res.status(200).json(movieReviews);
}));

router.get('/:id/credits', asyncHandler(async (req, res) => {
    const movieCredits = await getMovieCredits(req.params.id);
    res.status(200).json(movieCredits);
}));

router.get('/:id/similar', asyncHandler(async (req, res) => {
    const movieSimilar = await getSimilarMovies(req.params.id);
    res.status(200).json(movieSimilar);
}));

export default router;
