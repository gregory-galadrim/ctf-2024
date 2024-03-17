export const STEP_IDENTIFIERS = {
  One: "00109116645f89f3a53977f33dde848a",
} as const;

export type StepName = keyof typeof STEP_IDENTIFIERS;
export type StepIdentifier = (typeof STEP_IDENTIFIERS)[StepName];

export const isStepName = (name: string): name is StepName => {
  return Object.keys(STEP_IDENTIFIERS).includes(name);
};
