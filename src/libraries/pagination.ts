import type { Context } from "hono"

export type Pagination = {
    page: number
    total: number
    limit: number
    offset: number
    total_page: number
    next_page: number | null
    prev_page: number | null
}

export default function autoPagination(c: Context, total: number): Pagination {
    const page = Number(c.req.query('page') || 1)
    const limit = Number(c.req.query('limit') || 10)
    const offset = (page - 1) * limit
    const totalPage = Math.ceil(total / limit)
    const nextPage = page < totalPage ? page + 1 : null
    const prevPage = page > 1 ? page - 1 : null

    return {
        page,
        total,
        limit,
        offset,
        total_page: totalPage,
        next_page: nextPage,
        prev_page: prevPage,
    }
}