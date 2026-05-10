import type { Post } from "../types/post";

type PaginatedPostResults = {
    posts: Post[];
    page: number;
    pageSize: number;
    totalPostQty: number;
    totalPages: number;
}

export function Paginate(
    page:number, 
    pageSize:number,
    posts: Post[],
) : PaginatedPostResults {
    const safePage = Math.max(1, page)
    const safePageSize = Math.max(1, pageSize)

    const totalPostQty = posts.length
    const totalPages = Math.ceil(totalPostQty / safePageSize)
    const startIndex = (safePage - 1) * safePageSize
    const endIndex = startIndex + safePageSize

    return {
        posts: posts.slice(startIndex, endIndex),
        page: safePage,
        pageSize: safePageSize,
        totalPages,
        totalPostQty
    }
}

