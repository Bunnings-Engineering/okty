# Okty

CLI Okta user account management. 

## Usage

``` sh
Usage: <command> [options] --env [string]

Commands:
  okty.js init [options]         initialise environment, configure orgUrl and ke
                                 y that will be used for subsequent commands.
  okty.js listUsers [options]    list users (with search and filter options)
  okty.js importUsers [options]  import users from csv file
  okty.js getUser [options]      get user details
  okty.js deleteUser [options]   delete user

Options:
      --version  Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]

Examples:
  okty init --orgUrl https://{domain}.okta.com --token 00Uj4jXul6Md3ND82ODaQKu
  vOzDNq2_1lWcK168Y5W
  okty listUsers

Org URL: https://{org}-admin.okta.com
Call okty <commmand> -h to get usage for command.

```

## Examples

Initialise orgURL and token. All subsequent commands with use these values when calling Okta API for your organisation.

``` sh
okty init --orgUrl https://{domain}.okta.com --token 00Uj4jXul6Md3ND82ODaQKu
```

Import all users from ```users.csv``` into local okta environment.

``` sh
okty importUsers --file node\okty\data\users3.csv

Created cat.stevens@acme.com.au
Created bob.sieger@acme.com.au
Created ash.thompson@acme.com.au
```

List all user's in organisation.

``` sh
okty listUsers

┌──────────────────────┬───────────┬────────────┬────────────────────────────────┬────────────────────────────────┬──────────┐
│       (index)        │ firstName │  lastName  │             login              │             email              │  status  │
├──────────────────────┼───────────┼────────────┼────────────────────────────────┼────────────────────────────────┼──────────┤
│ 00u3zc9nu7lsQnfLW5d6 │   'cat'   │ 'stevens'  │ 'cat.stevens@acme.com.au'      │ 'cat.stevens@acme.com.au'      │ 'ACTIVE' │
│ 00u3zckwyqn2lr5v55d6 │   'ash'   │ 'thompson' │ 'ash.thompson@acme.com.au'     │ 'ash.thompson@acme.com.au'     │ 'ACTIVE' │
│ 00u3zct8qJBZHJpMt5d6 │   'bob'   │  'sieger'  │  'bob.sieger@acme.com.au'      │  'bob.sieger@acme.com.au'      │ 'ACTIVE' │
└──────────────────────┴───────────┴────────────┴────────────────────────────────┴────────────────────────────────┴──────────┘
```

Get a specific user's details.

``` sh
okty getUser --login ash.thompson@acme.com.au

{                                                                       
  id: '00u3zckwyqn2lr5v55d6',                                           
  status: 'ACTIVE',                                                     
  created: '2021-01-19T06:39:31.000Z',                                  
  activated: '2021-01-19T06:39:31.000Z',                                
  statusChanged: '2021-01-19T06:39:31.000Z',                            
  lastLogin: null,                                                      
  lastUpdated: '2021-01-19T06:39:31.000Z',                              
  passwordChanged: '2021-01-19T06:39:31.000Z',                          
  type: UserType { id: 'oty3y8um2W754Hqri5d6' },                        
  profile: UserProfile {                                                
    firstName: 'ash',                                                   
    lastName: 'thompson',                                               
    mobilePhone: null,                                                  
    secondEmail: null,                                                  
    login: 'ash.thompson@acme.com.au',                              
    email: 'ash.thompson@acme.com.au'                               
  },                                                                    
  credentials: UserCredentials {                                        
    password: PasswordCredential {},                                    
    provider: AuthenticationProvider { type: 'IMPORT', name: 'IMPORT' } 
  }                                                                     
}
```

Delete a specific user.

``` sh
okty deleteUser -e lcl --login bob.sieger@acme.com.au

{bob.sieger@acme.com.au} has been deactivated
{bob.sieger@acme.com.au} has been deleted
```