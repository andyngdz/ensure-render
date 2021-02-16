"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSort = void 0;
var react_use_1 = require("react-use");
var react_1 = require("react");
var immer_1 = __importDefault(require("immer"));
var useSort = function (fields, initSort) {
    var _a = react_1.useState(initSort), current = _a[0], setCurrent = _a[1];
    var _b = react_1.useState(), sorts = _b[0], setSorts = _b[1];
    var defaultField = initSort.field, defaultDirection = initSort.direction;
    react_use_1.useDeepCompareEffect(function () {
        var newSorts = {};
        fields.forEach(function (field) {
            newSorts[field] = {
                active: defaultField === field,
                direction: defaultDirection
            };
        });
        setSorts(newSorts);
    }, [fields]);
    react_1.useEffect(function () {
        if (sorts) {
            var current_1;
            Object.keys(sorts).forEach(function (field) {
                var _a = sorts[field], active = _a.active, direction = _a.direction;
                if (active) {
                    current_1 = { field: field, direction: direction };
                }
            });
            if (current_1)
                setCurrent(current_1);
        }
    }, [sorts]);
    var resetSortActive = function () {
        setSorts(function (prevState) {
            return immer_1.default(prevState, function (draft) {
                if (draft && sorts) {
                    Object.keys(sorts).forEach(function (field) {
                        draft[field].active = false;
                        draft[field].direction = defaultDirection;
                    });
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
                        draft[field].direction = defaultDirection;
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
//# sourceMappingURL=useSort.js.map