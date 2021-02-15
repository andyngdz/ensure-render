import { IUseSort, ICurrentSort } from './types//sort';
declare const useSort: (fields: Array<string>, initSort: ICurrentSort) => IUseSort;
export { useSort };
