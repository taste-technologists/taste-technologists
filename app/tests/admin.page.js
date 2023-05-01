import { Selector } from 'testcafe';

class AdminPage {
  constructor() {
    this.pageId = '#admin-page';
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

  async goToAdminInventory(testController) {
    await testController.click('#admin-inventory');
  }

  async goToAdminRecipes(testController) {
    await testController.click('#admin-recipes');
  }

  async goToAdminReviews(testController) {
    await testController.click('#admin-reviews');
  }

  async goToAdminEdit(testController) {
    await testController.click('#edit-profile-4');
  }

  async goToAdminGen(testController) {
    await testController.click('#admin-gen');
  }

  async deleteUser(testController) {
    await testController.click('#delete-profile-0');
    await testController.click(Selector('.swal-button--confirm'));
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const adminPage = new AdminPage();
