

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
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    const validPage = Math.max(1, Math.min(page, totalPages));

    const startIndex = (validPage - 1) * pageSize;
    const itemsLeft = totalItems - startIndex;
    
    // Vérifier s'il y a réellement des éléments sur la page suivante
    const hasNextPage = startIndex + pageSize < totalItems;
  
    return {
      currentPage: validPage,
      totalPages,
      totalItems,
      pageSize,
      hasNextPage,
      hasPrevPage: validPage > 1
    }
  }
  
  export function paginateArray<T>(
    array: T[], 
    page: number = 1, 
    pageSize: number = 10
  ): T[] {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return array.slice(startIndex, endIndex);
  }
  
  // Fonction utilitaire pour vérifier la validité d'une page
  export function isValidPage(page: number, totalItems: number, pageSize: number): boolean {
    if (page < 1) return false;
    const startIndex = (page - 1) * pageSize;
    return startIndex < totalItems;
  }  