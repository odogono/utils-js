import { isString } from './is';
import { stringify } from './json';

/**
 * Trims whitespace from the left side of a string up to the offset
 * @param {*} str
 * @param {*} offset
 */
export function trimLeftMax(str: string, offset: number) {
    let ws = /\s/,
        ii = 0;
    while (ii < offset && ws.test(str.charAt(ii++)));
    return str.substring(ii - 1);
}

/**
 * Trims a multiline string
 * @param buffer
 * @param offset
 */
export function trimMultiQuote(buffer: string, offset: number) {
    // trim all whitespace up to the first character
    buffer = buffer.substring(0, buffer.length - 2).trimStart();
    let len,
        ii,
        lines = buffer.split('\n');

    for (ii = lines.length - 1; ii >= 0; ii--) {
        lines[ii] = trimLeftMax(lines[ii], offset - 2);
    }

    buffer = lines.join('\n');

    return buffer;
}

/**
 * Truncates a string to the given length, adding ellipsis
 *
 * @param str
 * @param len
 */
export function truncate(str: string, len = 10, ellipsis = '...'): string {
    return str === undefined ? '' : str.length <= len ? str : str.slice(0, len) + ellipsis;
}

/**
 * Slugifys a string
 *
 * https://lucidar.me/en/web-dev/how-to-slugify-a-string-in-javascript/
 *
 * @param value
 */
export function slugify(value: string): string {
    if (!isString(value)) {
        value = stringify(value);
    }
    value = value.replace(/^\s+|\s+$/g, '');

    // Make the string lowercase
    value = value.toLowerCase();

    // Remove accents, swap ñ for n, etc
    const from = 'ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;';
    const to = 'AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------';
    for (let ii = 0, len = from.length; ii < len; ii++) {
        value = value.replace(new RegExp(from.charAt(ii), 'g'), to.charAt(ii));
    }

    // Remove invalid chars
    value = value
        .replace(/[^a-z0-9 -]/g, '')
        // Collapse whitespace and replace by -
        .replace(/\s+/g, '-')
        // Collapse dashes
        .replace(/-+/g, '-');

    return value;
}

/**
 * Adds single quotes to a string if it does not already have them
 *
 * @param str
 * @returns
 */
export function ensureQuotes(str: string, quoteChar = "'"): string {
    if (str === undefined) {
        return '';
    }
    str = str.trim().replace(/^["'](.+)["']$/, '$1');
    return quoteChar + str + quoteChar;
}

/**
 * Removes single or double quotes from a string
 *
 * @param str
 * @returns
 */
export function removeQuotes(str: string): string {
    // https://stackoverflow.com/a/19156197
    return str !== undefined ? str.trim().replace(/^["']?(.+(?=["']$))["']?$/, '$1') : '';
}
