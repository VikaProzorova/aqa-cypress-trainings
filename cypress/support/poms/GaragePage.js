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

  checkCarVisible(brand, model) {
    cy.contains(sel.carFullName, `${brand} ${model}`).should("be.visible");
  }

  checkCarInResponse(inputedCarData) {
    cy.intercept("GET", "/api/cars").as("getCars");
    this.visit();
    cy.task("readFile", "cypress/temp/addedCar.json").then((data) => {
      const carData = JSON.parse(data);
      cy.wait("@getCars").then((interception) => {
        expect(interception.response.statusCode).to.equal(200);

        const expected = {
          id: carData.id,
          brand: inputedCarData.brand,
          model: inputedCarData.model,
          mileage: inputedCarData.mileage,
        };
        const found = interception.response.body.data.find(
          (car) => car.id === carData.id
        );
        expect(found).to.include(expected);
      });
    });
  }
}
