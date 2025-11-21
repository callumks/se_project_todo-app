import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form");
  }

  _getInputValues() {
    const formData = new FormData(this._form);
    const values = {};
    
    // Get all input values from the form
    for (const [key, value] of formData.entries()) {
      values[key] = value;
    }
    
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  }
}

