const assert = require('assert');

const { conditional } = require('.');

// Sanity check for resolving CJS in Node.js
assert.strictEqual(conditional('foo'), 'foo');
