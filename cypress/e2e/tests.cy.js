const { mainPage } = require("../component-objects/mainPage");
const { itemsPage } = require("../component-objects/itemsPage");
const { subcategoryPage } = require("../component-objects/subcategoryPage");
const { shoppingCartPage } = require("../component-objects/shoppingCartPage");
const { compareItemsPage } = require("../component-objects/compareItemsPage");


describe('Test Cases for Allo App', () => {
  
  beforeEach(() => {
    cy.visit('/');
    cy.log('Step 1: Open marketplace url. Verify it.');
    cy.url().should('eq', Cypress.config('baseUrl'));
  });

  it('Verify if the price filter working correctly for the following marketplaces', () => {
    cy.fixture('test-data').then((data) => {
      cy.log('Step 2: Open category and subcategory if it is necessary.');
      mainPage.selectCategory(data.phonesCategory);
      subcategoryPage.selectPhonesSubcategory();

      cy.log('Step 3: Navigate to the filters section, for the following marketplaces it is located on the left side. Apply 2-3 filters.');
      itemsPage.enterPriceFrom(data.phoneFromPrice);
      itemsPage.enterPriceTo(data.phoneToPrice);
      itemsPage.selectBrand(data.xiaomiBrand);
      itemsPage.selectAvailableInCityOption();
      itemsPage.showFilteredItems(data.show);

      cy.log('Step 4: Verify that all the items on the page are sorted correctly by the "from" and "to" price filters you entered.');
      itemsPage.verifyFilterCorrectness(data.phoneFromPrice, data.phoneToPrice);
    });
  });

  it('Add items to the basket', () => {
    cy.fixture('test-data').then((data) => {
      cy.log('Step 2: Open category and subcategory if it is necessary.');
      mainPage.selectCategory(data.phonesCategory);
      subcategoryPage.selectPhonesSubcategory();

      cy.log('Step 3: Add any item to the basket.');
      itemsPage.addFirstShownItemToShoppingCart();
      itemsPage.clickComebackButton();

      cy.log('Step 4: Select another category and add an item from that category.');
      itemsPage.gotoMainPage();
      mainPage.selectCategory(data.laptopsCategory);
      subcategoryPage.selectSubcategory(data.laptopsSubcategory);
      itemsPage.addFirstShownItemToShoppingCart();
      itemsPage.clickComebackButton();

      cy.log('Step 5: Verify information of items inside the basket.');
      itemsPage.gotoShoppingCartPage();
      shoppingCartPage.verifyFirstItemPresence(data.xiaomiRedmiNote);
      shoppingCartPage.verifySecondItemPresence(data.xiaomiRedmiBook);

      cy.log('Step 6: Verify that the price is calculated correctly.');
      shoppingCartPage.verifyTotalPriceOfItems();

      cy.log('Step 7: Verify that the delete item button is clickable.');
      shoppingCartPage.removeFirstItemFromShoppingCart();
      shoppingCartPage.verifyNumberOfItemsOnThePage(data.singleItem);
      shoppingCartPage.verifyItemAbsense(data.xiaomiRedmiNote);
    });
  });

  it('Search the item', () => {
    cy.fixture('test-data').then((data) => {
      cy.log('Step 2: Search random item by name.');
      mainPage.searchItem(data.iPhone15ProMax);

      cy.log('Step 3: Verify that all items are correctly displayed according to your searching request (only on the first page).');
      itemsPage.verifySearchedItems(data.iPhone15ProMax);
    });
  });

  it('Add items to the Comparison List', () => {
    cy.fixture('test-data').then((data) => {
      cy.log('Step 2: Verify that the comparison button is disabled when user opens application.');
      mainPage.verifyThatCompareButtonIsDisabled();

      cy.log('Step 3: Add at least 3 items to the comparison list.');
      mainPage.selectCategory(data.phonesCategory);
      subcategoryPage.selectPhonesSubcategory();
      itemsPage.addItemToCompareList(data.itemTitlesForComparison[0]);
      itemsPage.addItemToCompareList(data.itemTitlesForComparison[1]);
      itemsPage.addItemToCompareList(data.itemTitlesForComparison[2]);

      cy.log('Step 4: Open Comparison List page.');
      itemsPage.gotoCompareItemsPage();

      cy.log('Step 5: Verify that the correct items were added to the list.');
      compareItemsPage.verifyThatTheCorrectItemsWereAddedToTheList(data.itemTitlesForComparison);

      cy.log('Step 6: Verify that the item can be removed from the list.');
      compareItemsPage.removeFirstItem();
      itemsPage.gotoCompareItemsPage();
      compareItemsPage.verifyNumberOfitemsLeft(data.numberOfItemsInComparisonList); // Should be 2 instead of 3 for the test to pass
      compareItemsPage.verifyAbsenseOfItem(data.itemTitlesForComparison[0]);
    });
  })
});
