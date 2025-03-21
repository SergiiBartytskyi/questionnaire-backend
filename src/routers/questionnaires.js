import { Router } from 'express';
import * as controllers from '../controllers/questionnaires.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(controllers.getQuestionnaireController));
router.get('/:id', ctrlWrapper(controllers.getQuestionnaireByIdController));
router.post('/', ctrlWrapper(controllers.createQuestionnaireController));
router.put('/:id', ctrlWrapper(controllers.upsertQuestionnaireController));
router.delete('/:id', ctrlWrapper(controllers.deleteQuestionnaireController));

export default router;
