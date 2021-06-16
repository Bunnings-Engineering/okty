import okta from '@okta/okta-sdk-nodejs';

export default function createClient() {

    if (process.env.ORG_URL === undefined || process.env.TOKEN === undefined)
        throw new Error('Org URL or Token not set. Please run okty init.');

    return new okta.Client({
        orgUrl: process.env.ORG_URL,
        token: process.env.TOKEN,
    });
}

export function checkClient(orgUrl, token) {
        
    if (orgUrl === undefined || token === undefined)
        throw new Error('Org URL or Token not set. Please run okty init.');

    const client = new okta.Client({
        orgUrl: orgUrl,
        token: token,
        userAgent: 'okty v1.0.0' // TODO: Read from package.json or $env (note: can't import or require json in ES6 module)
    });
        
    return client.listUsers({ q: '@@@', limit: 1 }) // :( need to call a command in order to confirm that the client config is correct 
        .each();
}