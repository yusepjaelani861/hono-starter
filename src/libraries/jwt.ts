import { sign, verify } from 'hono/jwt'
import env from '../config/env.js'

export type JWTPayload = {
    [key: string]: unknown
    exp?: number
}

export const encode = async (id: number, email: string): Promise<string> => {
    const payload: JWTPayload = {
        sub: id,
        email: email,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
    }

    return await sign(payload, env.SECRET_KEY)
}

export const check = async (token: string): Promise<JWTPayload | null> => {
    try {
        const payload = await verify(token, env.SECRET_KEY)
        return payload
    } catch (error) {
        return null
    }
}