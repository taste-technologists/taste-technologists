import { Selector } from 'testcafe';

class MyreviewsPage {
  constructor() {
    this.pageId = '#my-reviews-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 60 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(5000).expect(this.pageSelector.exists).ok();
  }

  async deleteReview(testController) {
    await testController.click('#review-delete-0');
    await testController.click(Selector('.swal-button--confirm'));
    await testController.click(Selector('.swal-button--confirm'));
  }

}

export const myreviewsPage = new MyreviewsPage();
