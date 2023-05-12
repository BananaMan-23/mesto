class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)
    }
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this))
    }
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this))
    }
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            const openedPopup = document.querySelector('.popup_opened');
            this.close(openedPopup)
          }
    }
    setEventListeners() {
        this._popup.querySelector('.popup__close').addEventListener('click', _ => this.close())
    }
}