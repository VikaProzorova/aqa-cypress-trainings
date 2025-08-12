const {
  supportEmailLabel,
  supportEmailHref,
  mainSiteHref,
  mainSiteLabel,
  facebookHref,
  telegramHref,
  youtubeHref,
  linkedinHref,
} = Cypress.env("contacts");

describe("Header buttons visibility", () => {
  beforeEach(() => {
    cy.visit("");
  });
  it('Is button "Sign up" visible', () => {
    cy.contains("button", "Sign up").should("be.visible");
  });
  it('Is button "About" visible', () => {
    cy.contains("button", "About").should("be.visible");
  });
  it('Is button "Home" visible', () => {
    cy.contains(".btn.header-link", "Home").should("be.visible");
  });
  it('Is button "Contacts" visible', () => {
    cy.contains("button", "Contacts").should("be.visible");
  });
  it('Is button "Sign in" visible', () => {
    cy.contains("button", "Sign In").should("be.visible");
  });
  it('Is button "Guest log in" visible', () => {
    cy.contains("button", "Guest log in").should("be.visible");
  });
});

describe("Footer social contacts buttons visibility and links", () => {
  beforeEach(() => {
    cy.visit("");
  });
  it("Check Facebook button visibility and link", () => {
    cy.get(".socials_icon.icon-facebook")
      .should("be.visible")
      .parent("a")
      .should("have.attr", "href", facebookHref)
      .and("have.attr", "target", "_blank");
  });
  it("Check Telegram button visibility and link", () => {
    cy.get(".socials_icon.icon-telegram")
      .should("be.visible")
      .parent("a")
      .should("have.attr", "href", telegramHref)
      .and("have.attr", "target", "_blank");
  });
  it("Check Youtube button visibility and link", () => {
    cy.get(".socials_icon.icon-youtube")
      .should("be.visible")
      .parent("a")
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href")
      .and("include", youtubeHref);
  });
  it("Check Linkedin button visibility and link", () => {
    cy.get(".socials_icon.icon-linkedin")
      .should("be.visible")
      .parent("a")
      .should("have.attr", "href", linkedinHref)
      .and("have.attr", "target", "_blank");
  });
});

describe("Footer buttons visibility and links", () => {
  beforeEach(() => {
    cy.visit("");
  });
  it("Check main site button visibility and link", () => {
    cy.contains("a.contacts_link", mainSiteLabel)
      .should("be.visible")
      .should("have.attr", "href", mainSiteHref)
      .and("have.attr", "target", "_blank");
  });
  it("Check send email button visibility and link", () => {
    cy.contains("a.contacts_link", supportEmailLabel)
      .should("be.visible")
      .and("have.attr", "href", supportEmailHref);
  });
});
