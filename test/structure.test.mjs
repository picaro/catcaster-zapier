import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('zapier app registers lifecycle triggers and draft/publish creates', () => {
  const index = readFileSync(path.join(root, 'index.js'), 'utf8');
  assert.match(index, /postPublished/);
  assert.match(index, /createDraft/);
  for (const rel of [
    'triggers/postLifecycleHook.js',
    'creates/createDraft.js',
    'creates/publishPost.js',
    'authentication.js',
  ]) {
    assert.ok(existsSync(path.join(root, rel)), rel);
  }
});

test('zapier package stays private until marketplace listing', () => {
  const pkg = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'));
  assert.equal(pkg.private, true);
});
