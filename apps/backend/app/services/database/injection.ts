import db from '@adonisjs/lucid/services/db'

export const injectionDb = db.connection('injection')
