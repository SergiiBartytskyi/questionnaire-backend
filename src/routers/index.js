import { Router } from 'express';
import greetingRouter from './greeting.js';
import questionnairesRouter from './questionnaires.js';

const router = Router();

router.use('/', greetingRouter);
router.use('/questionnaires', questionnairesRouter);

export default router;
