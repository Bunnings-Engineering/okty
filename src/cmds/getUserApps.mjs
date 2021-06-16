import okta from '../client.js';
import out from '../libs/out.js';
import spin from '../libs/spin.js';

export const command = 'getUserApps <id|login>';
export const desc = 'get applications that user is linked to either directly or indirectly (via group membership)';
export const builder = (yargs) => {
  return yargs
    .example('okty getUserApps robertjackson', 'by login')
    .example('okty getUserApps 00uwbg4ku9Ppy8YfK0h7', 'by id')
    .option('out', {
      alias: 'o',
      description: 'specify output format',
      choices: ['table', 'json', 'csv'],
      coerce: (opt => opt.toLowerCase())
    })
}
export function handler(argv) {
  spin.do(() => {
    const apps = [];
    return okta().getUser(argv.login)
      .then(user => user.listAppLinks().each((app) => apps.push(toSummary(app))))
      .catch((err) => out.log(`Error getting apps for ${argv.login}: ${err.message}`))
      .then(() => out.log(apps, argv.out));
  });
}

function toSummary(app) {
  return {
    name: app.appName,
    label: app.label,
    link: app.linkUrl
  }
}