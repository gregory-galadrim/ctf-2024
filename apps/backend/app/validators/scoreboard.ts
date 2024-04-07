import vine from '@vinejs/vine'

/**
 * Validates the step's check action
 */
export const scoreboardRegistrationValidator = vine.compile(
  vine.object({
    password: vine.string().trim(),
  })
)
