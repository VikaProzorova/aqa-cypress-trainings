import { addCarSelectors as sel } from "../../selectors/addCarForm";

export class AddCarForm {
  selectBrand(brand) {
    cy.get(sel.brandDropdown).select(brand);
  }

  selectModel(model) {
    cy.get(sel.modelDropdown).select(model);
  }

  fillMileage(mileage) {
    cy.get(sel.mileageInput).clear().type(mileage);
  }

  cancelAddingCar() {
    cy.contains(sel.cancelButton.selector, sel.cancelButton.text).click();
  }

  closeAddingCarForm() {
    cy.get(sel.closeButtonIcon).click();
  }

  saveAddedCar() {
    cy.contains(sel.saveButton.selector, sel.saveButton.text).click();
  }

  addCar(brand, model, mileage) {
    this.selectBrand(brand);
    this.selectModel(model);
    this.fillMileage(mileage);
    this.saveAddedCar();
  }

  addCarAndCaptureResponse(brand, model, mileage) {
    cy.intercept("POST", "/api/cars").as("addCar");
    this.addCar(brand, model, mileage);
    cy.wait("@addCar").then((interception) => {
      expect(interception.response.statusCode).to.equal(201);
      cy.task("writeFile", {
        filename: "cypress/temp/addedCar.json",
        content: interception.response.body?.data,
      });
    });
  }
}
