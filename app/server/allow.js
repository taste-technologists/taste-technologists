import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

// Allow admin users to remove any account
Meteor.users.allow({
  remove: function (_id) {
    return Roles.userIsInRole(_id, ['admin', 'superadmin']);
  },
});
