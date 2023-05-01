import { Selector } from 'testcafe';

class SearchPage {
  constructor() {
    this.pageId = '#search-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  async isFiltered(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(1000).click('#btn-all');
    await testController.wait(1000).click('#btn-breakfast');
    await testController.wait(1000).click('#btn-lunch');
    await testController.wait(1000).click('#btn-dinner');
    await testController.wait(1000).click('#btn-snack');
  }

  async gotoRecipePage(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(1000).click('#rec-link-0');
  }

}

export const searchPage = new SearchPage();
