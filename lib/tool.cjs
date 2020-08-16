'use strict';

const remark = require('remark');

const { parse, stringify } = remark().data('settings', {
  commonmark: true,
  listItemIndent: 1,
  tightDefinitions: true,
});

module.exports = { parse, stringify };
