import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
    PORT: z.coerce.number().default(3000),
    NODE_ENV: z.enum(['development', 'test', 'production']),
    LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
    SECRET_KEY: z.string().default('secret'),
    DB_HOST: z.string().default('localhost'),
    DB_PORT: z.coerce.number().default(3306),
    DB_USER: z.string().default('user'),
    DB_PASSWORD: z.string().default(''),
    DB_NAME: z.string().default('database'),
    REDIS_HOST: z.string().default('localhost'),
    REDIS_PORT: z.coerce.number().default(6379),
    REDIS_PASSWORD: z.string().default(''),
    MAIL_HOST: z.string().default('localhost'),
    MAIL_PORT: z.coerce.number().default(587),
    MAIL_SECURE: z.string().default('false').transform((val) => val === 'true'),
    MAIL_USER: z.string().default('user'),
    MAIL_PASSWORD: z.string().default('password'),
    MAIL_FROM: z.string().default(''),
    MAIL_SENDER: z.string().default(''),
    FRONTEND_URL: z.string().default('http://localhost:3000'),
})

export default envSchema.parse(process.env)