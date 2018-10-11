//
//
//
//
//
//
// If you're reading this, check out server.js instead.
// Nothing to see here!
//
//
//
//
//
if (process.versions.node.split('.')[0] < 8) {
  console.error('Please run node version 8 or better.');
  process.exit(1);
}

require('@babel/register');
require('./server');
