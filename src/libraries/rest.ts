import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import type { Pagination } from "./pagination.js";

export const sendError = (c: Context, data: unknown, message?: string, status = 500) => {
    return c.json({
        success: false,
        message: message || "Internal Server Error",
        data,
    }, status as ContentfulStatusCode);
}

export const sendResponse = (c: Context, data: unknown, message?: string, pagination?: Pagination) => {
    return c.json({
        success: true,
        message: message || "Success",
        data,
        pagination,
    }, 200 as ContentfulStatusCode);
}

export const internalServerError = (c: Context, error: Error) => {
    if (error instanceof HTTPException) {
        return c.json({
            success: false,
            message: error.message,
        }, <ContentfulStatusCode>error.status)
    }

    return c.json({
        success: false,
        message: error.message,
    }, 500 as ContentfulStatusCode)
}