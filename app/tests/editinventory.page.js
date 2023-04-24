import { Selector } from 'testcafe';

class EditInventoryPage {
  constructor() {
    this.pageId = '#edit-inventory-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 60 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(50000).expect(this.pageSelector.exists).ok();
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async editInventory(testController) {
    // await this.isDisplayed(testController);
    await testController.click('#edit-inventory-tbFm7gysRc6BodbEG');
    await testController.typeText('#edit-inventory-name', 'Nijiya Market', { replace: true });
    await testController.typeText('#edit-inventory-item', 'Cheese Wheel', { replace: true });
    await testController.typeText('#edit-inventory-size', '15 lbs', { replace: true });
    await testController.typeText('#edit-inventory-price', '1000', { replace: true });
    await testController.click('#edit-inventory-form-submit input.btn.btn-primary');
    await testController.click(Selector('.swal-button--confirm'));
  }

  async hasTable(testController) {
    const rowCount = Selector('tr').count;
    await testController.expect(rowCount).gte(3);
  }
}

export const editInventoryPage = new EditInventoryPage();
