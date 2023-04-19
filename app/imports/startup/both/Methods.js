import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import { Profiles } from '../../api/profiles/Profiles';

const setRoleMethod = 'Profiles.role';

/**
 * The server-side Profiles.update Meteor Method is called by the client-side Home page after pushing the update button.
 * Its purpose is to update the Profiles, ProfilesInterests, and ProfilesProjects collections to reflect the
 * updated situation specified by the user.
 */
Meteor.methods({
  'Profiles.role'({ _id, role }) {
    Roles.createRole(role, { unlessExists: true });
    Roles.setUserRoles(_id, role);
  },
});

const addProfileMethod = 'Profiles.add';

Meteor.methods({
  'Profiles.add'({ doc }) {
    const { email, password, name, role } = doc;
    console.log(doc);
    const userID = Accounts.createUser({ email, username: email, password });
    Roles.setUserRoles(userID, 'user');
    console.log(userID);
    Profiles.collection.insert({ userID, name, role }, (err) => {
      if (err) {
        console.log(err.reason);
        return false;
      } else {
        console.log('success');
        return true;
      }
      return true;
    });
  },
});

export { setRoleMethod, addProfileMethod };
