import dotenv from 'dotenv'
dotenv.config()
import { defineConfig } from 'drizzle-kit'

const config = defineConfig({
    schema: './src/databases/schemas/index.ts',
    out: './src/databases/migrations',
    dialect: 'mysql',
    dbCredentials: {
        host: process.env.DB_HOST ?? 'localhost',
        port: Number(process.env.DB_PORT ?? 3306),
        user: process.env.DB_USER ?? 'root',
        password: process.env.DB_PASSWORD ?? '',
        database: process.env.DB_NAME ?? 'test',
    },
    verbose: true,
    strict: false
})

export default config