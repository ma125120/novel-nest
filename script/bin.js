#! /usr/bin/env node

const gen = require('./create');
const program = require('commander');
const fs = require('fs-extra');
const path = require('path');

program
  .option('-n, --name <name>', '需要生成的模块名')
  .option('-s, --skip', '当文件已存在时，是否跳过', false)
  .option('-d, --dir <dir>', '相对于哪个目录', './src')
  .parse(process.argv);

const CD = process.cwd();
// const Config = program.config || 'tsg1.js';
const ConfigDir = path.join(CD, program.dir, program.name);

if (!fs.existsSync(ConfigDir)) {
  fs.mkdir(ConfigDir);
}
if (!fs.existsSync(ConfigDir + '/dto')) {
  fs.mkdir(ConfigDir + '/dto');
}
if (!fs.existsSync(ConfigDir + '/controller')) {
  fs.mkdir(ConfigDir + '/controller');
}

gen(program.name, ConfigDir, program.skip);


