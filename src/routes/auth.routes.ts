import { Hono } from "hono";
import AuthController from "../app/controllers/auth.controller.js";
import { loginValidator, registerValidator } from "../app/validators/auth.validator.js";
import { jwt } from "hono/jwt";
import env from "../config/env.js";

export default class AuthRoutes {
    constructor() {
        //
    }

    public static setup(app: Hono) {
        const authCheck = jwt({ secret: env.SECRET_KEY })
        const route = new Hono()

        const controller = new AuthController()
        route.get('/me', authCheck, controller.me)
        route.post('/login', loginValidator, controller.login)
        route.post('/register', registerValidator, controller.register)

        app.route('/auth', route)
    }
}