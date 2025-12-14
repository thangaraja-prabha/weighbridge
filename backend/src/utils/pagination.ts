import { Request } from 'express';

export interface PaginationResult<T> {
    data: T[];
    next: { page: number; limit: number } | null;
    previous: { page: number; limit: number } | null;
    total?: number;
}

export function getPaginationParams(req: Request, defaultLimit = 10) {
    const page = parseInt(req.query.page as string) || 1;
    let limit = parseInt(req.query.limit as string) || 10; // Force default to 10
    if (limit < 1) limit = 10;
    const offset = (page - 1) * limit;
    return { page, limit, offset };
}

export function createPaginatedResponse<T>(data: T[], total: number, page: number, limit: number): PaginationResult<T> {
    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return {
        data,
        next: hasNext ? { page: page + 1, limit } : null,
        previous: hasPrev ? { page: page - 1, limit } : null,
        total
    };
}
