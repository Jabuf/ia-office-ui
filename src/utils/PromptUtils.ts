export default abstract class PromptUtils {
  static prompts = [
    'Je veux pouvoir lister mes dépenses en vacances.',
    'Je veux un fichier pour suivre les ventes de mes commerciaux chaque mois.',
  ]

  static getRandomPrompt(): string {
    return PromptUtils.prompts[
      Math.round(Math.random() * (PromptUtils.prompts.length - 1))
    ]
  }
}
