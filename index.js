#!/usr/bin/env node

const { green } = require('chalk');
const yargs = require('yargs');

const {
  bin = {},
  homepage,
  repository: { url } = {},
} = require('./package.json');

process.title = 'x-readme';

const scriptName = Object.keys(bin)[0];
const repository = url.replace(/\.git$/, '');
const hasWebsite = homepage && homepage !== repository;

function find(pkg) {
  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    return require(pkg);
  } catch {
    return { command: '' };
  }
}

// eslint-disable-next-line no-unused-expressions
yargs
  .hide('help')
  .alias('help', 'h')
  .version(false)
  .demandCommand(1, "Won't work without a command")
  .detectLocale(false)
  .epilogue(`Repository: ${repository}`)
  .epilogue(hasWebsite ? `Website: ${homepage}` : green(' '))
  .epilogue(hasWebsite ? green(' ') : '')
  .scriptName(scriptName)
  .usage('')
  .usage(`Usage: ${green('$0')} <command>`)
  .command(find('./cwd/dev'))
  .strict().argv;
