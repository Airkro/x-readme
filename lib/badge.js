const qs = require('qs');

function shield(name, path, option) {
  const query = qs.stringify({ style: 'flat-square', ...option });
  return `https://img.shields.io/${path}/${name}.svg?${query}`;
}

module.exports = function getBadge({ name, repository: { url, directory } }) {
  const link = [
    {
      type: 'paragraph',
      children: [
        {
          type: 'linkReference',
          identifier: 'npm-url',
          label: 'npm-url',
          referenceType: 'full',
          children: [
            {
              type: 'imageReference',
              identifier: 'npm-badge',
              label: 'npm-badge',
              referenceType: 'full',
              alt: 'npm',
            },
          ],
        },
        {
          type: 'text',
          value: '\n',
        },
        {
          type: 'linkReference',
          identifier: 'github-url',
          label: 'github-url',
          referenceType: 'full',
          children: [
            {
              type: 'imageReference',
              identifier: 'github-badge',
              label: 'github-badge',
              referenceType: 'full',
              alt: 'github',
            },
          ],
        },
        {
          type: 'text',
          value: '\n',
        },
        {
          type: 'imageReference',
          identifier: 'node-badge',
          label: 'node-badge',
          referenceType: 'full',
          alt: 'node',
        },
      ],
    },
  ];

  const definition = [
    {
      type: 'definition',
      identifier: 'npm-url',
      label: 'npm-url',
      url: `https://www.npmjs.com/package/${name}`,
    },
    {
      type: 'definition',
      identifier: 'npm-badge',
      label: 'npm-badge',
      url: shield(name, 'npm/v', { logo: 'npm' }),
    },
    {
      type: 'definition',
      identifier: 'github-url',
      label: 'github-url',
      url: [url.replace(/.git$/, ''), directory]
        .filter(Boolean)
        .join('/tree/master/'),
    },
    {
      type: 'definition',
      identifier: 'github-badge',
      label: 'github-badge',
      url: shield(name, 'npm/l', { colorB: 'blue', logo: 'github' }),
    },
    {
      type: 'definition',
      identifier: 'node-badge',
      label: 'node-badge',
      url: shield(name, 'node/v', {
        colorB: 'green',
        logo: 'node.js',
      }),
    },
  ];
  return [...link, ...definition];
};
