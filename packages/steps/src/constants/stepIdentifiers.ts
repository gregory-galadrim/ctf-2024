export const STEP_IDENTIFIERS = {
  ONE: "00109116645f89f3a53977f33dde848a",
} as const;

export type StepName = keyof typeof STEP_IDENTIFIERS;
export type StepIdentifier = (typeof STEP_IDENTIFIERS)[StepName];
