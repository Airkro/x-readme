#!/usr/bin/env node

const Cheetor = require('cheetor');

new Cheetor()
  .command('./cwd/dev')
  .effect(({ scriptName }) => {
    process.title = scriptName;
  })
  .setup();
