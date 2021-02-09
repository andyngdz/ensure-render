"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSort = void 0;
var immer_1 = __importDefault(require("immer"));
var react_1 = require("react");
var lodash_1 = require("lodash");
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
var useSort = function (data, initSort, options) {
    var _a;
    if (options === void 0) { options = {
        direction: 'asc'
    }; }
    var direction = options.direction, onSortBy = options.onSortBy;
    var dSorts = (_a = {},
        _a[initSort] = {
            direction: direction,
            active: true
        },
        _a);
    var _b = react_1.useState(true), loading = _b[0], setLoading = _b[1];
    var _c = react_1.useState(initSort), currentSort = _c[0], setCurrentSort = _c[1];
    var _d = react_1.useState(dSorts), sorts = _d[0], setSorts = _d[1];
    react_1.useEffect(function () {
        var newSorts = {};
        var firstRow = lodash_1.head(data);
        if (firstRow) {
            Object.keys(firstRow).forEach(function (key) {
                return (newSorts[key] = {
                    direction: direction,
                    active: false
                });
            });
        }
        setSorts(function (prevSorts) { return lodash_1.merge(newSorts, prevSorts); });
        setLoading(function (prevLoading) { return !prevLoading; });
    }, [data, direction]);
    var sortBy = function (key) {
        var currentSortFor = currentSort;
        var sortFor = key;
        setSorts(immer_1.default(function (draft) {
            if (currentSortFor !== sortFor) {
                draft[currentSortFor].active = false;
                draft[currentSortFor].direction = direction;
            }
            if (!draft[sortFor].active) {
                draft[sortFor].active = true;
            }
            else {
                var nextDirection = draft[sortFor].direction === 'desc' ? 'asc' : 'desc';
                draft[sortFor].direction = nextDirection;
            }
        }));
        setCurrentSort(key);
    };
    var sortedData = onSortBy
        ? onSortBy(data)
        : lodash_1.orderBy(data, function (item) {
            var value = item[currentSort];
            if (lodash_1.isString(value)) {
                return value.toLocaleLowerCase();
            }
            return value;
        }, [sorts[currentSort].direction]);
    return { loading: loading, sortedData: sortedData, sorts: sorts, sortBy: sortBy };
};
exports.useSort = useSort;
//# sourceMappingURL=useSort.js.map