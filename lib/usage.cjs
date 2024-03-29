'use strict';

function usageScript(help) {
  try {
    return help
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.startsWith('Usage:'))
      .map((line) => line.replace(/Usage:\s?/, 'npx --no-install '))
      .join('\n');
  } catch {
    return 'Error: usage not found';
  }
}

module.exports = function getUsage({ help }) {
  return help
    ? [
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
          value: usageScript(help),
        },
      ]
    : [];
};
