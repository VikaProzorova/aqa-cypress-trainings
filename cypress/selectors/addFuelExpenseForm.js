export const addFuelExpenseSelectors = {
  title: {
    selector: ".modal-title",
    text: "Add an expense",
  },
  carSelect: "#addExpenseCar",
  reportDate: "#addExpenseDate",
  mileageInput: "#addExpenseMileage",
  litersInput: "#addExpenseLiters",
  totalCostInput: "#addExpenseTotalCost",
  cancelAddExpenseButton: {
    selector: ".modal-footer .btn.btn-secondary",
    text: "Cancel",
  },
  saveAddedExpenseButton: {
    selector: ".modal-footer .btn.btn-primary",
    text: "Add",
  },
  closeButtonIcon: '.close span[aria-hidden="true"]',
};
