const enableValidations = ({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}); 
export class FormValidator {
    constructor(data, formSelector) {
      this._inputSelector = data.inputSelector
      this._submitButtonSelector = data.submitButtonSelector
      this._inactiveButtonClass = data.inactiveButtonClass
      this._inputErrorClass = data.inputErrorClass
      this._errorClass = data.errorClass
      this._formElement = formSelector
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
      const input = Array.from(this._formElement.querySelectorAll(this._inputSelector))
      const buttonElement = this._formElement.querySelector(this._submitButtonSelector)
      this._clickButton(input, buttonElement)
      input.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(inputElement)
          this._clickButton(input, buttonElement)
        })
      })
    }
  
    enableValidation() {
      this._setIventListeners();
    }
}
const form = Array.from(document.querySelectorAll('.popup__form'))
form.forEach((item) => {
  const valid = new FormValidator(enableValidations, item)
  valid.enableValidation()
})