import { Selector } from 'testcafe';

class AdminEditRecipePage {
  constructor() {
    this.pageId = '#admin-editrecipe-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Edit a recipe */
  async editRecipe(testController, name, picture, time, servings, description, ingredientsQuantity, ingredientsUnit, ingredientsName, instructions) {
    const unitSelect = Selector('#edit-recipe-ingredientsUnit');
    const unitOption = unitSelect.find('option');
    const tagsSelector = Selector('.edit-recipe-tags');
    await this.isDisplayed(testController);
    await testController.typeText('#edit-recipe-name', name, { replace: true });
    await testController.typeText('#edit-recipe-picture', picture, { replace: true });
    await testController.typeText('#edit-recipe-time', time, { replace: true });
    await testController.typeText('#edit-recipe-servings', servings, { replace: true });
    await testController.typeText('#edit-recipe-description', description, { replace: true });
    await testController.typeText('#edit-recipe-ingredientsQuantity', ingredientsQuantity, { replace: true });
    await testController.click(unitSelect).click(unitOption.withText(ingredientsUnit));
    await testController.typeText('#edit-recipe-ingredientsName', ingredientsName, { replace: true });
    await testController.typeText('#edit-recipe-instructions', instructions, { replace: true });
    await testController.click(tagsSelector.nth(0));
    await testController.click('#editrecipe-submit input.btn.btn-primary');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const admineditrecipePage = new AdminEditRecipePage();
