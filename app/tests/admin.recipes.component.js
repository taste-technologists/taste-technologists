import { Selector } from 'testcafe';

class AdminRecipesComponent {
  constructor() {
    this.pageId = '#admin-recipe-page';
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

  async deleteRecipe(testController) {
    await testController.click('#delete-recipe-0');
    await testController.click(Selector('.swal-button--confirm'));
    await testController.click(Selector('.swal-button--confirm'));
  }

  async gotoAdminRecEdit(testController) {
    await testController.click('#admin-edit-0');
  }

}

export const adminRecipes = new AdminRecipesComponent();
