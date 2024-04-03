import { STEP_IDENTIFIERS } from 'steps';
import { StepForm } from '../../../components/StepForm/StepForm';
import { StepPageLayout } from '../../../components/StepPageLayout';

export const StepFourPage = () => {
  return (
    <StepPageLayout>
      <StepForm stepId={STEP_IDENTIFIERS.Four} />
    </StepPageLayout>
  );
};
