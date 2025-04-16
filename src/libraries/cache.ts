import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { promisify } from 'util'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const cacheDir = path.join(__dirname, '..', '..', 'cache')

export default class Cache {
    public static async set(key: string, value: any, ttl: number = 3600) {
        const filePath = path.join(cacheDir, key)
        const data = {
            value,
            expires: Date.now() + ttl * 1000
        }
        await promisify(fs.writeFile)(filePath, JSON.stringify(data))
    }

    public static async get(key: string) {
        const filePath = path.join(cacheDir, key)
        try {
            const data = await promisify(fs.readFile)(filePath, 'utf8')
            const parsedData = JSON.parse(data)
            if (parsedData.expires > Date.now()) {
                return parsedData.value
            }

            // If the cache is expired, delete the file
            await promisify(fs.unlink)(filePath)
            return null
        } catch (error: any) {
            // If the file does not exist, return null
            if (error.code === 'ENOENT') {
                return null
            }

            throw error
        }
    }

    public static async delete(key: string) {
        const filePath = path.join(cacheDir, key)
        try {
            await promisify(fs.unlink)(filePath)
        } catch (error: any) {
            // If the file does not exist, return null
            if (error.code === 'ENOENT') {
                return null
            }

            throw error
        }
    }

    public static async clear() {
        try {
            const files = await promisify(fs.readdir)(cacheDir)
            const unlinkPromises = files.map(file => {
                if (file === '.gitignore') {
                    return Promise.resolve()
                }

                const filePath = path.join(cacheDir, file)
                return promisify(fs.unlink)(filePath)
            })
            await Promise.all(unlinkPromises)
        } catch (error) {
            throw error
        }
    }
}