import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Recipes } from '../../api/recipes/Recipes';
import { Inventory } from '../../api/vendor/VendorInventory';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Stuffs.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.collection.find({ owner: username });
  }
  return this.ready();
});

// User-level publication.
// If logged in, then publish recipes owned by this user. Otherwise publish nothing.
Meteor.publish(Recipes.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Recipes.collection.find({ owner: username });
  }
  return this.ready();
});

// User-level publication.
// If logged in then publish all items in inventory.
Meteor.publish(Inventory.userPublicationName, function () {
  if (this.userId) {
    return Inventory.collection.find();
  }
  return this.ready();
});

// General publication.
// If logged in, then publish all recipes.
Meteor.publish(Recipes.generalPublicationName, function () {
  if (this.userId) {
    return Recipes.collection.find();
  }
  return this.ready();
});

// Vendor-level publication.
// If logged in and with vendor role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Inventory.vendorPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'vendor')) {
    return Inventory.collection.find();
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Stuffs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.collection.find();
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all recipes from all users. Otherwise publish nothing.
Meteor.publish(Recipes.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Recipes.collection.find();
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all items from all users. Otherwise publish nothing.
Meteor.publish(Inventory.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Inventory.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

Meteor.publish('userData', function () {
  const isAdmin = Roles.userIsInRole(this.userId, ['admin', 'superadmin']);
  if (isAdmin) {
    return [Meteor.users.find({}, { fields: {
      _id: 1,
      username: 1,
      emails: 1,
    } }),
    Meteor.roleAssignment.find(),
    ];
  }
  return null;
});
