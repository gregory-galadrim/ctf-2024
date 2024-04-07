import { SCOREBOARD_IDENTIFIER } from 'steps';
import { z } from 'zod';
import { ApiService } from '../ApiService';

type RegisterParticipantProps = {
  payload: { password: string };
};

export const registerParticipant = async ({ payload }: RegisterParticipantProps) => {
  try {
    return await ApiService.post(`/${SCOREBOARD_IDENTIFIER}`, {
      credentials: 'include',
      body: JSON.stringify(payload),
    });
  } catch (error) {
    // todo handle unauthorized
    console.error('Error ', error);
    throw error;
  }
};

export const RegisterParticipantQueryResponseSchema = z.object({
  message: z.string(),
  isCorrect: z.boolean(),
});
export type RegisterParticipantQueryResponse = z.infer<typeof RegisterParticipantQueryResponseSchema>;
