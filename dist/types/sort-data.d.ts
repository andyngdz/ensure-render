import { ISortBase } from './sort-base';
export declare type TMaterialDirection = 'asc' | 'desc';
export declare type TSortData = ISortBase<TMaterialDirection>;
export declare type TSortDataValues = Record<string, TSortData>;
export interface IUseSortData<T> {
    sorts: Record<keyof T, TSortData>;
    sortedData: Array<T>;
    onSort: (key: keyof T) => void;
    loading: boolean;
}
export interface ISortOptions<T> {
    direction: TMaterialDirection;
    onSortBy?: (data: T[]) => T[];
}
