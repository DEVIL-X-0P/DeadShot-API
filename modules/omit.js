'use strict';

var _slicedToArray = (function() {
    function sliceIterator(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;
        try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);
                if (i && _arr.length === i) break;
            }
        } catch (err) {
            _d = true;
            _e = err;
        } finally {
            try {
                if (!_n && _i['return']) _i['return']();
            } finally {
                if (_d) throw _e;
            }
        }
        return _arr;
    }
    return function(arr, i) {
        if (Array.isArray(arr)) {
            return arr;
        } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
        } else {
            throw new TypeError('Invalid attempt to destructure non-iterable instance');
        }
    };
})();

var omit = require('lodash/omit');

module.exports = function omitDeepLodash(input, props) {
    function omitDeepOnOwnProps(obj) {
        if (typeof input === 'undefined') {
            return input;
        }

        if (!Array.isArray(obj) && !isObject(obj)) {
            return obj;
        }

        if (Array.isArray(obj)) {
            return omitDeepLodash(obj, props);
        }

        var o = {};
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (
                var _iterator = Object.entries(obj)[Symbol.iterator](), _step;
                !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
                _iteratorNormalCompletion = true
            ) {
                var _step$value = _slicedToArray(_step.value, 2),
                    key = _step$value[0],
                    value = _step$value[1];

                value = ObjectId.isValid(value)?String(value):value;
                o[key] = !isNil(value) ? omitDeepLodash(value, props) : value;
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return omit(o, props);
    }

    if (arguments.length > 2) {
        props = Array.prototype.slice.call(arguments).slice(1);
    }

    if (Array.isArray(input)) {
        return input.map(omitDeepOnOwnProps);
    }

    return omitDeepOnOwnProps(input);
};

function isNil(value) {
    return value === null || value === undefined;
}

function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}
