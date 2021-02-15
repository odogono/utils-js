import { suite } from 'uvu';
import assert from 'uvu/assert';
import { toBoolean } from '../src/to';

let test = suite('util/to');


test('toBoolean', () => {
    assert.ok(toBoolean(true));
    assert.ok(toBoolean('true'));
    assert.ok(toBoolean(1));
    assert.ok(toBoolean('1'));
    assert.ok(toBoolean('yes'));
    
    assert.not.ok(toBoolean(false));
    assert.not.ok(toBoolean('false'));
    assert.not.ok(toBoolean(0));
    assert.not.ok(toBoolean('0'));
    assert.not.ok(toBoolean('no'));
});



test.run();