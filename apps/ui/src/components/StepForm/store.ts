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
  stepId: string;
  answer: string;
  checkResult: CheckAnswerQueryResponse | null;

  // Constructor
  constructor(stepId: string) {
    this.stepId = stepId;
    this.answer = '';
    this.checkResult = null;

    makeAutoObservable(this);
  }

  // Functions
  async checkAnswer() {
    if (this.checkResult?.isCorrect === true) {
      return;
    }
    const query = await checkAnswer({ stepId: this.stepId, payload: { answer: this.answer } });
    const response = await query.json();

    this.checkResult = CheckAnswerQueryResponseSchema.parse(response);
  }
}
