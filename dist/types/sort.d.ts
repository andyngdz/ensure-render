import { ISortBase } from './sort-base';
export declare type TDirection = 'ASC' | 'DESC';
export declare type TSort = ISortBase<TDirection>;
export interface ICurrentSort {
    field: string;
    direction: TDirection;
}
export interface IUseSort {
    current: ICurrentSort;
    sorts?: TSortValues;
    onSort: (field: string) => void;
}
export declare type TSortValues = Record<string, TSort>;
