import { Selector } from 'testcafe';

class Favoritespage {
  constructor() {
    this.pageId = '#favorite-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 60 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(50000).expect(this.pageSelector.exists).ok();
  }

  /** Go to favorite page. */
  async favorites(testController) {
    await Selector('#basic-navbar-nav').visible;
    await testController.click('#favorites-nav');
  }
}

export const favorites = new Favoritespage();
