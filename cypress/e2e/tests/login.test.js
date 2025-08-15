import errors from "../../fixtures/errorMessages.json";

import { loginFormSelectors as sel } from "../../selectors/loginForm";
import { restoreAccessFormSelectors as selRestore } from "../../selectors/loginForm";
import { registrationFormSelectors as selRegistration } from "../../selectors/registrationForm";
import { headersSelectors as selHeader } from "../../selectors/header";

describe("Login form elements existence and basic logic tests", () => {
  beforeEach(() => {
    cy.visit("");
    cy.contains("button", "Sign In").click();
  });

  it("All elements are visible", () => {
    cy.get(sel.emailInput).should("be.visible");
    cy.get(sel.passwordInput).should("be.visible");
    cy.get(sel.rememberCheckbox).should("be.visible");
    cy.contains(".btn.btn-link", "Forgot password").should("be.visible");
    cy.contains(
      sel.registrationButton.selector,
      sel.registrationButton.text
    ).should("be.visible");
    cy.contains(sel.loginButton.selector, sel.loginButton.text).should(
      "be.visible"
    );
  });

  it("Checkbox check test", () => {
    cy.get(sel.rememberCheckbox).check();
    cy.get(sel.rememberCheckbox).should("be.checked");
  });

  it("Registration button test", () => {
    cy.contains(
      sel.registrationButton.selector,
      sel.registrationButton.text
    ).click();
    cy.contains(
      selRegistration.title.selector,
      selRegistration.title.text
    ).should("be.visible");
  });

  it("Forgot password button test", () => {
    cy.contains(
      sel.restoreAccessButton.selector,
      sel.restoreAccessButton.text
    ).click();
    cy.contains(selRestore.title.selector, selRestore.title.text).should(
      "be.visible"
    );
  });

  it("Close form button test", () => {
    cy.get(sel.closeButtonIcon).click();
    cy.contains(sel.title.selector, sel.title.text).should("not.be.visible");
  });
});

describe("Login form validation tests", () => {
  const { email, password } = errors.loginForm;

  beforeEach(() => {
    cy.visit("");
    cy.contains("button", "Sign In").click();
  });

  it("Validates Email field: empty", () => {
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
    cy.checkValidationErrorEmptyField(sel.passwordInput, password.empty);
  });

  it("Validates Password field: valid content", () => {
    cy.checkValidationErrorValidContent(sel.passwordInput, "Qwerty12", {
      isSensitive: true,
    });
  });

  it("Show error if wrong data entered", () => {
    cy.get(sel.emailInput).clear().type("hp1114499@mail.com");
    cy.get(sel.passwordInput).clear().type("Qwerty12", { isSensitive: true });
    cy.contains(sel.loginButton.selector, sel.loginButton.text)
      .should("be.visible")
      .click();
    cy.contains(sel.wrongDataAlert.selector, sel.wrongDataAlert.text).should(
      "be.visible"
    );
  });
});

describe("Login form Happy path", () => {
  it("Login default env user", () => {
    cy.visit("");
    cy.contains("button", "Sign In").click();

    cy.login(
      Cypress.env("DEFAULT_USER_EMAIL"),
      Cypress.env("DEFAULT_USER_PASSWORD")
    );
    cy.contains(selHeader.myProfileButton, "My profile").should("be.visible");
  });
});
