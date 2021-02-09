import { ISort, ISortOptions, IUseSort, TDirection, TSortValues } from 'types/sort';
/**
 * @param data Array of data
 * @param initSort Default sort column
 * @param options `{ direction, onSortBy }` See two options below
 * @param direction Direction 'asc' | 'desc' - default 'asc'
 * @param onSortBy
 * Default sort function
 * orders of the iteratees to sort by. If `orders` is unspecified, all values
 * are sorted in ascending order. Otherwise, specify an order of "desc" for
 * descending or "asc" for ascending sort order of corresponding values.
 *
 * @category Collection
 * @param collection The collection to iterate over.
 * @param [iteratees=[_.identity]] The iteratees to sort by.
 * @param [orders] The sort orders of `iteratees`.
 * @param- {Object} [guard] Enables use as an iteratee for functions like `_.reduce`.
 * @returns Returns the new sorted array.
 * @example
 *
 * var users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 34 },
 *   { 'user': 'fred',   'age': 42 },
 *   { 'user': 'barney', 'age': 36 }
 * ];
 *
 * // sort by `user` in ascending order and by `age` in descending order
 * _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
 */
declare const useSort: <T>(data: T[], initSort: keyof T, options?: ISortOptions<T>) => IUseSort<T>;
export default useSort;
export type { ISort, ISortOptions, IUseSort, TDirection, TSortValues };
