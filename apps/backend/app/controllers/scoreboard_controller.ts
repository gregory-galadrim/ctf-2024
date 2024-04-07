// import type { HttpContext } from '@adonisjs/core/http'

import ScoreboardService from '#services/scoreboard/scoreboard_service'
import { scoreboardRegistrationValidator } from '#validators/scoreboard'
import { inject } from '@adonisjs/core'
import { HttpContext, errors } from '@adonisjs/core/http'

@inject()
export default class ScoreboardController {
  constructor(protected scoreboardService: ScoreboardService) {}

  async getScoreboardEntries() {
    return this.scoreboardService.getScoreboardEntries()
  }

  async registerParticipant({ request, auth }: HttpContext) {
    const user = auth.user
    const data = request.all()
    const { password } = await scoreboardRegistrationValidator.validate(data)

    if (!user) {
      throw errors.E_HTTP_REQUEST_ABORTED
    }
    return this.scoreboardService.registerParticipant(user.id, password)
  }
}
