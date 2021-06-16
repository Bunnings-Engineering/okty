import fs from 'fs';
import spin from "../libs/spin.js";
import { checkClient } from '../client.js';

export const command = 'init [options]';
export const desc = 'initialise environment, configure orgUrl and key that will be used for subsequent commands.';
export const builder = (yargs) => {
  return yargs
    .example('okty init --orgUrl https://{domain}.okta.com --token 00Uj4jXul6Md3ND82ODaQKuvOzDNq2_1lWcK168Y5W')
    .option('orgUrl', {
      description: 'Organisation URL (okta), e.g. https://{domain}.okta.com',
      demand: true
    })
    .option('token', {
      description: 'Okta API Key for Organisation (e.g. 00Uj4jXul6Md3ND82ODaQKuvOzDNq2_1lWcK168Y5W)',
      demand: true
    });
}
export function handler(argv) {
  spin.do(() => {
    return checkClient(argv.orgUrl, argv.token)
    .then(() => persist(argv))
    .catch((err) => console.log(`${err.status}: ${err.errorSummary}`));
  });  
}

function persist(argv) {
  
  fs.writeFile(".env", `ORG_URL=${argv.orgUrl}\nTOKEN=${argv.token}`, (err) => {
    if (err)
      return console.log(err);
  });

  console.log(`Success! All subsequent commands will be in the context of "${argv.orgUrl}". Happy days!`);

}