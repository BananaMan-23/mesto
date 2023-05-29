import Popup from "./Popup.js"
export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector)
        this._submitCallback = submitCallback
        this._popupForm = this._popup.querySelector('.popup__form')
        this._inputList = this._popupForm.querySelectorAll('.popup__input')
        this._submitButton = this._popupForm.querySelector('.popup__button')
        this._buttonText = this._submitButton.textContent
    }
    _getInputValues() {
    this._newValues = {}
    this._inputList.forEach(inputElement => {
      this._newValues[inputElement.name] = inputElement.value
    })
    return this._newValues
    }
    
    close() {
        super.close()
        this._popupForm.reset()
    }
    setEventListeners() {
        super.setEventListeners()
        this._popupForm.addEventListener('submit', evt => {
            evt.preventDefault()
            this._submitButton.textContent = `${this._submitButton.textContent}...`
            this._submitCallback(this._getInputValues())
        })
    }
    textChange() {
        this._submitButton.textContent = this._buttonText
    }
}