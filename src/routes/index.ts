import express from 'express';
import health from './health';
import flags from './flags';
import projects from './projects';

const router = express.Router();

export default (): express.Router => {
   projects(router);
   flags(router);
   health(router);
   return router;
};
