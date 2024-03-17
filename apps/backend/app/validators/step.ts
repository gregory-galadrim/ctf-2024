import vine from '@vinejs/vine'

/**
 * Validates the step's check action
 */
export const checkStepValidator = vine.compile(
  vine.object({
    answer: vine.string().trim(),
  })
)
