export const loginFormSelectors = {
  emailInput: "#signinEmail",
  passwordInput: "#signinPassword",
  rememberCheckbox: "#remember",
  restoreAccessButton: {
    selector: ".modal-body .btn.btn-link",
    text: "Forgot password",
  },
  registrationButton: {
    selector: ".modal-footer .btn.btn-link",
    text: "Registration",
  },
  loginButton: {
    selector: ".modal-footer .btn.btn-primary",
    text: "Login",
  },
  wrongDataAlert: {
    selector: ".modal-body .alert",
    text: "Wrong email or password",
  },
  closeButtonIcon: '.close span[aria-hidden="true"]',
  title: {
    selector: ".modal-title",
    text: "Log in",
  },
};

export const restoreAccessFormSelectors = {
  emailInput: "#signinEmail",
  sendButton: {
    selector: ".modal-footer .btn.btn-primary",
    text: "Send",
  },
  title: {
    selector: ".modal-header .modal-title",
    text: "Restore access",
  },
};
