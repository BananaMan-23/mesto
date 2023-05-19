export class Card {
    constructor({data, handleCardClick}, cardSelector) {
      this._name = data.name
      this._link = data.link
      this._handleCardClick = handleCardClick
      this._cardSelector = cardSelector
    }
    _getTemplate () {
      this._card = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true)
    }
    renderCard() {
      this._getTemplate()
      this._setEventListeners()
      this._img.alt = this._name
      this._img.src = this._link
      this._card.querySelector('.element__group-subtitle').textContent = this._name    
      // container.prepend(this._cards)
      return this._card
    }
    _setEventListeners() {
      this._img = this._card.querySelector('.element__image')
      this._like = this._card.querySelector('.element__group-like')
      this._like.addEventListener('click', () => {
        this._handleLikeCard()
        })
      
  
      this._card
        .querySelector('.element__trash')
        .addEventListener('click', () => {
          this._handleRemoveCard()
        })
  
      this._img
        .addEventListener('click', () => {
          this._handleCardClick({ 
            name: this._name,
            link: this._link })
        })
    }
    _handleLikeCard() {
      this._like
      .classList.
      toggle('element__group-like_active')
    }
    _handleRemoveCard() {
      this._card.remove();
    }
}
