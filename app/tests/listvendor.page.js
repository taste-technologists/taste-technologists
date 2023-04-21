import { Selector } from 'testcafe';

class ListvendorPage {
  constructor() {
    this.pageId = '#list-vendor-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(50000).expect(this.pageSelector.exists).ok();
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
    await testController.click('#edit-vendor-2');
  }

  /** Delete test vendor. */
  async deleteVendor(testController) {
    await Selector('#basic-navbar-nav').visible;
    await testController.click('#delete-vendor-2');
    await testController.click(Selector('.swal-button--confirm'));
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const listvendorPage = new ListvendorPage();
