import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Profiles } from '../../api/profiles/Profiles';

/* eslint-disable no-console */

const createUser = (email, password, role, name) => {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
  });
  if (role === 'superadmin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'superadmin');
  }
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
  if (role === 'vendor') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'vendor');
  }
  if (role === 'user') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'user');
  }
  Profiles.collection.insert({ userID, name, role });
};

// When running app for first time, pass a settings file to set up a default user account.
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.forEach(({ email, password, role, name }) => createUser(email, password, role, name));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
