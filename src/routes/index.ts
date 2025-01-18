import express from 'express';
import health from './health';
import flags from './flags';

const router = express.Router();

export default (): express.Router => {
   flags(router);
   health(router);
   return router;
};
