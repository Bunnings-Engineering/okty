import okta from '../client.js';
import spin from '../libs/spin.js';
export const command = 'deleteUser <id|login>';
export const desc = 'delete user';
export const builder = (yargs) => {
  return yargs
    .example('okty deleteUser robertjackson', 'by login')
    .example('okty 00uwbg4ku9Ppy8YfK0h7 robertjackson', 'by id')
}
export function handler(argv) {
  spin.do(() => {
    return okta().getUser(argv.login).then(user => {
      user.deactivate()
        .then(() => console.log(`{${argv.login}} has been deactivated`))
        .then(() => user.delete())
        .then(() => console.log(`{${argv.login}} has been deleted`))
        .catch((err) => console.log(`Error deleting  ${argv.login}: ${err.message}`));
    });
  });
}