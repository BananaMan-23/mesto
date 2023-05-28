export class Card {
    constructor({data, handleCardClick}, cardSelector, api) {
      this._name = data.name
      this._link = data.link
      this._handleCardClick = handleCardClick
      this._cardSelector = cardSelector
      this._api = api
      this._id = data._id
      this._likes = data.likes
      // this._handleDeleteCard = handleDeleteCard
      // this._master = data.master._id
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
      this._card.querySelector('.elements__like-count').textContent = this._likes.length
      // if(!(this._master === data.id)) {
      //   this._card.querySelector('.element__trash').style.display = 'none'
      // }
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
        .addEventListener('click', (data) => {
          this._handleRemoveCard()
        })
      // this._card
      // .querySelector('.element__trash')
      // .addEventListener('click', (item) => {
      //   this._handleDeleteCard(item)
      // })
  
      this._img
        .addEventListener('click', () => {
          this._handleCardClick({ 
            name: this._name,
            link: this._link })
        })
    }
    _handleLikeCard() {
      const like = this._card.querySelector('.element__group-like')
      const countLike = this._card.querySelector('.elements__like-count')
      if(!like.classList.contains('.element__group-like_active')){
        this._api.like(this._id)
        .then((data) => {
          like.classList.add('element__group-like_active')
          countLike.textContent = data.likes.length
        })
        .catch((err) => {
          console.log('Ошибка', err)
        })
      } else {
        this._api.dislike(this._id)
        .then((data) => {
          like.classList.remove('element__group-like_active')
          countLike.textContent = data.likes.length
        })
        .catch((err) => {
          console.log('Ошибка', err)
        })
      }
    }
    _handleRemoveCard() {
      this._card.remove();
    }
}
