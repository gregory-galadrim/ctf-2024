import { STEP_IDENTIFIERS, type StepIdentifier } from 'steps';
import { NotFoundPage } from '../pages/NotFound';
import { StepTwoPage } from '../pages/steps/StepTwo.tsx/StepTwo';
import { StepOnePage } from '../pages/steps/one/StepOne';

export const ROUTE_PATH_TO_ELEMENT: Record<StepIdentifier, JSX.Element> = {
  [STEP_IDENTIFIERS.One]: <StepOnePage />,
  [STEP_IDENTIFIERS.Two]: <StepTwoPage />,
  [STEP_IDENTIFIERS.Three]: <NotFoundPage />,
};
