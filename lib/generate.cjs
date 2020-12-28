const { execSync } = require('child_process');

const getBadge = require('./badge.cjs');
const getCommand = require('./command.cjs');
const getHeader = require('./header.cjs');
const getInstall = require('./install.cjs');
const getUsage = require('./usage.cjs');

const { stringify } = require('./tool.cjs');

function getHelp(command) {
  return execSync(
    command === 'x-readme' ? 'node index.cjs -h' : `npx -c "${command} -h"`,
  )
    .toString()
    .trim();
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
    const [command] = Object.keys(bin);
    const help = command ? getHelp(command) : undefined;

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
