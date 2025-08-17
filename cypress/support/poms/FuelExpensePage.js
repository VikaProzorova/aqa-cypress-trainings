import { fuelExpensePageSelectors as sel } from "../../selectors/fuelExpensePage";

export class FuelExpensePage {
  visit() {
    cy.visit("/panel/expenses");
  }
  openAddExpenseForm() {
    cy.contains(
      sel.addExpenseButton.selector,
      sel.addExpenseButton.text
    ).click();
  }
}
