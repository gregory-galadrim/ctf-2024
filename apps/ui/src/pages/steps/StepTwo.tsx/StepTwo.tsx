import { STEP_IDENTIFIERS } from 'steps';
import { StepForm } from '../../../components/StepForm/StepForm';
import { StepPageLayout } from '../../../components/StepPageLayout';

export const StepTwoPage = () => {
  return (
    <StepPageLayout>
      <p>
        Li4ubGllcmFwIHRzZSduIG5laXIgc2l1cGVkICx0ZWphcnQgZWwgcnVzIGZ1ZW8gZW3DqGl4dWVkIGVsIMOpc3Jldm5lciByaW92YSBlbGxlcHBhciBlbSBlSg==
      </p>
      <StepForm stepId={STEP_IDENTIFIERS.Two} />
    </StepPageLayout>
  );
};
