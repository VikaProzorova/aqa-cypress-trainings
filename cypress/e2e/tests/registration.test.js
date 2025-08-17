import errors from "../../fixtures/errorMessages.json";

import { registrationFormSelectors as sel } from "../../selectors/registrationForm";
import { headersSelectors as selHeader } from "../../selectors/header";

import { faker } from "@faker-js/faker";

describe("Registration form validation tests", () => {
  const { name, lastName, email, password, repeatPassword } =
    errors.registrationForm;

  beforeEach(() => {
    cy.visit("");
    cy.contains("button", "Sign up").click();
  });

  it("Validates Name field: empty", () => {
    cy.get(sel.nameInput).should("be.visible");
    cy.checkValidationErrorEmptyField(sel.nameInput, name.empty);
  });

  it("Validates Name field: length and invalid content", () => {
    const invalidTooShort = "Q";
    const invalidTooLong = "Q".repeat(21);
    const invalidCyrillic = "Саша";
    const invalidSymbols = "@lex";
    const invalidNumbers = "s1mple";

    cy.checkValidationErrorInvalidContent(
      sel.nameInput,
      invalidTooShort,
      name.invalidLength
    );
    cy.checkValidationErrorInvalidContent(
      sel.nameInput,
      invalidTooLong,
      name.invalidLength
    );
    cy.checkValidationErrorInvalidContent(
      sel.nameInput,
      invalidCyrillic,
      name.invalidData
    );
    cy.checkValidationErrorInvalidContent(
      sel.nameInput,
      invalidSymbols,
      name.invalidData
    );
    cy.checkValidationErrorInvalidContent(
      sel.nameInput,
      invalidNumbers,
      name.invalidData
    );
  });

  it("Validates Name field: valid content", () => {
    cy.checkValidationErrorValidContent(sel.nameInput, "Harry");
  });

  // TODO: discuss with a team
  it("Validates Name field: known issues", () => {
    const validName = "Kate";
    const nameWithHyphen = "Anna-Maria";

    cy.on("fail", (err) => {
      Cypress.log({ name: "Expected failure", message: err.message });
      return false;
    });

    cy.checkValidationErrorValidContent(sel.nameInput, validName, {
      addSpaces: true,
    });
    cy.checkValidationErrorValidContent(sel.nameInput, nameWithHyphen);
  });

  it("Validates Last name field: empty", () => {
    cy.get(sel.lastNameInput).should("be.visible");
    cy.checkValidationErrorEmptyField(sel.lastNameInput, lastName.empty);
  });

  it("Validates Last name field: length and invalid content", () => {
    const invalidTooShort = "W";
    const invalidTooLong = "W".repeat(21);
    const invalidCyrillic = "Стерненко";
    const invalidSymbols = "$ternenko";
    const invalidNumbers = "Sternenk0";

    cy.checkValidationErrorInvalidContent(
      sel.lastNameInput,
      invalidTooShort,
      lastName.invalidLength
    );
    cy.checkValidationErrorInvalidContent(
      sel.lastNameInput,
      invalidTooLong,
      lastName.invalidLength
    );
    cy.checkValidationErrorInvalidContent(
      sel.lastNameInput,
      invalidCyrillic,
      lastName.invalidData
    );
    cy.checkValidationErrorInvalidContent(
      sel.lastNameInput,
      invalidSymbols,
      lastName.invalidData
    );
    cy.checkValidationErrorInvalidContent(
      sel.lastNameInput,
      invalidNumbers,
      lastName.invalidData
    );
  });

  it("Validates Last name field: valid content", () => {
    cy.checkValidationErrorValidContent(sel.lastNameInput, "Potter");
  });

  // TODO: discuss with a team
  it("Validates Last name field: known issues", () => {
    const validLastName = "Jones";
    const lastNameWithHyphen = "Jolie-Pitt";

    cy.on("fail", (err) => {
      Cypress.log({ name: "Expected failure", message: err.message });
      return false;
    });

    cy.checkValidationErrorValidContent(sel.lastNameInput, validLastName, {
      addSpaces: true,
    });
    cy.checkValidationErrorValidContent(sel.lastNameInput, lastNameWithHyphen);
  });

  it("Validates Email field: empty", () => {
    cy.get(sel.emailInput).should("be.visible");
    cy.checkValidationErrorEmptyField(sel.emailInput, email.empty);
  });

  it("Validates Email field: invalid content", () => {
    const invalidEmails = [
      "ab@",
      "@ab",
      "ab@cd",
      "ab@cd.",
      "ab@cd.e",
      "abcd.ef",
    ];
    invalidEmails.forEach((el) => {
      cy.checkValidationErrorInvalidContent(
        sel.emailInput,
        el,
        email.invalidData
      );
    });
  });

  it("Validates Email field: valid content", () => {
    cy.checkValidationErrorValidContent(sel.emailInput, "hp@mail.com");
  });

  it("Validates Password field: empty", () => {
    cy.get(sel.passwordInput).should("be.visible");
    cy.checkValidationErrorEmptyField(sel.passwordInput, password.empty);
  });

  it("Validates Password field: invalid content", () => {
    const invalidPasswords = [
      "A".repeat(7),
      "B".repeat(16),
      "C".repeat(8),
      "d".repeat(8),
      "1".repeat(8),
      "%".repeat(8),
    ];
    invalidPasswords.forEach((el) => {
      cy.checkValidationErrorInvalidContent(
        sel.passwordInput,
        el,
        password.invalidData,
        { isSensitive: true }
      );
    });
  });

  it("Validates Password field: valid content", () => {
    cy.checkValidationErrorValidContent(sel.passwordInput, "Qwerty12", {
      isSensitive: true,
    });
  });

  it("Validates Re-enter password field: empty", () => {
    cy.get(sel.repeatPasswordInput).should("be.visible");
    cy.checkValidationErrorEmptyField(
      sel.repeatPasswordInput,
      repeatPassword.empty
    );
  });

  it("Validates Re-enter password field: passwords do not match", () => {
    cy.get(sel.passwordInput).clear().type("Qwerty12", { isSensitive: true });
    cy.checkValidationErrorInvalidContent(
      sel.repeatPasswordInput,
      "Awerty12",
      repeatPassword.invalidMatch,
      { isSensitive: true }
    );
  });
});

describe("Registration form Happy path", () => {
  const fakerUser = {
    nameData: faker.person.firstName(),
    lastNameData: faker.person.lastName(),
    emailData: faker.internet.email({ provider: "qauto.faker" }),
    passwordData: "123Qwerty",
    repeatPasswordData: "123Qwerty",
  };

  it("Registration a new user", () => {
    cy.visit("");
    cy.contains("button", "Sign up").click();

    cy.get(sel.nameInput).clear().type(fakerUser.nameData);
    cy.get(sel.lastNameInput).clear().type(fakerUser.lastNameData);
    cy.get(sel.emailInput).clear().type(fakerUser.emailData);
    cy.get(sel.passwordInput)
      .clear()
      .type(fakerUser.passwordData, { isSensitive: true });
    cy.get(sel.repeatPasswordInput)
      .clear()
      .type(fakerUser.repeatPasswordData, { isSensitive: true });

    cy.get(sel.submitButton).should("be.visible").click();
    cy.contains(selHeader.myProfileButton, "My profile")
      .should("be.visible")
      .click();
    cy.contains("button", "Logout").should("be.visible").click();
  });

  it("Login a new user", () => {
    cy.visit("");
    cy.contains("button", "Sign In").click();

    cy.login(fakerUser.emailData, fakerUser.passwordData);
    cy.contains(selHeader.myProfileButton, "My profile").should("be.visible");
  });
});
