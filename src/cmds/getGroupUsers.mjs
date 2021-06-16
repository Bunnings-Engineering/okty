import okta from '../client.js';
import out from '../libs/out.js';
import spin from '../libs/spin.js';
import _ from 'lodash';

export const command = 'getGroupUsers <id>';
export const desc = 'get applications that user is linked to either directly or indirectly (via group membership)';
export const builder = (yargs) => {
  return yargs
    .example('okty getGroupUsers 00grnkuh8p4zkmqef0h7', 'by id')
    .option('find', {
      description: 'find users by that match firstname, lastname or email',
      type: 'string'
    })
    .option('search', {
      description: 'search by expression (e.g. "profile.firstName eq ""David""")',
      type: 'string'
    })
    .option('filter', {
      description: 'filter by expression (e.g. "status eq ""ACTIVE""")',
      type: 'string'
    })
    .option('out', {
      alias: 'o',
      description: 'specify output format',
      choices: ['table', 'json', 'csv'],
      coerce: (opt => opt.toLowerCase())
    });
}
export function handler(argv) {  
  spin.do(() => {
    const users = [];
    var options = buildSearchOptions(argv);
    return okta().getGroup(argv.id)
      .then(user => user.listUsers(options).each((user) => users.push(toSummary(user))))
      .catch((err) => out.log(`Error getting user for group ${argv.id}: ${err.message}`))
      .then(() => out.log(users, argv.out));
  }, 'getting group users..');
}

function toSummary(user) {
  return {
    id: user.id,
    bid: user.profile.alternative_id,
    firstName: user.profile.firstName,
    lastName: user.profile.lastName,
    login: user.profile.login,
    email: user.profile.email,
    status: user.status,
    hasRecoveryAnswer: !_.isEmpty(user?.credentials?.recovery_question)
  }
}

function buildSearchOptions(argv) {
  var options = {};

  if (argv.find)
    options.q = argv.find;

  if (argv.search)
    options.search = argv.search;

  if (argv.filter)
    options.filter = argv.filter;

  return options;
}