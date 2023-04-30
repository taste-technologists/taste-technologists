import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { searchPage } from './search.page';
import { editrecipePage } from './editrecipe.page';
import { recipeviewPage } from './recipe.page';
import { adminPage } from './admin.page';
import { adminInventory } from './admin.inventory';
import { adminEditPage } from './admin.edit.page';
import { signupPage } from './signup.page';
import { addrecipePage } from './addrecipe.page';
import { listvendorPage } from './listvendor.page';
import { addvendorPage } from './addvendor.page';
import { editvendorPage } from './editvendor.page';
import { editInventoryPage } from './editinventory.page';
import { addInventory } from './addinventory';
import { myrecipePage } from './myrecipe.page';
import { favoritesPage } from './favorites.page';
import { myreviewsPage } from './myreviews.page';
import { reviewMenu } from './review.component';
import { adminRecipes } from './admin.recipes.component';
import { adminReviews } from './admin.reviews.component';
import { admineditrecipePage } from './admineditrecipe.page';
import { adminEditInventoryPage } from './admineditinventory.page';
import { adminGenPage } from './admin.gen.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
// const credentials = { username: 'john@foo.com', password: 'changeme' };
const signupCredentials = { name: 'Aaa', vendor: 'No', email: 'a@a.a', password: 'changeme' };
const recipe = { name: 'Creamy Pesto Penne with Sausage', picture: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F3783692.jpg&q=60&c=sc&orient=true&poi=auto&h=512',
  time: '25 min', servings: '2', description: 'Quick weeknight dinner.',
  ingredientsQuantity: '16', ingredientsUnit: 'oz', ingredientsName: 'penne pasta', instructions: 'Make the dish', tags: 'Snack' };
const credentials = { username: 'admin@foo.com', password: 'changeme' };
const vendor = { name: 'Aaaa', hours: '24 Hours', location: '2855 E Manoa Rd, Honolulu, HI 96822' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that search page work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoSearchPage(testController);
  await searchPage.isDisplayed(testController);
  await searchPage.isFiltered(testController);
});
test('Test that edit recipe page work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoEditRecipePage(testController);
  await editrecipePage.isDisplayed(testController);
  await editrecipePage.editRecipe(testController, recipe.name, recipe.picture, recipe.time, recipe.servings, recipe.description, recipe.ingredientsQuantity, recipe.ingredientsUnit, recipe.ingredientsName, recipe.instructions);

});

test('Test that individual recipe page work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoRecipeViewPage(testController);
  await recipeviewPage.isDisplayed(testController);
});

test('Test the inventory page and its functionalities', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoListVendorPage(testController);
  await listvendorPage.gotoInventoryPage(testController);
  await editInventoryPage.editInventory(testController);
  await navBar.gotoListVendorPage(testController);
  await listvendorPage.gotoInventoryPage2(testController);
  await editInventoryPage.hasTable(testController);
  await navBar.gotoListVendorPage(testController);
  await listvendorPage.gotoInventoryPage(testController);
  await editInventoryPage.goToAddInventory(testController);
  await addInventory.addItem(testController);
  await navBar.gotoListVendorPage(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that signup works', async (testController) => {
  await navBar.gotoSignUpPage(testController);
  await signupPage.isDisplayed(testController);
  await signupPage.signupUser(testController, signupCredentials.name, signupCredentials.vendor, signupCredentials.email, signupCredentials.password);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test add recipe form', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoAddRecipePage(testController);
  await addrecipePage.isDisplayed(testController);
  await addrecipePage.addRecipe(testController, recipe.name, recipe.picture, recipe.time, recipe.servings, recipe.description, recipe.ingredientsQuantity, recipe.ingredientsUnit, recipe.ingredientsName, recipe.instructions);
});

test('Test the listprofilesadmin page and profile functions', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.goToAdminDashboard(testController);
  await adminPage.isDisplayed(testController);
  await adminPage.hasTable(testController);
  await adminPage.deleteUser(testController);
  await adminPage.goToAdminEdit(testController);
  await adminEditPage.editProfile(testController);
});
test('Test admin recipes functionality', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.goToAdminDashboard(testController);
  await adminPage.isDisplayed(testController);
  await adminPage.goToAdminRecipes(testController);
  await adminRecipes.isDisplayed(testController);
  await adminRecipes.hasTable(testController);
  await adminRecipes.deleteRecipe(testController);
  await adminRecipes.gotoAdminRecEdit(testController);
  await admineditrecipePage.isDisplayed(testController);
  await admineditrecipePage.editRecipe(testController, recipe.name, recipe.picture, recipe.time, recipe.servings, recipe.description, recipe.ingredientsQuantity, recipe.ingredientsUnit, recipe.ingredientsName, recipe.instructions);
});
test('Test admin inventory functionality', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.goToAdminDashboard(testController);
  await adminPage.goToAdminInventory(testController);
  await adminInventory.isDisplayed(testController);
  await adminInventory.hasTable(testController);
  await adminInventory.deleteIngredient(testController);
  await adminEditInventoryPage.editInventory(testController);
});
test('Test admin review functionality', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.goToAdminDashboard(testController);
  await adminPage.isDisplayed(testController);
  await adminPage.goToAdminGen(testController);
  await adminGenPage.isDisplayed(testController);
  await adminGenPage.genReviews(testController);
  await navBar.goToAdminDashboard(testController);
  await adminPage.goToAdminReviews(testController);
  await adminReviews.isDisplayed(testController);
  await adminReviews.hasTable(testController);
  await adminReviews.deleteReview(testController);
  await adminPage.goToAdminGen(testController);
  await adminGenPage.wipeReviews(testController);
  await navBar.goToAdminDashboard(testController);
  await adminPage.goToAdminReviews(testController);
  await adminReviews.isDisplayed(testController);
  await adminReviews.hasTable2(testController);
});

test('Test the List, Add, and Edit Vendor pages', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoListVendorPage(testController);
  await listvendorPage.isDisplayed(testController);
  await listvendorPage.hasTable(testController);
  await listvendorPage.gotoAddVendorPage(testController);
  await addvendorPage.isDisplayed(testController);
  await addvendorPage.addVendor(testController, vendor.name, vendor.hours, vendor.location);
  await navBar.gotoListVendorPage(testController);
  await listvendorPage.isDisplayed(testController);
  await listvendorPage.gotoEditVendorPage(testController);
  await editvendorPage.isDisplayed(testController);
  await editvendorPage.editVendor(testController);
  await navBar.gotoListVendorPage(testController);
  await listvendorPage.deleteVendor(testController);
  await listvendorPage.isDisplayed(testController);
});

test('Test that MyRecipes and Favorites Pages works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoMyRecipePage(testController);
  await myrecipePage.isDisplayed(testController);
  await navBar.gotoFavoritesPage(testController);
  await favoritesPage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that review component and MyReview page work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoSearchPage(testController);
  await searchPage.gotoRecipePage(testController);
  await recipeviewPage.isDisplayed(testController);
  await recipeviewPage.reviewButton(testController);
  await reviewMenu.addReview(testController);
  await reviewMenu.reviewCount(testController);
  await navBar.gotoReviewsPage(testController);
  await myreviewsPage.isDisplayed(testController);
  await myreviewsPage.deleteReview(testController);
  await myreviewsPage.isDisplayed(testController);
});
