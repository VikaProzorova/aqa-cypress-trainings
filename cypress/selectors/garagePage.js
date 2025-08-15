export const garagePageSelectors = {
  title: {
    selector: ".panel-page",
    text: "Garage",
  },
  addCarButton: {
    selector: ".panel-page .btn.btn-primary",
    text: "Add car",
  },
  addFuelExpenseButton: {
    selector: ".car_actions .btn.btn-success",
    text: "Add fuel expense",
  },
  carItem: ".car-item",
  carFullName: ".car-list .car-item .car_name",
  editCarButton: ".car_edit .icon.icon-edit",
  editCar: {
    removeButton: {
      selector: ".modal-footer .btn.btn-outline-danger",
      text: "Remove car",
    },
  },
  removeCar: {
    removeButton: {
      selector: ".modal-footer .btn.btn-danger",
      text: "Remove",
    },
  },
};
