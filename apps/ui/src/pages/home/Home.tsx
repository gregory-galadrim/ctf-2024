import { StepPageLayout } from '../../components/StepPageLayout';

export const HomePage = () => {
  return (
    <StepPageLayout>
      <h1>Bienvenue à la chasse aux oeufs !</h1>
      <p>
        J&apos;espère que vous avez apprécié vos oeufs de la semaine dernière pour ceux qui ont eu la chance d&apos;en
        avoir.
        <br />
        De mon côté on me les a tous volés, et un esprit malicieux les a caché
      </p>
      <p>
        Le voleur m&apos;a uniquement laissé une note avec l&apos;indice suivant: &apos;rdv route
        00109116645f89f3a53977f33dde848a&apos;
      </p>
      <p>Au dos de cette note il y avait les instructions suivantes:</p>
      <ul>
        <li>
          - Les énigmes utilisent toutes la réponse précédente d&apos;une manière ou d&apos;une autre (sauf la
          première).
        </li>
        <li>- Les réponses doivent être en majuscule avant de faire de potentielles manipulations avec.</li>
      </ul>
    </StepPageLayout>
  );
};
