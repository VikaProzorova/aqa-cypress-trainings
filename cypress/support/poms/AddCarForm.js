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
}
