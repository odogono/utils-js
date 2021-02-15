import { suite } from 'uvu';
import assert from 'uvu/assert';
import { slugify, truncate } from '../src/string';


let test = suite('util/is');


test('truncate', () => {
    assert.equal(
        truncate('the string is truncated by a given amount'),
        'the·string...'
    )
});

test('slugify', () => {
    assert.equal(
        slugify('A Full Day of Learning'),
        'a-full-day-of-learning'
    )
})

test.run();