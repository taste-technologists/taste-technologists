import { Selector } from 'testcafe';

class AdminInventory {
  constructor() {
    this.pageId = '#admin-inventory-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  async hasTable(testController) {
    const rowCount = Selector('tr').count;
    await testController.expect(rowCount).gte(64);
  }
}

export const adminInventory = new AdminInventory();
