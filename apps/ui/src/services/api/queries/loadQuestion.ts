import { z } from 'zod';
import { ApiService } from '../ApiService';

type LoadQuestionProps = {
  stepId: string;
};

export const loadQuestion = async ({ stepId }: LoadQuestionProps) => {
  try {
    return await ApiService.get(`/${stepId}`, { credentials: 'include' });
  } catch (error) {
    console.error('Error ', error);
    throw error;
  }
};

export const LoadQuestionQueryResponseSchema = z.object({
  question: z.string(),
});
export type LoadQuestionQueryResponse = z.infer<typeof LoadQuestionQueryResponseSchema>;
