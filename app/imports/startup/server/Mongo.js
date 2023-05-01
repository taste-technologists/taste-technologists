import { Meteor } from 'meteor/meteor';
import { Recipes } from '../../api/recipes/Recipes';
import { Inventory } from '../../api/vendor/VendorInventory';
import { Vendor } from '../../api/vendor/Vendors';
import { addRecipeMethod } from '../both/Methods';

/* eslint-disable no-console */

// Initialize the database with a default recipe document.
const addRecipe = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Meteor.call(addRecipeMethod, { data });
};

// Initialize the Recipes and RecipeReviews Collection if empty.
if (Recipes.collection.find().count() === 0) {
  if (Meteor.settings.defaultRecipes) {
    console.log('Creating default recipes.');
    Meteor.settings.defaultRecipes.forEach(data => addRecipe(data));
  }
}
// Initialize the database with a default inventory document.
const addItem = (data) => {
  const toTitleCase = (str) => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  const { name, item, price, size } = data;
  const doc = { name, item: toTitleCase(item), price, size };
  console.log(`  Adding: ${data.name} (${data.item})`);
  Inventory.collection.insert(doc);
};

// Initialize the InventoryCollection if empty.
if (Inventory.collection.find().count() === 0) {
  if (Meteor.settings.defaultItem) {
    console.log('Creating default inventory.');
    Meteor.settings.defaultItem.forEach(data => addItem(data));
  }
}

// Initialize the database with a default inventory document.
const addVendor = (data) => {
  console.log(`  Adding: ${data.name} (${data.hours})`);
  Vendor.collection.insert(data);
};

// Initialize the VendorCollection if empty.
if (Vendor.collection.find().count() === 0) {
  if (Meteor.settings.defaultVendor) {
    console.log('Creating default vendors.');
    Meteor.settings.defaultVendor.forEach(data => addVendor(data));
  }

}

/**
   * If the loadAssetsFile field in settings.development.json is true, then load the data in private/data.json.
   * This approach allows you to initialize your system with large amounts of data.
   * Note that settings.development.json is limited to 64,000 characters.
   * We use the "Assets" capability in Meteor.
   * For more info on assets, see https://docs.meteor.com/api/assets.html
   * User count check is to make sure we don't load the file twice, which would generate errors due to duplicate info.
   */
if ((Meteor.settings.loadAssetsFile) && (Recipes.collection.find().count() < 3)) {
  const assetsFileName = 'data.json';
  console.log(`Loading data from private/${assetsFileName}`);
  // eslint-disable-next-line no-undef
  const jsonData = JSON.parse(Assets.getText(assetsFileName));
  jsonData.groceries.map(data => addItem(data));
  jsonData.recipes.map(data => addRecipe(data));
}
