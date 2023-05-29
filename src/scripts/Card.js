export class Card {
    constructor({data, handleCardClick}, cardSelector, deleteOpenPopup, likeSelector) {
      this._name = data.name
      this._link = data.link
      this._handleCardClick = handleCardClick
      this._cardSelector = cardSelector
      this._deleteOpenPopup = deleteOpenPopup
      this._myId = data.myid
      this._ownerId = data.owner._id

      this._likes = data.likes
      this._likeLength = data.likes.length
      this._likeSelector = likeSelector
      this._cardId = data._id
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
      this._checkTreshButton()
      this._checkLike()
      this._img.alt = this._name
      this._img.src = this._link
      this._card.querySelector('.element__group-subtitle').textContent = this._name    
      return this._card
    }
    _setEventListeners() {
      this._img = this._card.querySelector('.element__image')
      this._like = this._card.querySelector('.element__group-like')
      this._count = this._card.querySelector('.elements__like-count')
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
      this._likeSelector(this._like, this._cardId)
    }
    _handleRemoveCard() {
      this._deleteOpenPopup({card: this._card, cardId: this._cardId})
    }
    removeCard() {
      this._card.remove()
    }
    _checkTreshButton() {
      if(!(this._myId === this._ownerId)) {
        this._card.querySelector('.element__trash').style.display = 'none'
      }
      return this._card
    }
    _checkLike() {
      this._likes.forEach(element => {
        if(element._id === this._myId) {
          this._like.classList.add('element__group-like_active')
          return
        }
      })
      this._count.textContent = this._likeLength
    }
    toggleLike(item) {
      this._like.classList.toggle('element__group-like_active')
      this._count.textContent = item.length
    }
}
