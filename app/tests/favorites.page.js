import { Selector } from 'testcafe';

class FavoritesPage {
  constructor() {
    this.pageId = '#favorites-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 60 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

}

export const favoritesPage = new FavoritesPage();
