import Popup from './Popup.js'

export default class PopupWidthConfiguration extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popupForm = this._popup.querySelector('.popup__form')
    this._popupButton = this._popupForm.querySelector('.popup__button')
    this._popupButtonTextContent = this._popupButton.textContent
  }

  setEventListeners() {
    super.setEventListeners()
    this._popupForm.addEventListener('submit', data => {
      data.preventDefault()
      this._handleSubmitCallback()
    })
  }

  setSubmitActive(data) {
    this._handleSubmitCallback = data
  }

  renderLoading(Loading) {
    if(Loading) {
      this._popupButton.textContent = 'Сохранение...'
    } else {
      this._popupButton.textContent = this._popupButtonTextContent
    }
  }
}
