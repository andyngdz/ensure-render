"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSort = void 0;
var react_use_1 = require("react-use");
var react_1 = require("react");
var lodash_1 = require("lodash");
var immer_1 = __importDefault(require("immer"));
var useSort = function (initFields, initCurrent) {
    var _a = react_1.useState(initCurrent), current = _a[0], setCurrent = _a[1];
    var _b = react_1.useState(), sorts = _b[0], setSorts = _b[1];
    react_use_1.useDeepCompareEffect(function () {
        var newSorts = {};
        var fields = lodash_1.remove(initFields, function (field) { return field === initCurrent.field; });
        for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
            var field = fields_1[_i];
            newSorts[field] = {
                active: false,
                direction: 'ASC'
            };
        }
        setSorts(function (prevState) { return lodash_1.merge(newSorts, prevState); });
    }, [initFields]);
    react_1.useEffect(function () {
        var current;
        for (var field in sorts) {
            if (sorts.hasOwnProperty(field)) {
                var _a = sorts[field], active = _a.active, direction = _a.direction;
                if (active) {
                    current = { field: field, direction: direction };
                }
            }
        }
        if (current)
            setCurrent(current);
    }, [sorts]);
    var resetSortActive = function () {
        setSorts(function (prevState) {
            return immer_1.default(prevState, function (draft) {
                if (draft) {
                    for (var field in sorts) {
                        if (sorts.hasOwnProperty(field)) {
                            draft[field].active = false;
                        }
                    }
                }
            });
        });
    };
    var onSort = function (field) {
        resetSortActive();
        setSorts(function (prevState) {
            return immer_1.default(prevState, function (draft) {
                if (sorts && draft) {
                    var direction = sorts[field].direction;
                    if (field !== current.field) {
                        draft[field].direction = 'ASC';
                    }
                    else {
                        draft[field].direction = direction === 'ASC' ? 'DESC' : 'ASC';
                    }
                    draft[field].active = true;
                }
            });
        });
    };
    return { current: current, sorts: sorts, onSort: onSort };
};
exports.useSort = useSort;
//# sourceMappingURL=ueeSort.js.map