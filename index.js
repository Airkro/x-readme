#!/usr/bin/env node

const { resolve } = require('path');
const { green } = require('chalk');
const yargs = require('yargs');
const { JsonToText } = require('fs-chain');

const {
  bin = {},
  homepage,
  repository: { url } = {},
} = require('./package.json');

const { pkg2readme } = require('./lib');

const scriptName = Object.keys(bin)[0];
const repository = url.replace(/\.git$/, '');
const hasWebsite = homepage && homepage !== repository;

// eslint-disable-next-line no-unused-expressions
yargs
  .epilogue(`Repository: ${repository}`)
  .epilogue(hasWebsite ? `Website: ${homepage}` : green(' '))
  .epilogue(hasWebsite ? green(' ') : '')
  .scriptName(scriptName)
  .usage('')
  .usage(`Usage: ${green('$0')}`)
  .hide('help')
  .alias('help', 'h')
  .version(false)
  .detectLocale(false)
  .strict().argv;

new JsonToText()
  .source(resolve(process.cwd(), 'package.json'))
  .handle(pkg2readme)
  .output(resolve(process.cwd(), 'readme.md'));
