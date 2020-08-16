const { execSync } = require('child_process');
const qs = require('qs');
const remark = require('remark');

const { parse, stringify } = remark().data('settings', {
  commonmark: true,
  listItemIndent: 1,
  tightDefinitions: true,
});

function shield(name, path, option) {
  const query = qs.stringify({ style: 'flat-square', ...option });
  return `https://img.shields.io/${path}/${name}.svg?${query}`;
}

function getHelp(command) {
  return execSync(
    command === 'x-readme' ? 'node index -h' : `npx -c "${command} -h"`,
  )
    .toString()
    .trim();
}

function getUsage(help) {
  try {
    return help
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.startsWith('Usage:'))
      .map((line) => line.replace(/Usage:\s?/, 'npx -c '))
      .join('\n');
  } catch {
    return 'Error: usage not found';
  }
}

function getCommand(help, command) {
  const text = help
    .split('\n\n')
    .find((group) => group.startsWith('Commands:'));

  return text
    ? text
        .replace(/^Commands:/, '')
        .trim()
        .split('\n')
        .map((line) =>
          line.replace(new RegExp(`^\\s*${command}\\s`), '').split(/\s{2,9}/),
        )
    : [];
}

function pkg2readme({
  bin,
  description,
  name,
  private: isPrivate,
  repository: { url, directory },
}) {
  const [command] = Object.keys(bin);

  const link = isPrivate
    ? []
    : [
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

  const definition = isPrivate
    ? []
    : [
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

  const help = getHelp(command);
  const commands = getCommand(help, command);

  return stringify({
    type: 'root',
    children: [
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
      ...link,
      {
        type: 'heading',
        depth: 2,
        children: [
          {
            type: 'text',
            value: 'Installation',
          },
        ],
      },
      {
        type: 'code',
        lang: 'bash',
        value: `npm install ${name}`,
      },
      {
        type: 'heading',
        depth: 2,
        children: [
          {
            type: 'text',
            value: 'Usage',
          },
        ],
      },
      {
        type: 'code',
        lang: 'bash',
        value: getUsage(help),
      },
      ...(commands.length > 0
        ? [
            {
              type: 'heading',
              depth: 2,
              children: [
                {
                  type: 'text',
                  value: 'Commands',
                },
              ],
            },
          ]
        : []),
      ...commands.flatMap(([commandName, describe]) => [
        {
          type: 'heading',
          depth: 3,
          children: [
            {
              type: 'text',
              value: commandName,
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              value: describe.replace(/\.?$/, '.'),
            },
          ],
        },
      ]),
      ...definition,
    ],
  });
}

module.exports = { pkg2readme };
