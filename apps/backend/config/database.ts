import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: 'postgres',
  connections: {
    postgres: {
      client: 'pg',
      connection: {
        host: env.get('DB_HOST'),
        port: env.get('DB_PORT'),
        user: env.get('DB_USER'),
        password: env.get('DB_PASSWORD'),
        database: env.get('DB_DATABASE'),
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
    injection: {
      client: 'pg',
      connection: {
        host: env.get('INJECTION_DB_HOST'),
        port: env.get('INJECTION_DB_PORT'),
        user: env.get('INJECTION_DB_USER'),
        password: env.get('INJECTION_DB_PASSWORD'),
        database: env.get('INJECTION_DB_DATABASE'),
      },
    },
  },
})

export default dbConfig
