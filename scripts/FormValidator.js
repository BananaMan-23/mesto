import { closePopup } from "./index.js"

export class FormValidator {
    constructor(data, formElement) {
      this._inputSelector = data.inputSelector
      this._submitButtonSelector = data.submitButtonSelector
      this._inactiveButtonClass = data.inactiveButtonClass
      this._inputErrorClass = data.inputErrorClass
      this._errorClass = data.errorClass
      this._formElement = formElement
    }

    _activeError(inputElement, errorMessage) {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
      inputElement.classList.add(this._inputErrorClass)
      errorElement.classList.add(this._errorClass)
      errorElement.textContent = errorMessage
    }
  
    _inactiveError(inputElement) {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
      inputElement.classList.remove(this._inputErrorClass)
      errorElement.classList.remove(this._errorClass)
      errorElement.textContent = ''
    }
  
    _checkInputValidity(inputElement) {
      if(!inputElement.validity.valid) {
        this._activeError(inputElement, inputElement.validationMessage)
      } else
        this._inactiveError(inputElement)
    }
  
    _hasInvalidInput(inputList) {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid
      })
    }
  
    _clickButton(inputList, buttonElement) {
      if (this._hasInvalidInput(inputList)) {
        buttonElement.classList.add(this._inactiveButtonClass)
        buttonElement.disabled = true
      } else {
        buttonElement.classList.remove(this._inactiveButtonClass)
        buttonElement.disabled = false
      }
    }
  
    _setIventListeners() {
      this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector))
      this._buttonElement = this._formElement.querySelector(this._submitButtonSelector)
      this._clickButton(this._inputList, this._buttonElement)
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(inputElement)
          this._clickButton(this._inputList, this._buttonElement)
        })
      })
    }
  
    enableValidation() {
      this._setIventListeners();
    }
}
export function resetValidation() {
  addingCardButton.classList.add('popup__button_disabled');
  addingCardButton.disabled = true;
  closePopup(popupOpenCard);
}
const addingCardButton = document.querySelector('.popup__add-card');
const popupOpenCard = document.querySelector('.popup_card-add');
