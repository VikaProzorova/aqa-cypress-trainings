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

import { registrationFormSelectors as selRegistration } from '../selectors/registrationForm';
import { loginFormSelectors as selLogin } from '../selectors/loginForm';

Cypress.Commands.overwrite('visit', (originalFn, url, ...args) => {
  originalFn(url, {
    auth: {
      username: 'guest',
      password: 'welcome2qauto'
    },
    ...args
  })
});

Cypress.Commands.overwrite('type', (originalFn, element, text, options = {}) => {
  if (options.isSensitive) {
    options.log = false;
    options._log = Cypress.log({
      $el: element,
      name: 'type',
      message: '******',
    });
  }
  return originalFn(element, text, options)
});

Cypress.Commands.add('login', {prevSubject: false} ,(email = Cypress.env('DEFAULT_USER_EMAIL'), password = Cypress.env('DEFAULT_USER_PASSWORD')) => {
  cy.visit('')
  cy.contains('button', 'Sign In').click();
  cy.get(selLogin.emailInput).type(email);
  cy.get(selLogin.passwordInput).type(password, { isSensitive: true });
  cy.contains(selLogin.submitButton, 'Login').click();
});

Cypress.Commands.add('checkValidationErrorEmptyField', (fieldId, errorText) => {
  cy.get(fieldId)
    .clear()
    .blur()
    .should('have.css', 'border-color', 'rgb(220, 53, 69)')
    .closest('.form-group')
    .find(selRegistration.errorMessage)
    .should('be.visible')
    .and('have.text', errorText);
});

Cypress.Commands.add('checkValidationErrorInvalidContent', (fieldId, invalidContent, errorText, { isSensitive = false } = {}) => {
  cy.get(fieldId)
    .clear()
    .type(invalidContent, { isSensitive })
    .blur()
    .should('have.css', 'border-color', 'rgb(220, 53, 69)')
    .closest('.form-group')
    .find(selRegistration.errorMessage)
    .should('be.visible')
    .and('have.text', errorText);
});

Cypress.Commands.add('checkValidationErrorValidContent', (fieldId, content, { addSpaces = false, isSensitive = false } = {}) => {
  const contentToType = addSpaces ? `  ${content}  ` : content;
  cy.get(fieldId)
    .clear()
    .type(contentToType, { isSensitive })
    .blur()
    .closest('.form-group')
    .get(selRegistration.errorMessage)
    .should('not.exist');
});