import { Selector } from 'testcafe';

class AddInventory {
  constructor() {
    this.pageId = '#add-inventory-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 60 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  async addItem(testController) {
    await testController.typeText('#add-inventory-form-item', 'Canned Tomatoes');
    await testController.typeText('#add-inventory-form-price', '2.99');
    await testController.typeText('#add-inventory-form-size', '8 oz');
    await testController.click('#add-inventory-form-submit input.btn.btn-primary');
    await testController.click(Selector('.swal-button--confirm'));
  }

}

export const addInventory = new AddInventory();
