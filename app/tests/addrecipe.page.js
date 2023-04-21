import { Selector } from 'testcafe';

class AddRecipePage {
  constructor() {
    this.pageId = '#addrecipe-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Adds a recipe */
  async addRecipe(testController, name, picture, time, servings, description, ingredientsQuantity, ingredientsUnit, ingredientsName, instructions) {
    const unitSelect = Selector('#add-recipe-ingredientsUnit');
    const unitOption = unitSelect.find('option');
    const tagsSelector = Selector('#add-recipe-tags div.form-check input');
    await this.isDisplayed(testController);
    await testController.typeText('#add-recipe-name', name);
    await testController.typeText('#add-recipe-picture', picture);
    await testController.typeText('#add-recipe-time', time);
    await testController.typeText('#add-recipe-servings', servings);
    await testController.typeText('#add-recipe-description', description);
    await testController.typeText('#add-recipe-ingredientsQuantity', ingredientsQuantity);
    await testController.click(unitSelect).click(unitOption.withText(ingredientsUnit));
    await testController.typeText('#add-recipe-ingredientsName', ingredientsName);
    await testController.typeText('#add-recipe-instructions', instructions);
    await testController.click(tagsSelector.nth(8));
    await testController.click('#addrecipe-submit input.btn.btn-primary');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const addrecipePage = new AddRecipePage();
