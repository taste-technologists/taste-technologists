import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { listvendorPage } from './listvendor.page';
import { addvendorPage } from './addvendor.page';
import { editvendorPage } from './editvendor.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'admin@foo.com', password: 'changeme' };
const vendor = { name: 'Safeway', hours: '24 Hours', location: '2855 E Manoa Rd, Honolulu, HI 96822' };

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

test.only('Test the List, Add, and Edit Vendor pages', async (testController) => {
  await landingPage.isDisplayed(testController);
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
