import { action, runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { StepFormStore } from './store';

type StepFormProps = {
  apiEndpoint: string;
};

export const StepForm = observer(({ apiEndpoint }: StepFormProps) => {
  // eslint-disable-next-line
  const store = useMemo(() => new StepFormStore(apiEndpoint), []);

  const handleSubmit = action(async (e: React.FormEvent) => {
    e.preventDefault();
    await store.checkAnswer();
  });

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row gap-4">
          <input
            type="text"
            name="data[answer]"
            defaultValue={store.answer}
            className="text-black"
            onChange={(e) => runInAction(() => (store.answer = e.target.value))}
          />
          <button className="text-black bg-white p-1">Valider</button>
        </div>
      </form>
      {store.checkResult ? <p className="whitespace-pre-line">{store.checkResult.message}</p> : null}
    </div>
  );
});
