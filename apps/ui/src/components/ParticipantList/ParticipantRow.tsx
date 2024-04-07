import { Participant } from '../../services/api/queries/loadScoreboard';

type ParticipantRowProps = {
  rank: number;
  participant: Participant;
};

export const ParticipantRow = ({ participant, rank }: ParticipantRowProps) => {
  const { username, finished_at } = participant;
  const formattedDate = `${finished_at.toLocaleDateString()} à ${finished_at.getHours()}:${finished_at.getMinutes()}:${finished_at.getSeconds()}`;

  return (
    <p>
      {rank}. {username}, a terminé le {formattedDate}
    </p>
  );
};
