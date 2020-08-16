#!/usr/bin/env node

'use strict';

const { Cheetor } = require('cheetor');

new Cheetor('./package.json', __dirname)
  .commandFrom('./cwd/dev.cjs')
  .effect(({ scriptName }) => {
    process.title = scriptName;
  })
  .setup();
