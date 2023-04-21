import { Selector } from 'testcafe';

class AddvendorPage {
  constructor() {
    this.pageId = '#add-vendor-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(50000).expect(this.pageSelector.exists).ok();
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async addVendor(testController, name, hours, location) {
    await this.isDisplayed(testController);
    await testController.typeText('#add-vendor-form-name', name);
    await testController.typeText('#add-vendor-form-hours', hours);
    await testController.typeText('#add-vendor-form-location', location);
    await testController.click('#add-vendor-form-submit input.btn.btn-primary');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const addvendorPage = new AddvendorPage();
