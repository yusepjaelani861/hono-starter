import { validator } from 'hono/validator'
import { z } from "zod";
import { validateSchema } from './index.js';

const loginSchema = z.object({
    email: z.string().email("Invalid email format").nonempty("Email is required"),
    password: z.string().nonempty("Password is required"),
})

const registerSchema = z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Invalid email format").nonempty("Email is required"),
    password: z.string().nonempty("Password is required"),
})

export const loginValidator = validator('json', (value, c) => {
    return validateSchema(c, loginSchema, value)
})

export const registerValidator = validator('json', (value, c) => {
    return validateSchema(c, registerSchema, value)
})

export type LoginBody = z.infer<typeof loginSchema>
export type RegisterBody = z.infer<typeof registerSchema>