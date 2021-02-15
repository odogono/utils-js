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