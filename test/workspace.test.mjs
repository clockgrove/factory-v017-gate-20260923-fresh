import assert from 'node:assert/strict';
import test from 'node:test';

import identity from '../packages/core/index.mjs';

test('core exports the workspace identity', () => {
  assert.equal(identity, 'greenfield-pnpm-v019');
});
