import { serveStatic } from '@hono/node-server/serve-static'
import type { Worker } from 'bullmq'
import type { Hono } from 'hono'
import { internalServerError, sendError } from '../libraries/rest.js'
import Routes from '../routes/index.js'
import { swaggerUI } from '@hono/swagger-ui'
import Jobs from '../app/jobs/index.js'
import logger from '../libraries/logger.js'
import { connection } from '../libraries/queue.js'

export default class Server {
    private app: Hono
    private worker?: Worker

    constructor(app: Hono) {
        this.app = app
    }

    public configure() {
        this.app.get('/', (c) => {
            return c.text('Hello Hono!')
        })

        // Static files
        this.app.use('/static/*', serveStatic({ root: './' }))

        this.app.get('/doc', swaggerUI({ title: 'API Documentation', url: '/static/openapi.yaml' }))

        this.app.notFound((c) => {
            return sendError(c, [], 'Not Found', 404)
        })

        this.app.onError((err, c) => {
            return internalServerError(c, err)
        })

        const api = this.app.basePath('/api/v1')

        // Setup routes
        const routes = new Routes(api)
        routes.configure()

        // Setup jobs
        this.registerWorker()
    }

    private registerWorker() {
        const jobs = new Jobs()
        const worker = jobs.setup()

        if (worker.isRunning()) {
            logger.info(`Worker is running`)
        }

        this.worker = worker
    }

    public async shutDownWorker() {
        await this.worker?.close()
        await connection.quit()
    }
}