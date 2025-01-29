import express from 'express';
import { posturlShortener, geturlShortener } from '../controller/url.mjs';

const router = express.Router();

router.post('/shorten', posturlShortener);
router.get('/:shortId', geturlShortener);

export default router;
