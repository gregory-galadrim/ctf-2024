import { STEP_IDENTIFIERS } from 'steps';
import { StepForm } from '../../../components/StepForm/StepForm';
import { StepPageLayout } from '../../../components/StepPageLayout';

export const StepThreePage = () => {
  return (
    <StepPageLayout>
      <StepForm stepId={STEP_IDENTIFIERS.Three} />
    </StepPageLayout>
  );
};
