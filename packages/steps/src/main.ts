export const STEP_IDENTIFIERS = {
  One: "00109116645f89f3a53977f33dde848a",
  Two: "eac06c2687741faa3ee2ea8379462047",
  Three: "0729c48f988b05921857c1214c94f6f5",
} as const;

export type StepName = keyof typeof STEP_IDENTIFIERS;
export type StepIdentifier = (typeof STEP_IDENTIFIERS)[StepName];

export const isStepName = (name: string): name is StepName => {
  return Object.keys(STEP_IDENTIFIERS).includes(name);
};
