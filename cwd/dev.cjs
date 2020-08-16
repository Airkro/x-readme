'use strict';

const { JsonToText } = require('fs-chain');
const generate = require('../lib/generate.cjs');

exports.command = 'dev';

exports.describe = 'Create as a devDependencies';

exports.builder = {};

exports.handler = () => {
  new JsonToText()
    .source('package.json')
    .onFail()
    .onDone(generate(exports.command))
    .output('README.md')
    .logger('README.md')
    .catch(console.warn);
};
