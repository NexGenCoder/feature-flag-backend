import express from 'express';
import { getProjectsController } from '../controllers/projects';

export default (router: express.Router) => {
   router.get('/projects', getProjectsController);
};
