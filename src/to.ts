import { isEmpty } from './is';

/**
 * Converts a value to a boolean
 *
 * @param {*} value
 * @param {*} defaultValue
 */
export function toBoolean(value: boolean | number | string, defaultValue = false): boolean {
    switch (value) {
        case true:
        case 'true':
        case 1:
        case '1':
        case 'yes':
            return true;
        case false:
        case 'false':
        case 0:
        case '0':
        case 'no':
            return false;
        default:
            return defaultValue;
    }
}

/**
 *
 * @param {*} value
 * @param {*} defaultValue
 */
export function toInteger(value: any, defaultValue = 0) {
    let result = parseInt(value, 10);
    if (Number.isNaN(result)) {
        result = defaultValue;
    }
    return result < 0 ? Math.ceil(result) : Math.floor(result);
}

/**
 * @param value
 * @param defaultValue
 */
export function toNumber(value: any, defaultValue = 0) {
    let result = Number(value);
    if (Number.isNaN(result)) {
        result = defaultValue;
    }
    return result;
}

/**
 * Capitalises a string
 *
 */
export function toCapitalized(str: string): string {
    return isEmpty(str) ? str : str.charAt(0).toUpperCase() + str.substring(1);
}

export function toKebabCase(str: string, joinChar = '-'): string {
    return str
        .match(/[A-Z]?[a-z]+/g)
        .map((word) => word.toLowerCase()) // word.charAt(0).toUpperCase() + word.substring(1) )
        .join(joinChar);
}

export function toSnakeCase(str: string): string {
    return toKebabCase(str, '_');
}

/**
 *   Converts a string so that the words are CapitalisedAndConcatenated
 */
export function toPascalCase(str: string, joinChar = ''): string {
    return str
        .match(/[A-Z]?[a-z]+/g)
        .map((word) => toCapitalized(word)) // word.charAt(0).toUpperCase() + word.substring(1) )
        .join(joinChar);
}

/**
 *   Converts a string so that the words are capitalisedAndConcatenated
 */
export function toCamelCase(str: string, joinChar = ''): string {
    const result = toPascalCase(str, joinChar);
    return result.charAt(0).toLowerCase() + result.substring(1);
}

/**
 * Converts all the keys in an object to Camelcase
 *
 * @param obj
 */
export const objectKeysToCamelCase = (obj: any) => {
    return Object.keys(obj).reduce((memo, key) => {
        memo[toCamelCase(key)] = obj[key];
        return memo;
    }, {});
};
