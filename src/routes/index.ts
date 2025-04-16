import type { Hono } from "hono";
import AuthRoutes from "./auth.routes.js";

export default class Routes {
    private api: Hono

    constructor(api: Hono) {
        this.api = api
    }

    public configure() {
        AuthRoutes.setup(this.api)
    }
}