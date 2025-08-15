import { garagePageSelectors as sel } from "../../selectors/garagePage";

export class GaragePage {
  visit() {
    cy.visit("/panel/garage");
  }

  openAddCarForm() {
    cy.contains(sel.addCarButton.selector, sel.addCarButton.text).click();
  }

  removeCar(brand, model) {
    cy.contains(sel.carFullName, `${brand} ${model}`)
      .closest(sel.carItem)
      .find(sel.editCarButton)
      .click();
    cy.contains(
      sel.editCar.removeButton.selector,
      sel.editCar.removeButton.text
    ).click();
    cy.contains(
      sel.removeCar.removeButton.selector,
      sel.removeCar.removeButton.text
    ).click();
  }
  openAddFuelExpenseForm() {
    cy.contains(
      sel.addFuelExpenseButton.selector,
      sel.addFuelExpenseButton.text
    ).click();
  }
}
