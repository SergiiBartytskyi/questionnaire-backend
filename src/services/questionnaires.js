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

export const completeQuestionnaire = async (id, answers, completionTime) => {
  console.log('id:>> ', id);
  console.log('answers:>> ', answers);
  console.log('completionTime :>> ', completionTime);

  const questionnaire = await QuestionnaireCollection.findById(id);
  console.log('questionnaire before:>> ', questionnaire);
  questionnaire.completions.push({ answers, completionTime });
  questionnaire.updatedAt = new Date(); // Оновлюємо дату
  questionnaire.completionsCount = questionnaire.completions.length;

  // console.log('questionnaire.completions:>> ', questionnaire.completions);
  // await questionnaire.save();
  // console.log('questionnaire after:>> ', questionnaire);
  await questionnaire.save();
  return questionnaire;
};

export const deleteQuestionnaire = async ({ id }) => {
  const questionnaire = await QuestionnaireCollection.findOneAndDelete({
    _id: id,
  });

  return questionnaire;
};
