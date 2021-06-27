import { suite } from 'uvu';
import assert from 'uvu/assert';
import { isBoolean, isInteger, isNumeric } from '../src/is';

const test = suite('util/is');

test('isBoolean', () => {
    assert.ok(isBoolean(true));
    assert.ok(isBoolean(false));
    assert.not.ok(isBoolean([true]));
    assert.not.ok(isBoolean([false]));
});

test('isInteger', () => {
    assert.ok(isInteger(1));
    assert.ok(isInteger('2'));
    assert.not.ok(isInteger('two'));
    assert.not.ok(isInteger([100]));
});

test('isNumeric', () => {
    assert.ok(isNumeric(1));
    assert.ok(isNumeric('1'));
    assert.not.ok(isNumeric([100]));

    assert.not.ok(isNumeric(' '));
    assert.not.ok(isNumeric('\t\t'));
    assert.not.ok(isNumeric('\n\r'));

    assert.ok(isNumeric(-1));
    assert.ok(isNumeric(0));
    assert.ok(isNumeric(1.1));
    assert.ok(isNumeric(8e5));
});

test.run();
