// import type { HttpContext } from '@adonisjs/core/http'

import ScoreboardService from '#services/scoreboard/scoreboard_service'
import { inject } from '@adonisjs/core'
import { HttpContext, errors } from '@adonisjs/core/http'

@inject()
export default class ScoreboardController {
  constructor(protected scoreboardService: ScoreboardService) {}

  async getScoreboardEntries() {
    return this.scoreboardService.getScoreboardEntries()
  }

  async registerParticipant({ auth }: HttpContext) {
    const user = auth.user

    if (!user) {
      throw errors.E_HTTP_REQUEST_ABORTED
    }
    await this.scoreboardService.registerParticipant(user.id)
  }
}
