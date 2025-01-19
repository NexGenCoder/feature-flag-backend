import { getFlagsController, createFlagController } from '../controllers/flags';
import express from 'express';
import { validateCreateFlag } from '../middlewares/flags';

export default (router: express.Router) => {
   router.get('/flags', getFlagsController);
   router.post('/flags', validateCreateFlag, createFlagController);
};
