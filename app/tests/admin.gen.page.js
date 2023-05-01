import { Selector } from 'testcafe';

class AdminGenPage {
  constructor() {
    this.pageId = '#admin-gen';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  async genReviews(testController) {
    await testController.click('#rev-gen');
  }

  async wipeReviews(testController) {
    await testController.click('#wipeout');
    await testController.click(Selector('.swal-button--confirm'));
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const adminGenPage = new AdminGenPage();
