import { ParticipantForm } from '../../components/ParticipantForm/ParticipantForm';
import { ParticipantList } from '../../components/ParticipantList/ParticipantList';
import { StepPageLayout } from '../../components/StepPageLayout';

export const ScoreboardPage = () => {
  return (
    <StepPageLayout>
      <ParticipantList />
      <ParticipantForm />
    </StepPageLayout>
  );
};
