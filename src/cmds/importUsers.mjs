import okta from '../client.js';
import csv from 'csvtojson';
import spin from '../libs/spin.js';
export const command = 'importUsers [options]';
export const desc = 'import users from csv file';
export const builder = (yargs) => {
  return yargs
    .example('okty importUsers --file data/users3.csv')
    .option('file', {
      description: 'CSV user import file',
      demand: true
    });
}
export function handler(argv) {
  spin.do(() => {
    return csv()
      .fromFile(argv.file)
      .then((users) => {
        const newUsers = users.map((user) => { return toOktaUser(user); })
        newUsers.forEach((user) => {
          okta().createUser(user)
            .then(usr => console.log(`Created ${user.profile.login}`))
            .catch((err) => console.log(`Error creating ${user.profile.login}: ${err.message}`))
        });
      });
  }, 'importing users...');
}

function toOktaUser(user, groupIds) {
  return {
    profile: user,
    credentials: {
      password: {
        hook: {
          type: 'default'
        }
      }
    },
    groupIds: user.groupIds?.split(',')
  };
}