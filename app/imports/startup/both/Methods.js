import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import { Profiles } from '../../api/profiles/Profiles';
import { Recipes } from '../../api/recipes/Recipes';

const setRoleMethod = 'Profiles.role';

/**
 * The server-side Profiles.update Meteor Method is called by the client-side Home page after pushing the update button.
 * Its purpose is to update the Profiles, ProfilesInterests, and ProfilesProjects collections to reflect the
 * updated situation specified by the user.
 */
Meteor.methods({
  'Profiles.role'({ _id, role }) {
    // console.log(_id);
    Roles.createRole(role, { unlessExists: true });
    Roles.setUserRoles(_id, role);
    Profiles.collection.update(
      { userID: _id },
      { $set: { role: role } },
    );

  },
});

const addProfileMethod = 'Profiles.add';

Meteor.methods({
  'Profiles.add'({ doc }) {
    const { email, password, name, vendor } = doc;
    const role = 'user';
    const userID = Accounts.createUser({ email, username: email, password });
    Roles.setUserRoles(userID, role);
    const makeVendor = vendor === 'Yes';
    try {
      Profiles.collection.insert({ userID, email, name, role, vendor: makeVendor });
      return { success: true };
    } catch (error) {
      throw new Meteor.Error('add-profile-failed', 'Failed to add user profile');
    }
  },
});

const removeProfileMethod = 'Profiles.remove';

Meteor.methods({
  'Profiles.remove'({ userId, email }) {
    Meteor.users.remove(userId);
    Profiles.collection.remove({ userID: userId });
    Recipes.collection.update(
      { favoriteBy: email },
      { $pull: { favoriteBy: email } },
      { multi: true },
    );
  },
});

const removeRecipeMethod = 'Recipes.remove';

Meteor.methods({
  'Recipes.remove'({ _id }) {
    // console.log(`Remove recipe ${_id}`);
    Recipes.collection.remove({ _id: _id });
  },
});

export { setRoleMethod, addProfileMethod, removeProfileMethod, removeRecipeMethod };
