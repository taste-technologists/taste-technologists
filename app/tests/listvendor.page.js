import { Selector } from 'testcafe';

class ListvendorPage {
  constructor() {
    this.pageId = '#list-vendor-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks that this page is has a table with at least 2 rows. */
  async hasTable(testController) {
    const rowCount = Selector('tr').count;
    await testController.expect(rowCount).gte(2);
  }

  /** Go to add vendor page. */
  async gotoAddVendorPage(testController) {
    await Selector('#basic-navbar-nav').visible;
    await testController.click('#add-vendor');
  }

  /** Go to add vendor page. */
  async gotoEditVendorPage(testController) {
    await Selector('#basic-navbar-nav').visible;
    await testController.click('#edit-vendor-6');
  }

  /** Delete test vendor. */
  async deleteVendor(testController) {
    await Selector('#basic-navbar-nav').visible;
    await testController.click('#delete-vendor-6');
    await testController.click(Selector('.swal-button--confirm'));
    await testController.click(Selector('.swal-button--confirm'));
  }

  async gotoInventoryPage(testController) {
    await testController.click('#vendor-inventory-0');
  }

  async gotoInventoryPage2(testController) {
    await testController.click('#vendor-inventory-1');
  }

}

export const listvendorPage = new ListvendorPage();
