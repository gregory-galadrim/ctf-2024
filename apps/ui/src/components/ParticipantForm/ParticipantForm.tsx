import { action } from 'mobx';
import { useMemo } from 'react';
import { ParticipantStore } from './store';

export const ParticipantForm = () => {
  // eslint-disable-next-line
  const store = useMemo(() => new ParticipantStore(), []);

  const handleSubmit = action(async (e: React.FormEvent) => {
    e.preventDefault();
    await store.registerParticipant();
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row gap-4">
          <button className="text-black bg-white p-1">Valider</button>
        </div>
      </form>
    </div>
  );
};
