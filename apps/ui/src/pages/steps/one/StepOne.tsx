import { observer } from 'mobx-react-lite';
import { STEP_IDENTIFIERS } from 'steps';
import { StepForm } from '../../../components/StepForm/StepForm';
import { StepPageLayout } from '../../../components/StepPageLayout';

export const StepOnePage = observer(() => {
  return (
    <StepPageLayout>
      <p>Qui est la personne considérée comme la première à avoir programmé ?</p>
      <StepForm apiEndpoint={STEP_IDENTIFIERS.One} />
    </StepPageLayout>
  );
});
