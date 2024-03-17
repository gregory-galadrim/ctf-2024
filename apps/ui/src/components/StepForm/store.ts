import { makeAutoObservable } from 'mobx';
import {
  CheckAnswerQueryResponse,
  CheckAnswerQueryResponseSchema,
  checkAnswer,
} from '../../services/api/queries/checkAnswer';

/**
 * StepFormStore
 *
 * The MOBX store of StepForm
 */
export class StepFormStore {
  // Properties
  apiEndpoint: string;
  answer: string;
  checkResult: CheckAnswerQueryResponse | null;

  // Constructor
  constructor(apiEndpoint: string) {
    this.apiEndpoint = apiEndpoint;
    this.answer = '';
    this.checkResult = null;

    makeAutoObservable(this);
  }

  // Functions
  async checkAnswer() {
    if (this.checkResult?.isCorrect === true) {
      return;
    }
    const query = await checkAnswer({ endpoint: this.apiEndpoint, answer: this.answer });
    const response = await query.json();

    this.checkResult = CheckAnswerQueryResponseSchema.parse(response);
  }
}
