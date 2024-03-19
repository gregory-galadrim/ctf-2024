import { action, runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';
import { StepFormStore } from './store';

type StepFormProps = {
  stepId: string;
};

export const StepForm = observer(({ stepId }: StepFormProps) => {
  // eslint-disable-next-line
  const store = useMemo(() => new StepFormStore(stepId), []);

  const handleSubmit = action(async (e: React.FormEvent) => {
    e.preventDefault();
    await store.checkAnswer();
  });

  useEffect(() => {
    store.loadQuestion();
  }, [store]);

  const question = useMemo(() => {
    return store.isLoading ? 'Chargement en cours...' : store.question;
  }, [store.isLoading, store.question]);

  return (
    <>
      <p>{question}</p>
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
    </>
  );
});
