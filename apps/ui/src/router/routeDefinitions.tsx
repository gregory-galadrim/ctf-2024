import { STEP_IDENTIFIERS, type StepIdentifier } from 'steps';
import { StepTwoPage } from '../pages/steps/StepTwo.tsx/StepTwo';
import { StepOnePage } from '../pages/steps/one/StepOne';

export const ROUTE_PATH_TO_ELEMENT: Record<StepIdentifier, JSX.Element> = {
  [STEP_IDENTIFIERS.One]: <StepOnePage />,
  [STEP_IDENTIFIERS.Two]: <StepTwoPage />,
};
