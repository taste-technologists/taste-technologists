import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class SignupPage {
  constructor() {
    this.pageId = '#signup-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async signupUser(testController, name, vendor, email, password) {
    // const noSelect = Selector('#signup-vendor [type="radio"]').withAttribute('name', 'Yes');
    // const vendorSelector = Selector('#signup-vendor');
    const tagsSelector = Selector('#signup-vendor div.form-check input');
    await this.isDisplayed(testController);
    await testController.typeText('#signup-name', name);
    // await testController.click(Selector('#signup-vendor input[type=radio]').withText(vendor));
    // await testController.click(Selector('input[type="radio"][name="#signup-vendor"][value="No"]'));
    await testController.click(tagsSelector.nth(0));
    await testController.typeText('#signup-email', email);
    await testController.typeText('#signup-password', password);
    await testController.click('#signup-submit input.btn.btn-primary');
    await navBar.isLoggedIn(testController, email);
  }
}

export const signupPage = new SignupPage();
