import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Recipes } from '../../api/recipes/Recipes';
import { Inventory } from '../../api/vendor/VendorInventory';
import { Vendors } from '../../api/vendor/Vendors';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}

// Initialize the database with a default recipe document.
const addRecipe = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Recipes.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Recipes.collection.find().count() === 0) {
  if (Meteor.settings.defaultRecipes) {
    console.log('Creating default recipes.');
    Meteor.settings.defaultRecipes.forEach(data => addRecipe(data));
  }

}// Initialize the database with a default inventory document.
const addItem = (data) => {
  console.log(`  Adding: ${data.vendor} (${data.item})`);
  Inventory.collection.insert(data);
};

// Initialize the database with a default vendor document.
const addVendor = (data) => {
  console.log(`  Adding: ${data.name} (${data.location})`);
  Vendors.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Inventory.collection.find().count() === 0) {
  if (Meteor.settings.defaultItem) {
    console.log('Creating default recipes.');
    Meteor.settings.defaultItem.forEach(data => addItem(data));
  }
}

// Initialize the VendorsCollection if empty.
if (Vendors.collection.find().count() === 0) {
  if (Meteor.settings.defaultVendors) {
    console.log('Creating default vendors.');
    Meteor.settings.defaultVendors.forEach(data => addVendor(data));
  }
}
