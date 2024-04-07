import { Participant } from '../../services/api/queries/loadScoreboard';

type ParticipantRowProps = {
  rank: number;
  participant: Participant;
};

export const ParticipantRow = ({ participant, rank }: ParticipantRowProps) => {
  console.log('call greg');
  const { username, finished_at } = participant;

  console.log(`${rank}. ${username}, a terminé le ${finished_at.toString()}`);
  return (
    <p>
      {rank}. {username}, a terminé le {finished_at.toString()}
    </p>
  );
};
