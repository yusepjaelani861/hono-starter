import type { Context } from "hono";
import type { ZodError, ZodObject } from "zod";
import { sendError } from "../../libraries/rest.js";

export const getErrorPhrase = (error: ZodError): string => {
    let messages = '';
    for (const issue of error.issues) {
        messages += `${issue.path}: ${issue.message}, `;
    }

    // Remove the last comma and space
    messages = messages.slice(0, -2);
    return messages;
}

export const validateSchema = (c: Context, schema: ZodObject<any>, value: any) => {
    const parsed = schema.safeParse(value)
    if (!parsed.success) {
        return sendError(c, [], getErrorPhrase(parsed.error), 422)
    }

    return parsed.data
}