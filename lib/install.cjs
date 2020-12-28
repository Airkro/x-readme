module.exports = function getInstall({ name, type }) {
  return [
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
      value: `npm install ${name} --save${type === 'dev' ? '-dev' : ''}`,
    },
  ];
};
