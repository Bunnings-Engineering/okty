import dotenv from 'dotenv';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { commands } from './cmds/index.mjs';

dotenv.config();

yargs(hideBin(process.argv))
    .usage('Usage: <command> [options]')
    .command(commands).demandCommand(1, 'I knoweth not what thou wilt!, what is your command sire? (see usage for help)')    
    .help().alias('help', 'h').showHelpOnFail(false)       
    .example('okty init --orgUrl https://{domain}.okta.com --token 00Uj4jXul6Md3ND82ODaQKuvOzDNq2_1lWcK168Y5W')
    .example('okty listUsers')
    .epilogue(`Org URL: ${process.env.ORG_URL ?? 'not set, run okty init first!'}\nCall okty <commmand> -h to get usage for command.`)
    .argv;