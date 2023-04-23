import { Selector } from 'testcafe';

const roleSelect = Selector('#role-edit');
const roleOption = roleSelect.find('option');
class AdminEditPage {
  constructor() {
    this.pageId = '#admin-edit-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  async editProfile(testController) {
    await testController.click('#role-edit');
    await testController.click(roleOption.withText('vendor'));
    await testController.expect(roleSelect.value).eql('vendor');
  }
}

export const adminEditPage = new AdminEditPage();
