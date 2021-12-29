export interface Page<T> {
    currentPageNumber: number;
    lastPageNumber: number;
    result: T[];
    query: string;
    pageSize: number;
}

export function getPageInfo<T>(page : Page<T>) : PageInfo {
    return {currentPageNumber: page.currentPageNumber, lastPageNumber: page.lastPageNumber};
}

export interface PageInfo {
    currentPageNumber: number;
    lastPageNumber: number;
}