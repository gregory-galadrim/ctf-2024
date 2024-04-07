import { useEffect, useState } from 'react';
import {
  LoadScoreboardQueryResponseSchema,
  Participant,
  loadScoreboard,
} from '../../services/api/queries/loadScoreboard';
import { ParticipantRow } from './ParticipantRow';

export const ParticipantList = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    loadScoreboard()
      .then((response) => response.json())
      .then((data) => setParticipants(LoadScoreboardQueryResponseSchema.parse(data)));
  }, []);

  return (
    <div>
      {participants.map((participant, index) => (
        <ParticipantRow participant={participant} rank={index + 1} key={index} />
      ))}
    </div>
  );
};
