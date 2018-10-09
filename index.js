// exit early from incompatible node versions
if (process.versions.node.match(/\d/)[0] < 8) {
  console.error('Please run node v8 or newer.');
  return;
}

require('@babel/register');
require('./server');
