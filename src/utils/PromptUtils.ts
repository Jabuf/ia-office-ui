export default abstract class PromptUtils {
  static promptsSheets = {
    instructions: [
      `Je veux un tableau pour suivre la masse salariale de mon entreprise sur 12 mois. Sur ce tableau je veux voir apparaître le salaire brut et les charges patronales ainsi que le poste, pour mes 7 employés. Je veux une ligne de total.
    Je veux également une feuille récapitulant les dépenses pour chaque poste.`,
      `Je veux une feuille avec des tableau par différent taux de TVA. Les taux de TVAs sont 20%, 2,1%, 5,5% et 10%. Je veux également une feuille avec un tableau récapitulatif.
    Chaque tableau devra contenir la valeur des stocks avec en ligne le mois et en colonne l'année et ce pour une entière année civile.`,
    ],
    assisted: [
      `Je veux un fichier de suivi de chiffre d'affaire jour par jour pour le mois de janvier`,
      `Je pars en vacances en Irlande du 01/12 au 15/12 et souhaite suivre mes dépenses durant mon séjour.`,
      `Je suis un DPO et je souhaite envoyer un fichier à la CNIL dans le cadre du RGPD.`,
      `Je souhaite suivre mes frais réel de l'année afin de les déduire de mes impots.`,
    ],
  }

  static promptsDocs = {
    letter: [
      `Je veux écrire une lettre pour obtenir une autorisation pour des travaux dans mon appartement à mon syndic de copropriété.`,
    ],
    mail: [
      `Je souhaite informer mes collègues de la fermeture de l’agence pendant les fêtes de fin d’années.`,
    ],
    block: [
      `Je veux écrire une note de service sur les mesures anti covid à respecter et pourquoi il est important de les respecter.
    Cette note de service à pour but d'être affichée publiquement au sein des locaux.
    Mon entreprise est une pharmacie basée en France.`,
    ],
    presentation: [`Je veux écrire une présentation sur l'entreprise IBM.`],
  }

  static promptsSlides = [
    `Exemple 1 de prompt pour un fichier slides`,
    `Exemple 2 de prompt pour un fichier slides`,
  ]
}
