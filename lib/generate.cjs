const { execSync } = require('child_process');
const { decode } = require('iconv-lite');

const getBadge = require('./badge.cjs');
const getCommand = require('./command.cjs');
const getHeader = require('./header.cjs');
const getInstall = require('./install.cjs');
const getUsage = require('./usage.cjs');

const { stringify } = require('./tool.cjs');

function getHelp(script) {
  return decode(
    Buffer.from(execSync(`node ${script} -h`, { encoding: 'binary' })),
    'gb2312',
  ).trim();
}

module.exports = function generate(type) {
  return ({
    bin = {},
    description,
    name,
    private: isPrivate,
    repository,
    'x-readme': { logo } = {},
  }) => {
    const [[command, script]] = Object.entries(bin);
    const help = command ? getHelp(script) : undefined;

    return stringify({
      type: 'root',
      children: [
        ...getHeader({ name, description, isPrivate, logo }),
        ...(isPrivate ? [] : getBadge({ name, repository })),
        ...getInstall({ name, type }),
        ...getUsage({ help }),
        ...getCommand({ help, command }),
      ],
    });
  };
};
