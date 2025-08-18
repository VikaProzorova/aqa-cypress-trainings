// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { errorsAttributes as errors } from "../selectors/errorsAttributes";
import { loginFormSelectors as selLogin } from "../selectors/loginForm";

Cypress.Commands.overwrite("visit", (originalFn, url, ...args) => {
  originalFn(url, {
    auth: {
      username: "guest",
      password: "welcome2qauto",
    },
    ...args,
  });
});

Cypress.Commands.overwrite(
  "type",
  (originalFn, element, text, options = {}) => {
    if (options.isSensitive) {
      options.log = false;
      options._log = Cypress.log({
        $el: element,
        name: "type",
        message: "******",
      });
    }
    return originalFn(element, text, options);
  }
);

Cypress.Commands.add(
  "login",
  { prevSubject: false },
  (
    email = Cypress.env("DEFAULT_USER_EMAIL"),
    password = Cypress.env("DEFAULT_USER_PASSWORD")
  ) => {
    cy.visit("");
    cy.contains("button", "Sign In").click();
    cy.get(selLogin.emailInput).type(email);
    cy.get(selLogin.passwordInput).type(password, { isSensitive: true });
    cy.contains(
      selLogin.loginButton.selector,
      selLogin.loginButton.text
    ).click();
  }
);

Cypress.Commands.add(
  "checkValidationErrorEmptyField",
  (selector, errorText) => {
    cy.get(selector)
      .clear()
      .blur()
      .should("have.css", "border-color", errors.borderColor)
      .closest(".form-group")
      .find(errors.errorMessageSelector)
      .should("be.visible")
      .and("have.text", errorText);
  }
);

Cypress.Commands.add(
  "checkValidationErrorInvalidContent",
  (selector, invalidContent, errorText, { isSensitive = false } = {}) => {
    cy.get(selector)
      .clear()
      .type(invalidContent, { isSensitive })
      .blur()
      .should("have.css", "border-color", errors.borderColor)
      .closest(".form-group")
      .find(errors.errorMessageSelector)
      .should("be.visible")
      .and("have.text", errorText);
  }
);

Cypress.Commands.add(
  "checkValidationErrorValidContent",
  (selector, content, { addSpaces = false, isSensitive = false } = {}) => {
    const contentToType = addSpaces ? `  ${content}  ` : content;
    cy.get(selector)
      .clear()
      .type(contentToType, { isSensitive })
      .blur()
      .closest(".form-group")
      .get(errors.errorMessageSelector)
      .should("not.exist");
  }
);

Cypress.Commands.add(
  "loginViaApi",
  (
    email = Cypress.env("DEFAULT_USER_EMAIL"),
    password = Cypress.env("DEFAULT_USER_PASSWORD")
  ) => {
    cy.request({
      method: "POST",
      url: "api/auth/signin",
      body: {
        email,
        password,
        remember: false,
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  }
);

Cypress.Commands.add("addFuelExpenseViaApi", (reqBody = {}) => {
  cy.request({
    method: "POST",
    url: "/api/expenses",
    body: reqBody,
  }).then((response) => {
    expect(response.status).to.equal(200);
    expect(response.body.data).to.include(reqBody);
  });
});
