// import type { HttpContext } from '@adonisjs/core/http'

import { inject } from '@adonisjs/core'

@inject()
export default class ScoreboardController {
  constructor() {}

  getScoreboardEntries() {
    return []
  }

  registerParticipant() {
    return
  }
}
