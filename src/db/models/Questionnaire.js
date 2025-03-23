// import { Schema, model } from 'mongoose';

// const questionnaireSchema = new Schema(
//   {
//     name: { type: String, required: true },
//     description: { type: String },
//     questions: [
//       {
//         type: {
//           type: String,
//           required: true,
//           enum: ['text', 'single choice', 'multiple choices'],
//         },
//         questionText: {
//           type: String,
//           required: true,
//         },
//         answer: {
//           type: String,
//         },
//         options: [{ type: String }],
//       },
//     ],
//     completions: {
//       type: Number,
//       default: 0,
//     },
//   },
//   {
//     timestamps: true,
//     versionKey: false,
//   },
// );

// export const QuestionnaireCollection = model(
//   'questionnaires',
//   questionnaireSchema,
// );

import { Schema, model } from 'mongoose';

const AnswerSchema = new Schema({
  questionId: { type: Schema.Types.ObjectId, required: true },
  questionType: { type: String, required: true }, // Тип питання: text, single, multiple
  answer: { type: Schema.Types.Mixed, required: true }, // Відповідь може бути текстом або масивом для multiple
});

const CompletionSchema = new Schema({
  answers: [AnswerSchema],
  completionTime: { type: Number, required: true }, // Час заповнення у секундах
  completedAt: { type: Date, default: Date.now }, // Коли анкета була завершена
});

const QuestionnaireSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  questions: [
    {
      questionText: { type: String, required: true },
      type: {
        type: String,
        enum: ['text', 'single choice', 'multiple choices'],
        required: true,
      }, // Типи питань
      options: { type: [String], default: [] }, // Доступні варіанти для single/multiple
    },
  ],
  completions: [CompletionSchema], // Масив з відповідями
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const QuestionnaireCollection = model(
  'questionnaires',
  QuestionnaireSchema,
);
