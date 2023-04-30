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
    await testController.expect(rowCount).gte(2);
  }

  async deleteIngredient(testController) {
    await testController.click('#delete-ing-0');
    await testController.click(Selector('.swal-button--confirm'));
    await testController.click(Selector('.swal-button--confirm'));
  }

  async gotoAdminIngEdit(testController) {
    await testController.click('#edit-inventory-0');
  }
}

export const adminInventory = new AdminInventory();
