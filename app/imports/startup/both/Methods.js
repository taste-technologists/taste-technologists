import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

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

export { setRoleMethod };
