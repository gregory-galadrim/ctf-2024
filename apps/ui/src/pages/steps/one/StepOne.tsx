import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { StepOneStore } from './store';

export const StepOnePage = observer(() => {
  const store = useMemo(() => new StepOneStore(), []);

  console.log(store);

  return <>StepOne</>;
});
