import { getFlagsController } from '../controllers/flags';
import express from 'express';

export default (router: express.Router) => {
   router.get('/flags', getFlagsController);
};
