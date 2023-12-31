function extractNumberFromText(text) {
  return parseFloat(text.replace(/[^\d.]/g, ''));
}

export class ShoppingCartPage {

  getItem() {
    return cy.get('.text>.wrap');
  }

  verifyFirstItemPresence(itemName) {
    this.getItem().first().should('contain.text', itemName);
  }

  verifySecondItemPresence(itemName) {
    this.getItem().last().should('contain.text', itemName);
  }

  getItemPrice() {
    return cy.get('.product_qty_price .price-box__cur');
  }

  getTotalPrice() {
    return cy.get('.total-box .total-box__price');
  }

  getItemInTheShoppingCart() {
    return cy.get('.product__item .vi__close.remove');
  }

  removeFirstItemFromShoppingCart() {
    this.getItemInTheShoppingCart().first().click();
  }

  verifyNumberOfItemsOnThePage(numberOfItems) {
    this.getItem().should('have.length', numberOfItems);
  }

  verifyItemAbsense(itemName) {
    this.getItem().should('not.contain', itemName);
  }

  /**
   * This method verifies if the price that user see on the page
   * is correctly displayed
   */
  verifyTotalPriceOfItems() {
    this.getItemPrice().then(($prices) => {
      const price1 = extractNumberFromText($prices.eq(0).text());
      const price2 = extractNumberFromText($prices.eq(1).text());
    
      const sum = Number(price1) + Number(price2);
    
      this.getTotalPrice().invoke('text').then((text3) => {
        let value = extractNumberFromText(text3);
        let expectedSum = parseInt(value.toString().substring(0, Math.ceil(value.toString().length / 2)));

        expect(sum).to.eq(expectedSum);
      });
    });
  }
}

export const shoppingCartPage = new ShoppingCartPage();