import type { Context } from "hono";
import UserService from "../../services/user.service.js";
import type { LoginBody, RegisterBody } from "../validators/auth.validator.js";
import bcryptjs from "bcryptjs";
import { sendError, sendResponse } from "../../libraries/rest.js";
import { encode, type JWTPayload } from "../../libraries/jwt.js";
import type { User } from "../../databases/types/index.js";

const salt = bcryptjs.genSaltSync(10);

export default class AuthController {
    private service: UserService

    constructor() {
        this.service = new UserService()

        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
        this.me = this.me.bind(this)
    }

    public async login(c: Context) {
        const body: LoginBody = await c.req.json()
        const { email, password } = body

        const user = await this.service.findByEmail(email)

        if (!user) {
            return sendError(c, [], 'Invalid email or password', 401)
        }

        const isPasswordValid = bcryptjs.compareSync(password, user.password)
        if (!isPasswordValid) {
            return sendError(c, [], 'Invalid email or password', 401)
        }

        const token = await encode(user.id, user.email)

        return sendResponse(c, this.authResponse(token, user), 'Login successful')
    }

    public async register(c: Context) {
        const body: RegisterBody = await c.req.json()
        const { name, email, password } = body

        const existingUser = await this.service.findByEmail(email)
        if (existingUser) {
            return sendError(c, [], 'Email already exists', 400)
        }

        const hashedPassword = bcryptjs.hashSync(password, salt)
        const newUser = await this.service.create({
            name,
            email,
            password: hashedPassword,
            status: 'active',
            created_at: new Date(),
            updated_at: new Date(),
        })

        if (!newUser) {
            return sendError(c, [], 'Failed to create user', 500)
        }

        const user = await this.service.findByEmail(email)
        if (!user) {
            return sendError(c, [], 'User failed registered', 400)
        }

        const token = await encode(user.id, user.email)
        return sendResponse(c, this.authResponse(token, user), 'User registered successfully')
    }

    public async me(c: Context) {
        const payload: JWTPayload = c.get('jwtPayload')
        const user = await this.service.findByEmail(payload.email as string)
        if (!user) {
            return sendError(c, [], 'User not found', 404)
        }

        const token = await encode(user.id, user.email)
        return sendResponse(c, this.authResponse(token, user), 'User retrieved successfully')
    }

    authResponse(token: string, user: User) {
        return {
            token,
            token_type: 'Bearer',
            expires_in: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                status: user.status,
                created_at: user.created_at,
                updated_at: user.updated_at,
            },
        }
    }
}