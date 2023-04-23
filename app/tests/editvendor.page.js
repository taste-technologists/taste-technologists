import { Selector } from 'testcafe';

class EditvendorPage {
  constructor() {
    this.pageId = '#edit-vendor-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(120000).expect(this.pageSelector.exists).ok();
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async editVendor(testController) {
    await this.isDisplayed(testController);
    await testController.typeText('#edit-vendor-form-name', '2');
    await testController.typeText('#edit-vendor-form-hours', ' Sun-Sat');
    await testController.typeText('#edit-vendor-form-location', ', USA');
    await testController.click('#edit-vendor-form-submit input.btn.btn-primary');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const editvendorPage = new EditvendorPage();
