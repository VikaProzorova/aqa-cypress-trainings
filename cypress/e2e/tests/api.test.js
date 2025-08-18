import moment from "moment";

import { headersSelectors as selHeader } from "../../selectors/header";
import { GaragePage } from "../../support/poms/GaragePage";
import { AddCarForm } from "../../support/poms/AddCarForm";
import { FuelExpensePage } from "../../support/poms/FuelExpensePage";

const garagePage = new GaragePage();
const addCarForm = new AddCarForm();
const fuelExpensePage = new FuelExpensePage();

const carTestData = {
  brand: "Porsche",
  model: "Cayenne",
  mileage: 50,
};
const fuelExpenseTestData = {
  reportedAt: moment().format("YYYY-MM-DD"),
  mileage: 123,
  liters: 45,
  totalCost: 67,
};

describe("Testing Add car logic with API", () => {
  beforeEach(() => {
    cy.login();
  });

  it("Check response code of Add car request and save car to temp file", () => {
    garagePage.openAddCarForm();
    addCarForm.addCarAndCaptureResponse(
      carTestData.brand,
      carTestData.model,
      carTestData.mileage
    );
  });

  it("Check car in lists of cars on UI and API call", () => {
    garagePage.checkCarVisible(carTestData.brand, carTestData.model);
    garagePage.checkCarInResponse(carTestData);
  });
});

describe("Testing Add fuel expense logic with API", () => {
  before(() => {
    cy.task("readFile", "cypress/temp/addedCar.json").then((data) => {
      const carData = JSON.parse(data);
      fuelExpenseTestData.carId = carData.id;
    });
  });

  after(() => {
    cy.contains(
      selHeader.garageButton.selector,
      selHeader.garageButton.text
    ).click();
    garagePage.removeCar(carTestData.brand, carTestData.model);
  });

  it("Check API call Add fuel expence", () => {
    cy.loginViaApi();
    cy.addFuelExpenseViaApi(fuelExpenseTestData);
  });

  it("Check is fuel expence shown on UI", () => {
    cy.login();
    cy.contains(
      selHeader.fuelExpensesButton.selector,
      selHeader.fuelExpensesButton.text
    ).click();
    fuelExpensePage.checkExpenseVisible({
      brand: carTestData.brand,
      model: carTestData.model,
      mileage: fuelExpenseTestData.mileage,
      reportDate: moment(fuelExpenseTestData.reportedAt).format("DD.MM.YYYY"),
      liters: fuelExpenseTestData.liters,
      totalCost: fuelExpenseTestData.totalCost,
    });
  });
});
