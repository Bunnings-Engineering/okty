import okta from '../client.js';
import out from '../libs/out.js';
import spin from '../libs/spin.js';

export const command = 'getUser <id|login>';
export const desc = 'get user details by id or login';
export const builder = (yargs) => {
  return yargs
    .example('okty getUser robertjackson', 'by login')
    .example('okty getUser 00uwbg4ku9Ppy8YfK0h7', 'by id')
    .option('out', {
      alias: 'o',
      description: 'specify output format',
      choices: ['table', 'json', 'csv'],
      coerce: (opt => opt.toLowerCase())
    })
}
export function handler(argv) {
  spin.do(() => {
    return okta().getUser(argv.login)
      .then(user => out.log(toSummary(user), argv.out))
      .catch((err) => out.log(`Error getting ${argv.login}: ${err.message}`));
  });
}

function toSummary(user) {
  return {
    id: user.id,
    status: user.status,
    created: user.created,
    activated: user.activated,
    statusChanged: user.statusChanged,
    lastLogin: user.lastLogin,
    lastUpdated: user.lastUpdated,
    passwordChanged: user.passwordChanged,
    type: user.type,
    profile: user.profile,
    credentials: user.credentials
  };
}