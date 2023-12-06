import { FileType } from '../components/base/GoogleIcon'

export default abstract class PromptUtils {
  static promptsSheets = [
    `Je veux un tableau pour suivre la masse salariale de mon entreprise sur 12 mois. Sur ce tableau je veux voir apparaître le salaire brut et les charges patronales ainsi que le poste, pour mes 7 employés. Je veux une ligne de total.
Je veux également une feuille récapitulant les dépenses pour chaque poste.`,
    `Je veux un tableau de bord contenant une feuille pour chaque mois.
Sur chaque feuille je veux un tableau me permettant de comparer mes résultats de l'année en cours avec l'année précédente, il est impératif d'avoir une ligne pour chaque jour.
Je veux également une feuille de récap.`,
    `Je veux une feuille avec des tableau par différent taux de TVA. Les taux de TVAs sont 20%, 2,1%, 5,5% et 10%. Je veux également une feuille avec un tableau récapitulatif.
Chaque tableau devra contenir la valeur des stocks avec en ligne le mois et en colonne l'année et ce pour une entière année civile.`,
  ]

  static promptsDocs = [
    `Je veux écrire une procédure de réception physique des colis de mon entreprise avec comptage obligatoire des colis avant signature du bon de livraison.
    Les salariés doivent ensuite mettre les cartons dans une zone d'attente et commencer le déballage des produits et l'enregistrement de ceci dans le logiciel de gestion du stock.`,
    `Je veux écrire une note de service sur les mesures anti covid à respecter et pourquoi il est important de les respecter.
    Cette note de service sera envoyée par mail à tous les salariés.`,
    `Je veux écrire une lettre aux impôts pour demander un délai de paiement pour mes impôts fonciers. Je suis localisé en France.`,
    `J'aimerai une présentation exhaustive de la société IBM.`,
  ]

  static promptsSlides = [
    `Exemple 1 de prompt pour un fichier slides`,
    `Exemple 2 de prompt pour un fichier slides`,
  ]

  static getRandomPrompt(fileType: FileType): string {
    const prompts =
      fileType === 'docs'
        ? this.promptsDocs
        : fileType === 'sheets'
        ? this.promptsSheets
        : this.promptsSlides
    return prompts[Math.round(Math.random() * (prompts.length - 1))]
  }
}
