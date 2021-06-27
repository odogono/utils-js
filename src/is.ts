const getClass: Function = {}.toString;

/**
 * Checks if the value is an object
 *
 *
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 */
export function isObject(value: any): boolean {
    // taken from https://github.com/lodash/lodash/blob/master/isObject.js
    // const type = typeof value;
    // return value != null && (type === 'object' || type === 'function')
    return Object.prototype.toString.call(value) === '[object Object]';
}

/**
 *
 * @param {*} object
 */
export function isString(value: any): boolean {
    return getClass.call(value) === '[object String]';
}

export function isRegex(value: any): boolean {
    return getClass.call(value) === '[object RegExp]';
}

/**
 *
 * @param {*} object
 * @returns {boolean} if the object is a function
 */
export function isFunction(value: any): boolean {
    return value && (getClass.call(value) === '[object Function]' || getClass.call(value) === '[object AsyncFunction]');
}

/**
 *
 * @param {*} object
 */
export function isDate(value: any): boolean {
    return value && getClass.call(value) === '[object Date]';
}

export function isValidDate(value: any): boolean {
    return isDate(value) && !isNaN(value.getTime());
}

// taken from underscore-contrib/underscore.function.predicates
// cannot include directly in node

// A numeric is a letiable that contains a numeric value, regardless its type
// It can be a String containing a numeric value, exponential notation, or a Number object
// See here for more discussion: http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric/1830844#1830844
export function isNumeric(val: any): boolean {
    return !Array.isArray(val) && !Number.isNaN(parseFloat(val)) && isFinite(val);
}

// An integer contains an optional minus sign to begin and only the digits 0-9
// Objects that can be parsed that way are also considered ints, e.g. "123"
// Floats that are mathematically equal to integers are considered integers, e.g. 1.0
// See here for more discussion: http://stackoverflow.com/questions/1019515/javascript-test-for-an-integer
export function isInteger(val: any): boolean {
    // return Number.isInteger(val);
    return !Array.isArray(val) && !Number.isNaN(parseFloat(val)) && isFinite(val) && val % 1 === 0;
}

/**
 * Returns true if the passed value is a boolean
 */
export function isBoolean(value: any): boolean {
    return value !== undefined && getClass.call(value) === '[object Boolean]';
}

/**
 *
 */
export function isUUID(value: any): boolean {
    // 4AC18B41-2372-D0FD-9336-E678D0EAE236
    return isString(value) && (value as string).length === 36;
}

/**
 *
 */
export function isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.document !== 'undefined';
}

export function isPromise(value: any): boolean {
    return value && typeof value.then === 'function';
}

export function isEmpty(value: any): boolean {
    if (value == null) {
        return true;
    }
    if (Array.isArray(value) || isString(value)) {
        return value.length === 0;
    }

    return Object.keys(value).length === 0;
}

/**
 * Compares two values for equality
 * 
 * https://github.com/epoberezkin/fast-deep-equal/blob/master/src/index.jst
 * 
 * MIT License

    Copyright (c) 2017 Evgeny Poberezkin

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.

 * @param a 
 * @param b 
 */
export function isEqual(a: any, b: any): boolean {
    if (a === b) {
        return true;
    }
    if (a && b && typeof a == 'object' && typeof b == 'object') {
        if (a.constructor !== b.constructor) return false;

        let length, ii, keys;
        if (Array.isArray(a)) {
            length = a.length;
            if (length != b.length) {
                return false;
            }
            for (ii = length; ii-- !== 0; ) {
                if (!isEqual(a[ii], b[ii])) {
                    return false;
                }
            }
            return true;
        }

        if (a instanceof Map && b instanceof Map) {
            if (a.size !== b.size) return false;
            for (ii of a.entries()) if (!b.has(ii[0])) return false;
            for (ii of a.entries()) if (!isEqual(ii[1], b.get(ii[0]))) return false;
            return true;
        }

        if (a instanceof Set && b instanceof Set) {
            if (a.size !== b.size) return false;
            for (ii of a.entries()) if (!b.has(ii[0])) return false;
            return true;
        }

        if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
            length = a.byteLength;
            if (length != b.byteLength) {
                return false;
            }
            for (ii = length; ii-- !== 0; )
                if (a[ii] !== b[ii]) {
                    return false;
                }
            return true;
        }

        if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) {
            return false;
        }

        for (ii = length; ii-- !== 0; ) {
            if (!Object.prototype.hasOwnProperty.call(b, keys[ii])) {
                return false;
            }
        }

        for (ii = length; ii-- !== 0; ) {
            const key = keys[ii];
            if (!isEqual(a[key], b[key])) {
                return false;
            }
        }

        return true;
    }

    // true if both NaN, false otherwise
    return a !== a && b !== b;
}
