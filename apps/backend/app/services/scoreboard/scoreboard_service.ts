import { mainDb } from '#services/database/main'
import { SCOREBOARD_PASSWORD } from '#services/step/constants'
import { DateTime } from 'luxon'

export default class ScoreboardService {
  async getScoreboardEntries() {
    const participants = await mainDb
      .from('users')
      .select('id', 'username', 'finished_at')
      .whereNotNull('finished_at')
      .orderBy('finished_at', 'asc')
    return participants
  }

  async registerParticipant(userId: number, password: string) {
    if (password !== SCOREBOARD_PASSWORD) {
      return {
        isCorrect: false,
        message: 'Mauvaise réponse',
      }
    }

    const participants = await this.getScoreboardEntries()

    if (participants.some((p) => p.id === userId)) {
      return {
        isCorrect: false,
        message: 'Vous êtes déjà une légende',
      }
    }

    await mainDb.from('users').where('id', userId).update({ finished_at: DateTime.now() })
    return {
      isCorrect: true,
      message: 'Inscription réussie',
    }
  }
}
