import { mysqlTable, serial, timestamp, varchar } from "drizzle-orm/mysql-core";

export const userSchema = mysqlTable("users", {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    email_verified_at: varchar("email_verified_at", { length: 255 }),
    password: varchar("password", { length: 255 }).notNull(),
    remember_token: varchar("remember_token", { length: 100 }),
    created_at: timestamp("created_at", { mode: "date" }).notNull(),
    updated_at: timestamp("updated_at", { mode: "date" }).notNull(),
    deleted_at: timestamp("deleted_at", { mode: "date" }),
    status: varchar("status", { length: 255 }).default("active"),
})