import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import { Profiles } from '../../api/profiles/Profiles';
import { Recipes } from '../../api/recipes/Recipes';
import { RecReviews } from '../../api/recipes/RecipeReviews';
import { RecFaves } from '../../api/recipes/RecipeFav';

const setRoleMethod = 'Profiles.role';

/**
 * The server-side Profiles.role Meteor Method is called by the client-side Home page after pushing the update button.
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

/**
 * The server-side Profiles.add Meteor Method is called by the client-side Sign-up page
 * after the user clicks submit.
 * Its purpose is to create the Meteor account and add their info to the Profiles
 * collection to include the newly created account.
 */
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

/**
 * The server-side Profiles.remove Meteor Method is called by the client-side admin page
 * after the admin clicks delete.
 * Its purpose is to remove the userdata from Meteor Account, Profiles, and Recipes (favoriteBy)
 * and Recipe Review collections.
 */
const removeProfileMethod = 'Profiles.remove';

Meteor.methods({
  'Profiles.remove'({ userId, email }) {
    // Removes user's account from the application.
    Meteor.users.remove(userId);
    Profiles.collection.remove({ userID: userId });
    // removes user from the favoriteBy for this recipe
    Recipes.collection.update(
      { favoriteBy: email },
      { $pull: { favoriteBy: email } },
      { multi: true },
    );
    // removes reviews created by this user.
    RecReviews.collection.update(
      { 'review.userID': userId },
      { $pull: { review: { userID: userId } } },
      { multi: true },
    );
  },
});

/**
 * The server-side Recipe.add Meteor Method is called by both client and server side.
 * Its purpose is to add the recipe to the Recipe and RecipeReview Collection.
 * collections.
 */

const addRecipeMethod = 'Recipes.add';

Meteor.methods({
  'Recipes.add'({ data }) {
    const { name } = data;
    const recId = Recipes.collection.insert(data);
    const recipe = { name: name, recipeId: recId, review: [] };
    const fave = { name: name, recipeId: recId, favoriteBy: [] };
    RecReviews.collection.insert(recipe);
    RecFaves.collection.insert(fave);
    console.log(`Successfully added ${name} into Recipes`);
    console.log(`Successfully added ${name} into RecipesReviews`);
    console.log(`Successfully added ${name} into RecipesFaves`);
  },
});

/**
 * The server-side Recipes.remove Meteor Method is called by client side.
 * Its purpose is to remove the recipe from the Recipe and RecipeReview Collection.
 * collections.
 */
const removeRecipeMethod = 'Recipes.remove';

Meteor.methods({
  'Recipes.remove'({ _id }) {
    // console.log(`Remove recipe ${_id}`);
    Recipes.collection.remove({ _id: _id });
    // Removes the reviewcollection object corresponding to this recipe.
    RecReviews.collection.remove({ recipeId: _id });
  },
});

/**
 * The server-side Review.add Meteor Method is called by both client side.
 * Its purpose is to add the recipe review to the RecipeReview Collection.
 */
const addReviewMethod = 'Review.add';

Meteor.methods({
  'Review.add'({ recipeId, reviewInfo }) {
    // Pulls the old review
    RecReviews.collection.update(
      { recipeId: recipeId },
      { $pull: { review: { userID: reviewInfo.userID } } },
    );

    // Add the new review
    RecReviews.collection.update(
      { recipeId: recipeId },
      { $addToSet: { review: reviewInfo } },
    );
    console.log('Successfully added into RecipesReviews');
  },
});

const addFavMethod = 'Fave.add';

Meteor.methods({
  'Fave.add'({ recipeId, user }) {
    // console.log(recipeId, user);
    // Add the new review
    RecFaves.collection.update(
      { recipeId: recipeId },
      { $addToSet: { favoriteBy: user } },
    );
    console.log('Successfully added into RecipesReviews');
  },
});

const delFavMethod = 'Fave.del';

Meteor.methods({
  'Fave.del'({ recipeId, user }) {
    // Add the new review
    RecFaves.collection.update(
      { recipeId: recipeId },
      { $pull: { favoriteBy: user } },
    );
    console.log('Successfully deleted from RecipesReviews');
  },
});

/**
 * The server-side Review.delete Meteor Method is called by both client side.
 * Its purpose is to delete the recipe review from the RecipeReview Collection.
 */
const delReviewMethod = 'Review.delete';
Meteor.methods({
  'Review.delete'({ recipeId, reviewInfo }) {
    RecReviews.collection.update(
      { recipeId: recipeId },
      { $pull: { review: { userID: reviewInfo.userID } } },
    );
    console.log('Successfully removed from RecipesReviews');
  },
});

const wipeoutMethod = 'Review.wipeout';
Meteor.methods({
  'Review.wipeout'() {
    RecReviews.collection.update(
      {}, // Filter to match all documents
      { $set: { review: [] } }, // Update to set review array to empty
      { multi: true }, // Option to update multiple documents
    );
    console.log('You just wiped everything...');
  },
});

export { setRoleMethod, addProfileMethod, removeProfileMethod, addRecipeMethod, removeRecipeMethod, addReviewMethod, delReviewMethod, addFavMethod, delFavMethod, wipeoutMethod };
