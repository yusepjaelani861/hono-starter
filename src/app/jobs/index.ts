import { Job, Worker } from 'bullmq'
import { QUEUE, connection } from '../../libraries/queue.js'
import logger from '../../libraries/logger.js'

export const TASK = {}

export default class Jobs {
    public setup(): Worker {
        const worker = new Worker(QUEUE.default, this.processor, { connection })

        worker.on('completed', async (job: Job) => {
            logger.info(`Job ${job.id} completed! Task: ${job.name}`)

            await job.remove()
            logger.info(`Job ${job.id} removed!`)
        })

        worker.on('failed', (job: Job | undefined, err: Error) => {
            if (job) {
                logger.error(`Job ${job.id} failed! Task: ${job.name}`)
                logger.error(err)
            } else {
                logger.error('Job failed! error: ', err.message)
            }
        })

        worker.on('error', (err: Error) => {
            logger.error(err)
        })

        return worker
    }

    private async processor(job: Job) {
        switch (job.name) {
            //
        }
    }
}