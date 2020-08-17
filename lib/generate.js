const { execSync } = require('child_process');

const getBadge = require('./badge');
const getCommand = require('./command');
const getHeader = require('./header');
const getInstall = require('./install');
const getUsage = require('./usage');

const { stringify } = require('./tool');

function getHelp(command) {
  return execSync(
    command === 'x-readme' ? 'node index -h' : `npx -c "${command} -h"`,
  )
    .toString()
    .trim();
}

module.exports = function generate(type) {
  return ({ bin, description, name, private: isPrivate, repository }) => {
    const [command] = Object.keys(bin);
    const help = getHelp(command);

    return stringify({
      type: 'root',
      children: [
        ...getHeader({ name, description, isPrivate }),
        ...(isPrivate ? [] : getBadge({ name, repository })),
        ...getInstall({ name, type }),
        ...getUsage({ help }),
        ...getCommand({ help, command }),
      ],
    });
  };
};