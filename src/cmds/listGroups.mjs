import okta from '../client.js';
import out from '../libs/out.js';
import spin from '../libs/spin.js';

export const command = 'listGroups [options]';
export const desc = 'list groups (with find and filter options)';
export const builder = (yargs) => {
  return yargs
    .example('okty listGroups')
    .example('okty listGroups --find everyone')
    .example('okty listGroups --filter "type eq ""OKTA_GROUP"""')
    .option('find', {
      description: 'find groups by that match name or description',
      type: 'string'
    })
    .option('filter', {
      description: 'filter by expression (e.g. "type eq ""OKTA_GROUP""")',
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
    const groups = [];
    var options = buildSearchOptions(argv);
    return okta().listGroups(options)
      .each(group => groups.push(toSummary(group)))
      .catch((err) => out.log(`Error getting groups: ${err.message}`))
      .then(() => out.log(groups, argv.out));
  }, 'listing groups..');
}

function buildSearchOptions(argv) {
  var options = {};

  if (argv.find)
    options.q = argv.find;

  if (argv.filter)
    options.filter = argv.filter;

  return options;
}

function toSummary(group) {
  return {
    id: group.id,
    created: group.created,
    type: group.type,
    name: group.profile.name,
    description: group.profile.description
  };
}