import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { signupPage } from './signup.page';
import { addrecipePage } from './addrecipe.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const signupCredentials = { name: 'christi', vendor: 'No', email: 'clyyoung', password: 'changeme' };
const recipe = { name: 'Creamy Pesto Penne with Sausage', picture: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F3783692.jpg&q=60&c=sc&orient=true&poi=auto&h=512',
  time: '25 min', servings: '2', description: 'Quick weeknight dinner.',
  ingredientsQuantity: '16', ingredientsUnit: 'oz', ingredientsName: 'penne pasta', instructions: 'Make the dish', tags: 'Snack' };

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
