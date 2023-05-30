import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
    constructor(popupSelector, handleClickDelete) {
        super(popupSelector)
        this._handleClickDelete = handleClickDelete
        this._form = this._popup.querySelector('.popup__form')
        
    }
    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this._handleClickDelete({card: this._card, cardId: this._cardId})
        })
    }
    open = ({card, cardId}) => {
        super.open()
        this._card = card
        this._cardId = cardId
    }
}