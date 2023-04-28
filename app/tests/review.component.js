import { Selector } from 'testcafe';

class ReviewMenu {

  async addReview(testController) {
    const randomNumber = `${Math.floor(Math.random() * 5) + 1}`;
    const ratingSelect = Selector('#rating');
    const ratingOption = ratingSelect.find('option');
    await testController.click(ratingSelect).click(ratingOption.withText(randomNumber));
    await testController.typeText('#review-comment', 'This was very easy to make. I wish there had been more. Next time I will double the recipe.');
    await testController.click('#review-form-submit input.btn.btn-primary');
    await testController.click(Selector('.swal-button--confirm'));
  }

  async reviewCount(testController) {
    const accordionCount = Selector('.accordion').count;
    await testController.expect(accordionCount).gte(1);
    await testController.click('.accordion-button');
    await testController.click(Selector('.btn-close'));
  }
}
export const reviewMenu = new ReviewMenu();
