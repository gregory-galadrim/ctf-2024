import { makeAutoObservable } from 'mobx';
import {
  CheckAnswerQueryResponse,
  CheckAnswerQueryResponseSchema,
  checkAnswer,
} from '../../services/api/queries/checkAnswer';
import { LoadQuestionQueryResponseSchema, loadQuestion } from '../../services/api/queries/loadQuestion';

/**
 * StepFormStore
 *
 * The MOBX store of StepForm
 */
export class StepFormStore {
  // Properties
  stepId: string;
  answer: string;
  question: string | null;
  checkResult: CheckAnswerQueryResponse | null;
  isLoading: boolean;

  // Constructor
  constructor(stepId: string) {
    this.question = null;
    this.stepId = stepId;
    this.answer = '';
    this.checkResult = null;
    this.isLoading = false;

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

  async loadQuestion() {
    this.isLoading = true;
    const query = await loadQuestion({ stepId: this.stepId });
    const response = await query.json();

    this.question = LoadQuestionQueryResponseSchema.parse(response).question;
    this.isLoading = false;
  }
}
