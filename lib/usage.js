function usageScript(help) {
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

module.exports = function getUsage({ help }) {
  return [
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
  ];
};
