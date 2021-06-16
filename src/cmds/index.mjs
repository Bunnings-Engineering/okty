import * as init from './init.mjs';
import * as listUsers from './listUsers.mjs';
import * as importUsers from './importUsers.mjs';
import * as getUser from './getUser.mjs';
import * as deleteUser from './deleteUser.mjs';
import * as updateUser from './updateUser.mjs';
import * as getUserGroups from './getUserGroups.mjs';
import * as getUserApps from './getUserApps.mjs';
import * as getGroup from './getGroup.mjs';
import * as getGroupUsers from './getGroupUsers.mjs';
import * as listGroups from './listGroups.mjs';

export const commands = [init, listUsers, importUsers, getUser, deleteUser, updateUser, getUserGroups, getUserApps, listGroups, getGroup, getGroupUsers];