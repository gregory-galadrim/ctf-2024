import { z } from 'zod';
import { ApiService } from '../ApiService';

type CheckAnswerProps = {
  stepId: string;
  payload: { answer: string };
};

export const checkAnswer = async ({ stepId, payload }: CheckAnswerProps) => {
  return await ApiService.post(`/${stepId}`, { body: JSON.stringify(payload) });
};

export const CheckAnswerQueryResponseSchema = z.object({
  message: z.string(),
  isCorrect: z.boolean(),
});
export type CheckAnswerQueryResponse = z.infer<typeof CheckAnswerQueryResponseSchema>;
