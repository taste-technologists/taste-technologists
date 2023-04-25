import { Selector } from 'testcafe';

class MyrecipePage {
  constructor() {
    this.pageId = '#my-recipe-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 60 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

}

export const myrecipePage = new MyrecipePage();
