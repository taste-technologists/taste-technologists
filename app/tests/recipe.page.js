import { Selector } from 'testcafe';

class RecipeViewPage {
  constructor() {
    this.pageId = '#recipe-view-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  async reviewButton(testController) {
    await testController.wait(5000).click('#review-button');
    await testController.wait(1000);
  }
}

export const recipeviewPage = new RecipeViewPage();
