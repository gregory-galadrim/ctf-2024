import db from '@adonisjs/lucid/services/db'

export const mainDb = db.connection('main')
