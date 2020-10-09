const { parse } = require('./tool');

module.exports = function getHeader({ logo, name, description }) {
  return [
    {
      type: 'heading',
      depth: 1,
      children: [
        {
          type: 'text',
          value: logo ? `${name} ` : name,
        },
        ...(logo
          ? [
              {
                type: 'html',
                value: `<img src="${logo}" alt="logo" height="80" align="right">`,
              },
            ]
          : []),
      ],
    },
    ...(description
      ? [
          {
            type: 'paragraph',
            children: parse(description.replace(/\.?$/, '.')).children,
          },
        ]
      : []),
  ];
};
