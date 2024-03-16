import { STEP_IDENTIFIERS, type StepIdentifier } from 'steps';
import { StepOnePage } from '../pages/steps/one/StepOne';

export const ROUTE_PATH_TO_ELEMENT: Record<StepIdentifier, JSX.Element> = {
  [STEP_IDENTIFIERS.ONE]: <StepOnePage />,
};
