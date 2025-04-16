import type { userSchema } from "../schemas/index.js";

export type User = typeof userSchema.$inferSelect
export type UserInsert = typeof userSchema.$inferInsert