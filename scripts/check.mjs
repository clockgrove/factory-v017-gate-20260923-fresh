import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const rootManifest = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
assert.equal(rootManifest.private, true);
assert.equal(rootManifest.packageManager, 'pnpm@10.17.1');
assert.deepEqual(rootManifest.scripts, {
  check: 'node scripts/check.mjs',
  test: 'node --test test/workspace.test.mjs',
});
assert.equal(rootManifest.dependencies, undefined);
assert.equal(rootManifest.devDependencies, undefined);

const workspaceManifest = await readFile(new URL('../pnpm-workspace.yaml', import.meta.url), 'utf8');
assert.equal(workspaceManifest, 'packages:\n  - packages/*\n');

const coreManifest = JSON.parse(
  await readFile(new URL('../packages/core/package.json', import.meta.url), 'utf8'),
);
assert.equal(coreManifest.private, true);
assert.equal(coreManifest.type, 'module');
assert.equal(coreManifest.exports, './index.mjs');
assert.equal(coreManifest.dependencies, undefined);
assert.equal(coreManifest.devDependencies, undefined);

const { default: identity } = await import('../packages/core/index.mjs');
assert.equal(identity, 'greenfield-pnpm-v019');
