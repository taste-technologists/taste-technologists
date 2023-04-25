import { Selector } from 'testcafe';

class AdminEditPage {
  constructor() {
    this.pageId = '#edit-profile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  async editProfile(testController) {
    const roleSelect = Selector('#role');
    const roleOption = roleSelect.find('option');
    await testController.click(roleSelect).click(roleOption.withText('vendor'));
    await testController.expect(roleSelect.value).eql('vendor');
    await testController.click('#edit-profile-form-submit input.btn.btn-primary');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const adminEditPage = new AdminEditPage();
