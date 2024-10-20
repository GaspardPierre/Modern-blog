

export interface PaginationInfo
{
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export function getPaginationInfo (totalItems: number, page: number = 1, pageSize: number = 10): PaginationInfo {
    const totalPages = Math.ceil(totalItems / pageSize);

    return {
        currentPage: page,
        totalPages,
        totalItems,
        pageSize,
        hasNextPage : page < totalPages,    
        hasPrevPage : page > 1
    }
}

export function paginateArray<T>(array: T[], page: number = 1, pageSize: number = 10): T[] {
    const startIndex = ( page - 1 ) * pageSize;
    const endIndex = startIndex + pageSize;
    return array.slice(startIndex, endIndex);

}

