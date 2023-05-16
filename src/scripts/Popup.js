export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)
        this._handleEscClosed = this._handleEscClose.bind(this)
    }
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClosed)
    }
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClosed)
    }
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            // const openedPopup = document.querySelector('.popup_opened');
            // this.close(openedPopup)
            this.close()
        }
    }
    _closePopup() {
        const popups = document.querySelectorAll('.popup')
        popups.forEach((popup) => {
        popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.close()
        }
        if (evt.target.classList.contains('popup__close')) {
            this.close()
        }
    })
})
    }
    setEventListeners() {
        this._closePopup()
        this._popup.querySelector('.popup__close').addEventListener('click', _ => this.close())
    }
}