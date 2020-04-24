const fs = require('fs-extra');
const path = require('path')
const gen = (name, filePath, skip) => {
  const names = [
    // 'controller',
    // 'guard',
    'interceptor',
    'service',
    'entity',
    'module',
    'dto/index.dto',
    'dto/res',
    'controller/client.controller',
    'controller/server.controller',
  ].forEach(v => {
    const from = path.join(__dirname, `template`, `${v}.js`);
    const to = path.join(
      filePath,
      v.includes('/') ? `${v}.ts` : `${name}.${v}.ts`,
    );
    if (!fs.existsSync(to) || !skip) {
      const content = require(from)(name);
      const writer = fs.createWriteStream(to);
      writer.write(content);
      console.log(`${to} 写入成功`);
    }
  });
};

module.exports = gen;