import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { tracing } from './middleware/tracing.js'
import { compress } from 'hono/compress'
import { logger as httpLogger } from 'hono/logger'
import { showRoutes } from 'hono/dev'
import { trimTrailingSlash } from 'hono/trailing-slash'
import Server from './server/index.js'
import env from './config/env.js'
import logger from './libraries/logger.js'
import Cache from './libraries/cache.js'

const app = new Hono()

app.use(cors())
app.use(tracing)
app.use(compress())
app.use(httpLogger())
app.use(trimTrailingSlash())

const server = new Server(app)
server.configure()

console.log('Available routes')
showRoutes(app, { colorize: true })

const port = env.PORT
logger.info(`Server is running on http://localhost:${port}, env: ${env.NODE_ENV}`)

const web = serve({ fetch: app.fetch, port })

process.on('SIGINT', () => {
  logger.info('SIGINT signal received: closing HTTP server')

  logger.info('Closing HTTP server')
  web.close(async () => {
    logger.info('Clearing cache...')
    await Cache.clear()

    logger.info('Exiting...')
    process.exit(0)
  })
})