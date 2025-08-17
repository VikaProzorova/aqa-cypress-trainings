import { addFuelExpenseSelectors as sel } from "../../selectors/addFuelExpenseForm";

export class AddFuelExpenseForm {
  selectCar(car) {
    cy.get(sel.carSelect).select(car);
  }

  selectReportDate(date) {
    cy.get(sel.reportDate).clear().type(date);
  }

  fillMileage(mileage) {
    cy.get(sel.mileageInput).clear().type(mileage).blur();
  }

  fillLiters(liters) {
    cy.get(sel.litersInput).clear().type(liters).blur();
  }

  fillTotalCost(totalCost) {
    cy.get(sel.totalCostInput).clear().type(totalCost).blur();
  }

  cancelAddingExpense() {
    cy.contains(
      sel.cancelAddExpenseButton.selector,
      sel.cancelAddExpenseButton.text
    ).click();
  }

  closeAddingExpenseForm() {
    cy.get(sel.closeButtonIcon).click();
  }

  saveAddedExpense() {
    cy.contains(
      sel.saveAddedExpenseButton.selector,
      sel.saveAddedExpenseButton.text
    ).click();
  }

  addExpense(car) {
    this.selectCar(`${car.brand} ${car.model}`);
    this.selectReportDate(car.reportDate);
    this.fillMileage(car.mileage);
    this.fillLiters(car.liters);
    this.fillTotalCost(car.totalCost);
    this.saveAddedExpense();
  }
}
