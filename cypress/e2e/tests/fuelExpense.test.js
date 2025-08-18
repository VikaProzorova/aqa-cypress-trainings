import moment from "moment";
import errors from "../../fixtures/errorMessages.json";

import { fuelExpensePageSelectors as selExpensePage } from "../../selectors/fuelExpensePage";
import { addFuelExpenseSelectors as selAddExpense } from "../../selectors/addFuelExpenseForm";
import { headersSelectors as selHeader } from "../../selectors/header";

import { GaragePage } from "../../support/poms/GaragePage";
import { AddCarForm } from "../../support/poms/AddCarForm";
import { FuelExpensePage } from "../../support/poms/FuelExpensePage";
import { AddFuelExpenseForm } from "../../support/poms/AddFuelExpenseForm";

const garagePage = new GaragePage();
const addCarForm = new AddCarForm();
const fuelExpensePage = new FuelExpensePage();
const fuelExpenseForm = new AddFuelExpenseForm();

describe("Add fuel expense form tests", () => {
  const addCarData = {
    brand: "Fiat",
    model: "Panda",
    mileage: 20,
  };

  const addFuelExpenceData = {
    brand: "Fiat",
    model: "Panda",
    reportDate: moment().format("DD.MM.YYYY"),
    mileage: 30,
    liters: 40,
    totalCost: 50,
  };

  beforeEach(() => {
    cy.login();
    garagePage.openAddCarForm();
    addCarForm.addCar(addCarData.brand, addCarData.model, addCarData.mileage);
  });

  afterEach(() => {
    cy.contains(
      selHeader.garageButton.selector,
      selHeader.garageButton.text
    ).click();
    garagePage.removeCar(addCarData.brand, addCarData.model);
  });

  it("Close & Cancel buttons test", () => {
    garagePage.openAddFuelExpenseForm();
    cy.contains(selAddExpense.title.selector, selAddExpense.title.text).should(
      "be.visible"
    );
    fuelExpenseForm.closeAddingExpenseForm();
    cy.contains(selAddExpense.title.selector, selAddExpense.title.text).should(
      "not.be.visible"
    );
    garagePage.openAddFuelExpenseForm();
    cy.contains(selAddExpense.title.selector, selAddExpense.title.text).should(
      "be.visible"
    );
    fuelExpenseForm.cancelAddingExpense();
    cy.contains(selAddExpense.title.selector, selAddExpense.title.text).should(
      "not.be.visible"
    );
  });

  it("Validation test", () => {
    const invalidNegative = -1;
    const invalidTooLong = 999999999999;
    garagePage.openAddFuelExpenseForm();

    cy.checkValidationErrorEmptyField(
      selAddExpense.mileageInput,
      errors.addExpenseToCarForm.mileage.empty
    );
    cy.checkValidationErrorEmptyField(
      selAddExpense.litersInput,
      errors.addExpenseToCarForm.liters.empty
    );
    cy.checkValidationErrorEmptyField(
      selAddExpense.totalCostInput,
      errors.addExpenseToCarForm.totalCost.empty
    );
    cy.checkValidationErrorInvalidContent(
      selAddExpense.mileageInput,
      invalidNegative,
      errors.addExpenseToCarForm.mileage.invalidData
    );
    cy.checkValidationErrorInvalidContent(
      selAddExpense.litersInput,
      invalidNegative,
      errors.addExpenseToCarForm.liters.invalidData
    );
    cy.checkValidationErrorInvalidContent(
      selAddExpense.totalCostInput,
      invalidNegative,
      errors.addExpenseToCarForm.totalCost.invalidData
    );
    cy.checkValidationErrorInvalidContent(
      selAddExpense.mileageInput,
      invalidTooLong,
      errors.addExpenseToCarForm.mileage.invalidData
    );
    cy.checkValidationErrorInvalidContent(
      selAddExpense.litersInput,
      invalidTooLong,
      errors.addExpenseToCarForm.liters.invalidData
    );
    cy.checkValidationErrorInvalidContent(
      selAddExpense.totalCostInput,
      invalidTooLong,
      errors.addExpenseToCarForm.totalCost.invalidData
    );

    fuelExpenseForm.cancelAddingExpense();
  });

  it("Add fuel expense Happy path", () => {
    fuelExpensePage.visit();
    fuelExpensePage.openAddExpenseForm();
    fuelExpenseForm.addExpense(addFuelExpenceData);
    fuelExpensePage.checkExpenseVisible(addFuelExpenceData);
  });
});
