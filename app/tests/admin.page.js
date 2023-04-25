import { Selector } from 'testcafe';

class AdminPage {
  constructor() {
    this.pageId = '#admin-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  async hasTable(testController) {
    const rowCount = Selector('tr').count;
    await testController.expect(rowCount).gte(4);
  }

  async goToAdminInventory(testController) {
    await testController.click('#admin-inventory');
  }

  async goToAdminEdit(testController) {
    await testController.click('#edit-profile-BXCMZmT2gy32GAYic');
  }

  async deleteUser(testController) {
    await testController.click('#delete-profile-f2zqhNqqL4sEgsrXz');
    await testController.click(Selector('.swal-button--confirm'));
  }

}

export const adminPage = new AdminPage();
