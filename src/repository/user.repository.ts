import { eq } from "drizzle-orm";
import { db } from "../databases/mysql.js";
import { userSchema } from "../databases/schemas/index.js";
import type { UserInsert } from "../databases/types/index.js";

export default class UserRepository {
    public async findByEmail(email: string) {
        return db.query.userSchema.findFirst({
            where: eq(userSchema.email, email),
        })
    }

    public async findById(id: number) {
        return db.query.userSchema.findFirst({
            where: eq(userSchema.id, id),
        })
    }

    public async create(user: UserInsert) {
        return db.insert(userSchema).values(user).$returningId()
    }
}