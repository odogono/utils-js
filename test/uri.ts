import { suite } from 'uvu';
import assert from 'uvu/assert';
import { parseUri } from '../src/uri';

const test = suite('util/uri');

test('parsing uri', (t) => {
    const uri = 'action://job/products/add?stuff=blah&exit=true';
    const { protocol, path, source, host, queryKey } = parseUri(uri);

    assert.equal(protocol, 'action');
    assert.equal(path, '/products/add');
    assert.equal(source, uri);
    assert.equal(host, 'job');
    assert.equal(queryKey, { stuff: 'blah', exit: 'true' });
});

test.run();
