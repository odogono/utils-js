import { suite } from 'uvu';
import assert from 'uvu/assert';
import { createUUID } from '../src/uuid';
import { isUUID } from '../src/is';

const test = suite('util/uuid');

test('createUUID', () => {
    assert.ok(isUUID(createUUID()));
});

test.run();
