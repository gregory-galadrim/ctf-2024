import { makeAutoObservable } from 'mobx';
import {
  LoadScoreboardQueryResponseSchema,
  Participant,
  loadScoreboard,
} from '../../services/api/queries/loadScoreboard';

/**
 * ParticipantListStore
 *
 * The MOBX store of ParticipantList
 */
export class ParticipantListStore {
  // Properties
  isLoading: boolean;
  participants: Participant[] | null;

  // Constructor
  constructor() {
    this.isLoading = false;
    this.participants = null;

    makeAutoObservable(this);
  }

  // Functions

  async loadParticipantList() {
    this.setIsLoading(true);
    const query = await loadScoreboard();
    const response = await query.json();

    this.setParticipantList(LoadScoreboardQueryResponseSchema.parse(response));
    this.setIsLoading(false);
  }

  setParticipantList(value: Participant[]) {
    this.participants = value;
  }

  setIsLoading(value: boolean) {
    this.isLoading = value;
  }
}
