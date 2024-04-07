import { SCOREBOARD_IDENTIFIER } from 'steps';
import { z } from 'zod';
import { ApiService } from '../ApiService';

export const loadScoreboard = async () => {
  try {
    return await ApiService.get(`/${SCOREBOARD_IDENTIFIER}`, { credentials: 'include' });
  } catch (error) {
    // todo handle unauthorized
    console.error('Error ', error);
    throw error;
  }
};

export const LoadScoreboardQueryResponseSchema = z.array(
  z.object({
    username: z.string(),
    finished_at: z.coerce.date(),
  }),
);
export type LoadScoreboardQueryResponse = z.infer<typeof LoadScoreboardQueryResponseSchema>;
export type Participant = LoadScoreboardQueryResponse[number];
