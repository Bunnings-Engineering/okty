import okta from '../client.js';
import spin from '../libs/spin.js';
export const command = 'updateUser <id|login>';
export const desc = 'update user details';
export const builder = (yargs) => {
  return yargs
    .example('okty updateUser robertjackson --creds "{\\"password\\":{\\"value\\":\\"tlpWENT2m\\"},\\"recovery_question\\":{\\"question\\":\\"Who\'s a major player in the cowboy scene?\\",\\"answer\\":\\"Annie Oakley\\"},\\"provider\":{\\"type\":\\"OKTA\",\\"name\\":\\"OKTA\\"}}"')
    .example('okty updateUser 00uwbg4ku9Ppy8YfK0h7 --profile "{\\"nickName\\":\\"fabby\\",\\"email\\":\\"FABCO@fake.au\\"}"')
    .option('profile', {
      description: 'JSON (escaped) representation of users profile (see https://developer.okta.com/docs/reference/api/users/#profile-object)',
      type: 'string'
    })
    .option('creds', {
      description: 'JSON (escaped) representation of users credentials (see https://developer.okta.com/docs/reference/api/users/#credentials-object)',
      type: 'string'
    })
    .coerce({
      cred: JSON.parse
    });
}
export function handler(argv) {
  spin.do(() => {
    return okta().getUser(argv.login).then(user => {

      if (argv.profile)
        var login = user.profile.login;

      user.profile = JSON.parse(argv.profile);
      user.profile.login = login; // don't change login

      if (argv.creds)
        user.credentials = JSON.parse(argv.creds);

      user.update()
        .then(() => console.log(`{${argv.login}} has been updated`))
        .catch((err) => console.log(`Error updating ${argv.login}: ${err} `));
    });
  });
}