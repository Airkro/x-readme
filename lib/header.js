const { parse } = require('./tool');

module.exports = function getHeader({ name, description }) {
  return [
    {
      type: 'heading',
      depth: 1,
      children: [
        {
          type: 'text',
          value: name,
        },
      ],
    },
    {
      type: 'paragraph',
      children: parse(description.replace(/\.?$/, '.')).children,
    },
  ];
};