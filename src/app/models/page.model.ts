import { environment } from "src/environments/environment";

export interface Page<T> {
    currentPageNumber: number;
    lastPageNumber: number;
    result: T[];
    query: string;
    pageSize: number;
    order?: number;
}

export interface PageInfo {
    currentPageNumber: number;
    lastPageNumber: number;
}

export interface PageParams {
    query: string;
    pageNumber: number;
}

export function toServerPageNumber(pageNumber: number, clientPageSize = environment.clientPageSize, serverPageSize = environment.serverPageSize): number {
    return Math.floor(((pageNumber + 1) * clientPageSize - 1) / serverPageSize);
}

export function toClientPage<T>(params: PageParams, serverPage: Page<T>, clientPageSize = environment.clientPageSize) {
    const lastPageNumber = computeClientLastPageNumber(serverPage, clientPageSize);
    const absoluteRecordIndex = params.pageNumber * clientPageSize;
    const offset = serverPage.currentPageNumber * serverPage.pageSize;
    const relativeRecordIndex = absoluteRecordIndex - offset;
    return {
        currentPageNumber: params.pageNumber,
        query: params.query,
        result: serverPage.result.slice(relativeRecordIndex, relativeRecordIndex + clientPageSize),
        lastPageNumber,
        pageSize: clientPageSize,
        order: serverPage?.order
    };
}

function computeClientLastPageNumber<T>(serverPage: Page<T>, clientPageSize = environment.clientPageSize) {
    let lastPageNumber;
    if (serverPage.currentPageNumber === serverPage.lastPageNumber)
        lastPageNumber = Math.ceil((serverPage.currentPageNumber * serverPage.pageSize + serverPage.result.length) / clientPageSize) - 1;
    else
        lastPageNumber = (serverPage.lastPageNumber + 1) * serverPage.pageSize / clientPageSize - 1;
    return lastPageNumber;
}