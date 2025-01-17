import express from 'express';
const router = express.Router();
import helloRouter from './hello';
router.use('/hello', helloRouter);

export default router;
