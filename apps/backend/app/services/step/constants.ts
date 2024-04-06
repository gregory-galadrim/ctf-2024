import { STEP_IDENTIFIERS, StepName } from 'steps'

export type StepStrings = {
  question: string
  answer: string
  wrongAnswerMessage: string
  rightAnswerMessage: string
}

export const STEP_NAME_TO_STRINGS: Record<StepName, StepStrings> = {
  One: {
    question: 'Quel est la personne considérée comme la première à avoir programmé ?',
    answer: 'ADA LOVELACE',
    wrongAnswerMessage: 'Mauvaise réponse',
    rightAnswerMessage: `Tu as trouvé le premier oeuf !\nIl me semble que le suivant a un lien avec "${STEP_IDENTIFIERS.Two}"`,
  },
  Two: {
    question: 'Quelle est la réponse à la question précédente ?',
    answer: 'ADA LOVELACE',
    wrongAnswerMessage: 'Mauvaise réponse',
    rightAnswerMessage: `Tu as trouvé le deuxième oeuf !\nIl me semble que le suivant a un lien avec "${STEP_IDENTIFIERS.Three}"`,
  },
  Three: {
    question:
      'Quel type de routage est principalement utilisé entre les routeurs de différents opérateurs Internet de différents pays ?',
    answer: 'BGP',
    wrongAnswerMessage: 'Mauvaise réponse',
    rightAnswerMessage: `Tu as trouvé le troisième oeuf !\nIl me semble que le suivant a un lien avec "${STEP_IDENTIFIERS.Four}"`,
  },
  Four: {
    question: 'Cet oeuf est tout simplement "perdu".',
    answer: 'perdu',
    wrongAnswerMessage: 'Mauvaise réponse',
    rightAnswerMessage: `Tu as trouvé le quatrième oeuf !\nIl me semble que le suivant a un lien avec "${STEP_IDENTIFIERS.Five}"`,
  },
  Five: {
    question: `Quicky est un développeur qui fait du ecmascript/javascript dans le back-end.
Il décide de faire un procédé étrange, qui est de garder chaque nom de ses utilisateurs en tant que variable avec la date à laquelle l'utilisateur a demandé cela.

<code>var myuser = new Date();</code>

Il utilise donc une méthode très dangeureuse pour garder les noms de ses utilisateurs: eval.
Voici comment il gère cela:

<pre>
<code>function saveDate(req, res, next) {
    const user = req.body;
    if (user.length > 256) return "username too long";
    try {
        eval("var " + user + " = new Date()");
        next(); // Renvoie "OK" à la fin
    } catch(err) {
        return res.send(err)
    }
}</code>
</pre>

Cette fonction est vulnérable.
Quicky utilise le navigateur firefox, ainsi que le site google.com, qui, admettons, store le token de l'utilisateur dans le local storage.
<b>Votre but est de trouver le token de Quicky.</b>

Pour vous aider, vous avez déjà vu que Quicky avait un mot de passe très peu sécurisé pour devenir root: son nom d'utilisateur avec un chiffrement de césar de 1.

Exemple:
<code>Quicky
||||||
VVVVVV
Rvjdlz
</code>

(Q + 1 => R), (u + 1 => v), (i + 1 => j) ...


<b>Informations supplémentaires:</b>
- Le nom de l'utilisateur change à chaque requête.
- Le nom d'utilisateur est en minuscule et majuscule
- Le nom d'utilisateur n'a pas de Z/z
- <code>~/.mozilla</code> appartient à root
- <b>OS</b>: Alpine Linux (avec node et sudo d'installé)
`,
    answer: 'tkimIJrSVJRMkwFAFCdoVPyEUtjafWVJ',
    wrongAnswerMessage: 'Mauvaise réponse',
    rightAnswerMessage: 'Bravo! Tu as gagné :3',
  },
}
