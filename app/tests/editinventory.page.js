import { Selector } from 'testcafe';

class EditInventoryPage {
  constructor() {
    this.pageId = '#edit-inventory-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 60 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async editInventory(testController) {
    // await this.isDisplayed(testController);
    await testController.click('#edit-inventory-0');
    await testController.typeText('#edit-inventory-item', 'Cheese Wheel', { replace: true });
    await testController.typeText('#edit-inventory-size', '15 lbs', { replace: true });
    await testController.typeText('#edit-inventory-price', '1000', { replace: true });
    await testController.click('#edit-inventory-form-submit input.btn.btn-primary');
    await testController.click(Selector('.swal-button--confirm'));
  }

  async goToAddInventory(testController) {
    await testController.click('#inventory-add-page');
  }

  async deleteIngredient(testController) {
    await testController.click('#delete-ing-0');
    await testController.click(Selector('.swal-button--confirm'));
    await testController.click(Selector('.swal-button--confirm'));
  }

  async hasTable(testController) {
    const rowCount = Selector('tr').count;
    await testController.expect(rowCount).gte(2);
  }

  async hasTable2(testController) {
    const rowCount = Selector('tr').count;
    await testController.expect(rowCount).gte(2);
  }
}

export const editInventoryPage = new EditInventoryPage();
