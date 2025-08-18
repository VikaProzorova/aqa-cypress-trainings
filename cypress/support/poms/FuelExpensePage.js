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
  checkExpenseVisible(data) {
    cy.contains(sel.carsSelect, `${data.brand} ${data.model}`).should(
      "be.visible"
    );
    cy.get(sel.expensesTable)
      .should("be.visible")
      .within(() => {
        cy.get("tbody > tr > :nth-child(1)").should(
          "have.text",
          data.reportDate
        );
        cy.get("tbody > tr > :nth-child(2)").should("have.text", data.mileage);
        cy.get("tbody > tr > :nth-child(3)").should(
          "have.text",
          `${data.liters}L`
        );
        cy.get("tbody > tr > :nth-child(4)").should(
          "have.text",
          `${data.totalCost}.00 USD`
        );
      });
  }
}
