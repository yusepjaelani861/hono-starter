import type { User, UserInsert } from "../databases/types/index.js";
import UserRepository from "../repository/user.repository.js";

export default class UserService {
    private repo: UserRepository

    constructor() {
        this.repo = new UserRepository()

        this.findByEmail = this.findByEmail.bind(this)
        this.findById = this.findById.bind(this)
        this.create = this.create.bind(this)
    }

    public async findByEmail(email: string): Promise<User | null> {
        const data = await this.repo.findByEmail(email)

        return data || null
    }

    public async findById(id: number): Promise<User | null> {
        const data = await this.repo.findById(id)

        return data || null
    }

    public async create(payload: UserInsert): Promise<User | null> {
        const data = await this.repo.create(payload)

        const result = data[0] as unknown as { id: number }
        const id = result.id

        const user = await this.repo.findById(id)

        return user || null
    }
}