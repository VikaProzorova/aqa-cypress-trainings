import errors from "../../fixtures/errorMessages.json";
import { garagePageSelectors as selGarage } from "../../selectors/garagePage";
import { addCarSelectors as selAddCar } from "../../selectors/addCarForm";

import { GaragePage } from "../../support/poms/GaragePage";
import { AddCarForm } from "../../support/poms/AddCarForm";

const garagePage = new GaragePage();
const addCarForm = new AddCarForm();

describe("Add car form tests", () => {
  const carTestData = {
    brand: "Porsche",
    model: "Cayenne",
    mileage: "50",
  };

  beforeEach(() => {
    cy.visit("");
    cy.contains("button", "Sign In").click();
    cy.login(
      Cypress.env("DEFAULT_USER_EMAIL"),
      Cypress.env("DEFAULT_USER_PASSWORD")
    );
  });
  after(() => {
    garagePage.removeCar(carTestData.brand, carTestData.model);
  });

  it("Close & Cancel buttons test", () => {
    garagePage.openAddCarForm();
    cy.contains(selAddCar.title.selector, selAddCar.title.text).should(
      "be.visible"
    );
    addCarForm.closeAddingCarForm();
    cy.contains(selAddCar.title.selector, selAddCar.title.text).should(
      "not.be.visible"
    );
    garagePage.openAddCarForm();
    cy.contains(selAddCar.title.selector, selAddCar.title.text).should(
      "be.visible"
    );
    addCarForm.cancelAddingCar();
    cy.contains(selAddCar.title.selector, selAddCar.title.text).should(
      "not.be.visible"
    );
  });

  it("Validation test", () => {
    garagePage.openAddCarForm();

    cy.contains(
      selAddCar.saveButton.selector,
      selAddCar.saveButton.text
    ).should("have.attr", "disabled");
    cy.checkValidationErrorEmptyField(
      selAddCar.mileageInput,
      errors.addCarToGarageForm.mileage.empty
    );
    cy.checkValidationErrorInvalidContent(
      selAddCar.mileageInput,
      -1,
      errors.addCarToGarageForm.mileage.invalidData
    );
    cy.checkValidationErrorInvalidContent(
      selAddCar.mileageInput,
      1000000,
      errors.addCarToGarageForm.mileage.invalidData
    );
    cy.contains(
      selAddCar.saveButton.selector,
      selAddCar.saveButton.text
    ).should("have.attr", "disabled");

    addCarForm.cancelAddingCar();
  });

  it("Add car Happy path", () => {
    garagePage.openAddCarForm();
    addCarForm.addCar(
      carTestData.brand,
      carTestData.model,
      carTestData.mileage
    );
    cy.contains(
      selGarage.carFullName,
      `${carTestData.brand} ${carTestData.model}`
    ).should("be.visible");
  });
});
