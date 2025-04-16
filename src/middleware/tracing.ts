import { createMiddleware } from 'hono/factory'
import { randomString } from '../utils/randomString.js'

export const TRACING = 'tracing'

export const tracing = createMiddleware(async (c, next) => {
    c.set(TRACING, randomString(10))

    await next()
})