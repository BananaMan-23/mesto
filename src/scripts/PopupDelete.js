import Popup from "./Popup.js";

export default class PopupCardDelete extends Popup {
    constructor(popupSelector, buttonSelector) {
        super(popupSelector)
        this._buttonSelector = buttonSelector
        
    }
    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this._buttonSelector(this._element)
        })
    }
    open = (data) => {
        super.open()
        this._element = data
    }
}