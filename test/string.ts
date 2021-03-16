import { suite } from 'uvu';
import assert from 'uvu/assert';
import { ensureQuotes, removeQuotes, slugify, truncate } from '../src/string';


let test = suite('util/is');


test('truncate', () => {
    assert.equal(
        truncate('the string is truncated by a given amount'),
        'the string...'
    )
});

test('slugify', () => {
    assert.equal(
        slugify('A Full Day of Learning'),
        'a-full-day-of-learning'
    )
});

test('ensure quotes', () => {
    assert.equal( ensureQuotes(`get out of bed`), `'get out of bed'` );
    assert.equal( ensureQuotes(`"phone up a friend"`), `'phone up a friend'` );
    assert.equal( ensureQuotes(`turn on the news`, '"' ), `"turn on the news"` );
});

test('remove quotes', () => {
    assert.equal( removeQuotes(`  'left to my own devices' `), 'left to my own devices' );
    assert.equal( removeQuotes(`"i probably would"`), 'i probably would' );
});

test.run();