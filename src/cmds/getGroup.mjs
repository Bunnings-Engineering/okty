import okta from '../client.js';
import out from '../libs/out.js';
import spin from '../libs/spin.js';

export const command = 'getGroup <id>';
export const desc = 'get group details by id ';
export const builder = (yargs) => {
  return yargs
    .example('okty getGroup 00grnkuh8p4zkmqef0h7', 'by id')
    .option('out', {
      alias: 'o',
      description: 'specify output format',
      choices: ['table', 'json', 'csv'],
      coerce: (opt => opt.toLowerCase())
    });
}
export function handler(argv) {
  spin.do(() => {
    return okta().getGroup(argv.id)
      .then(group => out.log(toSummary(group), argv.out))
      .catch((err) => out.log(`Error getting ${argv.id}: ${err.message}`));
  }, 'getting group..');
}

function toSummary(group) {
  return {
    id: group.id,
    type: group.type,
    created: group.created,
    lastUpdated: group.lastUpdated,
    lastMembershipUpdated: group.lastMembershipUpdated,
    profile: group.profile
  };
}