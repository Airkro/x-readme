const { resolve } = require('path');
const { green } = require('chalk');
const { JsonToText } = require('fs-chain');

const generate = require('../lib/generate');

exports.command = 'dev';

exports.describe = 'Create as a devDependencies';

exports.builder = {};

exports.handler = () => {
  const filePath = resolve(process.cwd(), 'package.json');

  new JsonToText()
    .source(filePath)
    .handle(generate(exports.command))
    .output(resolve(process.cwd(), 'readme.md'));

  console.log(green('Success:'), filePath);
};
