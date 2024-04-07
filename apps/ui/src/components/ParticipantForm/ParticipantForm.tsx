import { useState } from 'react';
import {
  RegisterParticipantQueryResponseSchema,
  registerParticipant,
} from '../../services/api/queries/registerParticipant';

export const ParticipantForm = () => {
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    registerParticipant({ payload: { password } })
      .then((response) => response.json())
      .then((data) => setMessage(RegisterParticipantQueryResponseSchema.parse(data).message));
  };

  return (
    <div className="flex flex-col gap-4">
      <p>Pour vous enregistrer, entrez toutes les réponses concaténées dans l&apos;ordre.</p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row gap-4">
          <input
            type="text"
            name="data[answer]"
            defaultValue={password}
            className="text-black"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="text-black bg-white p-1">Valider</button>
        </div>
      </form>
      {message}
    </div>
  );
};
