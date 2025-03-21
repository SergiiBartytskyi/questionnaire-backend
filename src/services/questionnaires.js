import { QuestionnaireCollection } from '../db/models/Questionnaire.js';

export const getQuestionnaires = () => QuestionnaireCollection.find();

export const getQuestionnaireById = async ({ id }) => {
  const questionnaire = await QuestionnaireCollection.findOne({
    _id: id,
  });
  return questionnaire;
};

export const createQuestionnaire = async (payload) => {
  const newQuestionnaire = await QuestionnaireCollection.create(payload);
  return newQuestionnaire;
};

export const updateQuestionnaire = async ({ id }, payload, options = {}) => {
  const rawResult = await QuestionnaireCollection.findOneAndUpdate(
    { _id: id },
    payload,
    {
      ...options,
      includeResultMetadata: true,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    questionnaire: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteQuestionnaire = async ({ id }) => {
  const questionnaire = await QuestionnaireCollection.findOneAndDelete({
    _id: id,
  });

  return questionnaire;
};
