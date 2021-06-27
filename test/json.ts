import { suite } from 'uvu';
import assert from 'uvu/assert';
import { dehydrate, rehydrate, stringify } from '../src/json';

const test = suite('util/json');

test('stringify circular ref', () => {
    const a: any = {
        title: 'a',
        msg: 'alpha',
    };

    const b: any = {
        title: 'b',
        msg: 'beta',
        parent: a,
    };

    a.child = b;

    assert.equal(stringify(a), '{"title":"a","msg":"alpha","child":{"title":"b","msg":"beta"}}');
});

test('dehydrate/rehydrate', () => {
    const a: any = {
        title: 'a',
        tags: ['large', 'slow'],
        history: [{ date: 'today', action: 'up' }],
    };

    assert.equal(dehydrate(a), [
        ['/title', 'a'],
        ['/tags/0', 'large'],
        ['/tags/1', 'slow'],
        ['/history/0/date', 'today'],
        ['/history/0/action', 'up'],
    ]);

    assert.equal(rehydrate(dehydrate(a), {}), a);
});

test.run();
