import express from 'express';
import asyncHandler from 'express-async-handler';
import { getPopularPeople } from '../tmdb-api';
import { getActor } from '../tmdb-api';

const router = express.Router();

// actor routes to be added
router.get('/popular', asyncHandler(async (req, res) => {
    const popular = await getPopularPeople();
    res.status(200).json(popular);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const actor = await getActor(req.params.id);
    res.status(200).json(actor);
}));

export default router;
