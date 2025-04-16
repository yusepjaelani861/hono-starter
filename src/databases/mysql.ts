import type { Logger as drizzleLogger } from 'drizzle-orm/logger'
import logger from '../libraries/logger.js'
import mysql from 'mysql2/promise'
import env from '../config/env.js'
import { drizzle } from 'drizzle-orm/mysql2'
import * as schema from './schemas/index.js'

const DB_ERRORS = {
    DUPLICATE_KEY: 'ER_DUP_ENTRY',
}

export interface DatabaseError {
    type: string
    message: string
    stack?: string
    code: string
    errno: number
    sql: string
    sqlState: string
    sqlMessage: string
}

class DBLogger implements drizzleLogger {
    logQuery(query: string, params: unknown[]): void {
        logger.debug({ query, params })
    }
}

const pool = mysql.createPool({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    port: Number(env.DB_PORT),
    connectionLimit: 100,
    queueLimit: 0,
    keepAliveInitialDelay: 0,
    enableKeepAlive: true
})

const db = drizzle(pool, {
    schema: schema,
    mode: 'default',
    logger: new DBLogger(),
})

export { db, DB_ERRORS }