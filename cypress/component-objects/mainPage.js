export class MainPage {
  getCategory() {
    return cy.get('#js-menu-wrapper a');
  }

  selectCategory(category) {
    this.getCategory().contains(category).click();
  }

  getPriceInputField() {
    return cy.get('[data-range-filter="price"] input');
  }

  enterPriceFrom(price) {
    this.getPriceInputField().first().click();
    this.getPriceInputField().first().clear();
    this.getPriceInputField().first().type(price);
  }

  enterPriceTo(price) {
    this.getPriceInputField().last().click();
    this.getPriceInputField().last().clear();
    this.getPriceInputField().last().type(price);
  }

  getSearchField() {
    return cy.get('#search-form__input');
  }

  searchItem(itemName) {
    this.getSearchField().click();
    this.getSearchField().clear();
    this.getSearchField().type(itemName).type('{enter}');
  }

  getCompareButton() {
    return cy.get('.mh-button.mh-compare');
  }

  verifyThatCompareButtonIsDisabled() {
    this.getCompareButton().should('have.class', 'disabled');
  }
}

export const mainPage = new MainPage();