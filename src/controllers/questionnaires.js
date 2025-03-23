import createHttpError from 'http-errors';
import * as questionnaireServices from '../services/questionnaires.js';

export const getQuestionnaireController = async (req, res) => {
  const questionnaires = await questionnaireServices.getQuestionnaires();

  res.json({
    status: 200,
    message: 'Successfully found questionnaires!',
    data: questionnaires,
  });
};

export const getQuestionnaireByIdController = async (req, res) => {
  const { id } = req.params;

  const questionnaire = await questionnaireServices.getQuestionnaireById({
    id,
  });

  res.json({
    status: 200,
    message: 'Successfully found a questionnaire!',
    data: questionnaire,
  });
};

export const createQuestionnaireController = async (req, res, next) => {
  const { name, description, questions } = req.body;

  if (!name) {
    return next(createHttpError(400, 'Required field: name!'));
  }

  const newQuestionnaire = await questionnaireServices.createQuestionnaire({
    name,
    description,
    questions,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a questionnaire!',
    data: newQuestionnaire,
  });
};

export const upsertQuestionnaireController = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const result = await questionnaireServices.updateQuestionnaire(
    { id },
    {
      ...req.body,
    },
    {
      upsert: true,
    },
  );

  if (!result) {
    return next(createHttpError(404, 'Questionnaire not found!'));
  }

  if (result.isNew) {
    if (!name) {
      return next(
        createHttpError(400, 'Name is required when creating a questionnaire!'),
      );
    }
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: result.isNew
      ? 'Successfully created a questionnaire!'
      : 'Successfully updated the questionnaire!',
    data: result.questionnaire,
  });
};

export const completeQuestionnaireController = async (req, res, next) => {
  const { id } = req.params;
  const { answers, completionTime } = req.body;
  // console.log('id :>> ', id);
  // console.log('req.body :>> ', req.body);
  // console.log('answers :>> ', answers);
  // console.log('completionTime :>> ', completionTime);

  const questionnaire = await questionnaireServices.completeQuestionnaire(
    id,
    answers,
    completionTime,
  );

  // console.log('questionnaire :>> ', questionnaire);
  if (!questionnaire) {
    return next(createHttpError(404, 'Questionnaire not found'));
  }

  res.status(201).json({
    status: 201,
    message: 'Questionnaire submitted successfully',
    data: questionnaire,
  });
};
export const deleteQuestionnaireController = async (req, res, next) => {
  const { id } = req.params;

  const questionnaire = await questionnaireServices.deleteQuestionnaire({ id });

  if (!questionnaire) {
    return next(createHttpError(404, 'Questionnaire not found!'));
  }

  res.status(204).send();
};
