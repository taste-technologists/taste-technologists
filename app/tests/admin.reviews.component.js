import { Selector } from 'testcafe';

class AdminReviewsComponent {
  constructor() {
    this.pageId = '#admin-review-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  async hasTable(testController) {
    const rowCount = Selector('tr').count;
    await testController.expect(rowCount).gte(1);
  }

  async deleteReview(testController) {
    await testController.click('#review-delete-0');
    await testController.click(Selector('.swal-button--confirm'));
    await testController.click(Selector('.swal-button--confirm'));
  }

  async hasTable2(testController) {
    const rowCount = Selector('tr').count;
    await testController.expect(rowCount).eql(1);
  }
}

export const adminReviews = new AdminReviewsComponent();
