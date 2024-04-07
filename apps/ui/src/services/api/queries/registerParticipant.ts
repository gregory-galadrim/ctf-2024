import { SCOREBOARD_IDENTIFIER } from 'steps';
import { z } from 'zod';
import { ApiService } from '../ApiService';

export const registerParticipant = async () => {
  try {
    return await ApiService.post(`/${SCOREBOARD_IDENTIFIER}`, { credentials: 'include' });
  } catch (error) {
    // todo handle unauthorized
    console.error('Error ', error);
    throw error;
  }
};

export const RegisterParticipantQueryResponseSchema = z.object({
  question: z.string(),
});
export type RegisterParticipantQueryResponse = z.infer<typeof RegisterParticipantQueryResponseSchema>;
