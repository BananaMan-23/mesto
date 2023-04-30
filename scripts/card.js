import { openPopup } from "./index.js"
export class Card {
    constructor(data, cardSelector) {
      this._name = data.name
      this._link = data.link
      this._cardSelector = cardSelector
    }
    _getTemplate () {
      this._cards = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true)
    }
    renderCards(container) {
      this._getTemplate()
      this._setEventListeners()
      this._cards.querySelector('.element__image')
      .src = this._link
      this._cards.querySelector('.element__group-subtitle').textContent = this._name    
      container.prepend(this._cards)
    }
    _setEventListeners() {
      this._cards
      .querySelector('.element__group-like')
      .addEventListener('click', () => {
        this._handleLikeCard()
        })
  
      this._cards
      .querySelector('.element__trash')
      .addEventListener('click', () => {
          this._handleRemoveCard()
        })
  
      this._cards
      .querySelector('.element__image')
      .addEventListener('click', () => {
          this._handleOpenPopupImage()
        })
    }
    _handleLikeCard() {
      this._cards
      .querySelector('.element__group-like')
      .classList.
      toggle('element__group-like_active')
    }
    _handleRemoveCard() {
      this._cards.remove();
    }
    _handleOpenPopupImage() {
      popupImage.src = this._link;
      popupImage.alt = this._name;
      popupCaption.textContent = this._name;
      openPopup(popupZoomImage);
    }
}
const popupCaption = document.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup__image');
const popupZoomImage = document.querySelector('.popup_zoom-image');