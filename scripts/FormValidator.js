export default class FormValidator {
  constructor(object, formElement) {
    this._formElement = formElement;
    this._inputElement = object.inputElement;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._inputErrorClass = object.inputErrorClass;
    this._errorClassActive = object.errorClassActive;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputElement));
    this._submitButtonContent = this._formElement.querySelector(this._submitButtonSelector);
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClassActive);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClassActive);
    errorElement.textContent = '';
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation = () => {
    this._setEventListeners();
  };

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _disableButton = () => {
    this._submitButtonContent.classList.add(this._inactiveButtonClass);
    this._submitButtonContent.setAttribute('disabled', true);
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._submitButtonContent.classList.remove(this._inactiveButtonClass);
      this._submitButtonContent.removeAttribute('disabled');
    }
  };

  resetPopupForm = () => {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._disableButton();
  };
}