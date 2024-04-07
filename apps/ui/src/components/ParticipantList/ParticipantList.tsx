import { useEffect, useMemo } from 'react';
import { ParticipantRow } from './ParticipantRow';
import { ParticipantListStore } from './store';

export const ParticipantList = () => {
  // eslint-disable-next-line
  const store = useMemo(() => new ParticipantListStore(), []);

  useEffect(() => {
    store.loadParticipantList();
  }, [store]);

  const participants = useMemo(() => store.participants, [store.participants]);

  console.log(store.participants);

  if (store.isLoading) {
    return <p>Chargement en cours...</p>;
  }

  if (!participants) {
    return <></>;
  }

  return (
    <div>
      {participants.map((participant, index) => (
        <ParticipantRow participant={participant} rank={index + 1} key={index} />
      ))}
    </div>
  );
};
