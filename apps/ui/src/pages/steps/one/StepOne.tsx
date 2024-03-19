import { STEP_IDENTIFIERS } from 'steps';
import { StepForm } from '../../../components/StepForm/StepForm';
import { StepPageLayout } from '../../../components/StepPageLayout';

export const StepOnePage = () => {
  return (
    <StepPageLayout>
      <StepForm stepId={STEP_IDENTIFIERS.One} />
    </StepPageLayout>
  );
};
