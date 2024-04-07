import { makeAutoObservable } from 'mobx';
import { registerParticipant } from '../../services/api/queries/registerParticipant';

/**
 * ParticipantFormStore
 *
 * The MOBX store of ParticipantForm
 */
export class ParticipantStore {
  // Properties
  isLoading: boolean;

  // Constructor
  constructor() {
    this.isLoading = false;

    makeAutoObservable(this);
  }

  // Functions

  async registerParticipant() {
    this.setIsLoading(true);

    await registerParticipant();

    this.setIsLoading(false);
  }

  setIsLoading(value: boolean) {
    this.isLoading = value;
  }
}
