export interface IPaginationResponse<T> {
    page: number;
    perPage: number;
    totalCount: number;
    data: T[];
}