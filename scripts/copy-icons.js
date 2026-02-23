const { cpSync, mkdirSync } = require('fs');
const { join } = require('path');

const src = join(__dirname, '..', 'nodes', 'ClickFunnels');
const dest = join(__dirname, '..', 'dist', 'nodes', 'ClickFunnels');

mkdirSync(dest, { recursive: true });
cpSync(join(src, 'clickfunnels.svg'), join(dest, 'clickfunnels.svg'));

console.log('Icons copied to dist/nodes/ClickFunnels/');
