import { z } from 'zod';
import { ApiService } from '../ApiService';

type CheckAnswerProps = {
  endpoint: string;
  answer: string;
};

export const checkAnswer = async ({ endpoint, answer }: CheckAnswerProps) => {
  try {
    return await ApiService.post(endpoint, { body: JSON.stringify({ answer }) });
  } catch (error) {
    console.error('Error ', error);
    throw error;
  }
};

export const CheckAnswerQueryResponseSchema = z.object({
  message: z.string(),
  isCorrect: z.boolean(),
});
export type CheckAnswerQueryResponse = z.infer<typeof CheckAnswerQueryResponseSchema>;
