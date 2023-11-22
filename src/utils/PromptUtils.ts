export default abstract class PromptUtils {
  static prompts = [
    `Je veux un tableau pour suivre la masse salariale de mon entreprise sur 12 mois. Sur ce tableau je veux voir apparaître le salaire brut et les charges patronales ainsi que le poste, pour mes 7 employés. Je veux une ligne de total.
Je veux également une feuille récapitulant les dépenses pour chaque poste.`,
    `Je veux un tableau de bord contenant une feuille pour chaque mois.
Sur chaque feuille je veux un tableau me permettant de comparer mes résultats de l'année en cours avec l'année précédente, il est impératif d'avoir une ligne pour chaque jour.
Je veux également une feuille de récap.`,
    `Je veux une feuille avec des tableau par différent taux de TVA. Les taux de TVAs sont 20%, 2,1%, 5,5% et 10%. Je veux également une feuille avec un tableau récapitulatif.
Chaque tableau devra contenir la valeur des stocks avec en ligne le mois et en colonne l'année et ce pour une entière année civile.`,
  ]

  static getRandomPrompt(): string {
    return PromptUtils.prompts[
      Math.round(Math.random() * (PromptUtils.prompts.length - 1))
    ]
  }
}
