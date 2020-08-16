'use strict';

function commandData(help, command) {
  if (!(help && command)) {
    return [];
  }

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

module.exports = function getCommand({ help, command }) {
  const commands = commandData(help, command);

  return commands.length === 0
    ? []
    : [
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
        ...commands.flatMap(([commandName, describe]) =>
          [
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
            describe
              ? {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      value: describe.replace(/\.?$/, '.'),
                    },
                  ],
                }
              : undefined,
          ].filter(Boolean),
        ),
      ];
};
