import { Schema, model } from 'mongoose';

const questionnaireSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    questions: [
      {
        type: {
          type: String,
          required: true,
          enum: ['text', 'single choice', 'multiple choices'],
        },
        questionText: {
          type: String,
          required: true,
        },
        options: [{ type: String }],
      },
    ],
    completions: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const QuestionnaireCollection = model(
  'questionnaires',
  questionnaireSchema,
);
