import okta from '../client.js';
import out from '../libs/out.js';
import spin from '../libs/spin.js';

export const command = 'getUserGroups <id|login>';
export const desc = 'get groups that user is assigned to.';
export const builder = (yargs) => {
  return yargs
    .example('okty getUserGroups robertjackson', 'by login')
    .example('okty getUserGroups 00uwbg4ku9Ppy8YfK0h7', 'by id')
    .option('out', {
      alias: 'o',
      description: 'specify output format',
      choices: ['table', 'json', 'csv'],
      coerce: (opt => opt.toLowerCase())
    })
}
export function handler(argv) {
  spin.do(() => {
    const groups = [];
    return okta().getUser(argv.login)
      .then(user => user.listGroups().each((group) => groups.push(toSummary(group))))
      .catch((err) => out.log(`Error getting groups for ${argv.login}: ${err.message}`))
      .then(() => out.log(groups, argv.out));
  });
}

function toSummary(group) {
  return {
    type: group.type,
    created: group.created,
    name: group.profile.name,
    description: group.profile.description
  }
}