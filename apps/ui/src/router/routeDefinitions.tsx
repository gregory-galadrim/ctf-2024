import { STEP_IDENTIFIERS, type StepIdentifier } from 'steps';
import { StepFourPage } from '../pages/steps/four/StepFour';
import { StepOnePage } from '../pages/steps/one/StepOne';
import { StepThreePage } from '../pages/steps/three/StepThree';
import { StepTwoPage } from '../pages/steps/two/StepTwo';
import { StepFivePage } from '../pages/steps/five/StepFive';

export const ROUTE_PATH_TO_ELEMENT: Record<StepIdentifier, JSX.Element> = {
  [STEP_IDENTIFIERS.One]: <StepOnePage />,
  [STEP_IDENTIFIERS.Two]: <StepTwoPage />,
  [STEP_IDENTIFIERS.Three]: <StepThreePage />,
  [STEP_IDENTIFIERS.Four]: <StepFourPage />,
  [STEP_IDENTIFIERS.Five]: <StepFivePage />,
};
