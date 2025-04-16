import { Queue } from 'bullmq'
import IORedis from 'ioredis'
import env from '../config/env.js'

const QUEUE = {
    default: 'default'
}

const connection = new IORedis.default({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    password: env.REDIS_PASSWORD || '',
    maxRetriesPerRequest: null
})

const defaultQueue = new Queue(QUEUE.default, {
    connection,
    defaultJobOptions: {
        removeOnComplete: {
            count: 1000,
            age: 60 * 60 * 24 // 1 day
        },
        removeOnFail: {
            count: 1000,
            age: 60 * 60 * 24 // 1 day
        }
    }
})

export { QUEUE, connection, defaultQueue }