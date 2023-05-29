import "./index.css"
import { FormValidator } from "../scripts/FormValidator.js";
import { Card } from "../scripts/Card.js";
import Section from '../scripts/Section.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from "../scripts/UserInfo.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import Api from "../scripts/Api.js";
import PopupDelete from "../scripts/PopupDelete.js"
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
// кнопка открытия редактирования профиля
const buttonOpenProfile = document.querySelector('.profile__container-edit');
// const popupOpenEdit = document.querySelector('.popup_open-edit');
// ввод имени
const nameInput = document.querySelector('#name-input');
// ввод статуса профиля
const jobInput = document.querySelector('#info-input');
// имя профиля
const title = document.querySelector('.profile__container-title');
// статус профиля
const subtitle = document.querySelector('.profile__container-subtitle');
// кнопка открытия попапа добавления карточек
const buttonOpenEdit = document.querySelector('.profile__container-add');

// const popupOpenCard = document.querySelector('.popup_card-add');
const placeNameCard = document.querySelector('.popup__input_place_name');
// ссылка на карточку
const placeUrlCard = document.querySelector('.popup__input_place_url');
const popupAdding =  document.querySelector("form[name='popup_adding']");
const popupProfile = document.querySelector("form[name='popup_profile']")

const popupAvatar = document.querySelector("form[name='popup_avatar']")
// const popupDelete = document.querySelector("form[name='popup_delete']")
const profileAvatar = document.querySelector('.profile__avatar')
const buttonOpenAvatar = document.querySelector('.profile__avatar-edit-button')
const popupConfigDelete = document.querySelector('.popup_config-delete')
const infoSelector = {
  inputNameSelector: '.profile__container-title',
  inputJobSelector: '.profile__container-subtitle',
  avatarSelector: '.profile__avatar'
}
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '1790fb33-a99f-4e21-b0c7-67d6836b01a4',
    'Content-Type': 'application/json'
  }
})


const deleteFormCard = new PopupDelete('.popup_config-delete', ({card, cardId}) => {
  api.deleteCard(cardId)
    .then(res => {
      card.remove();
      deleteFormCard.close()
    })
})
deleteFormCard.setEventListeners()


const createCard = (data) => { 
  const card = new Card( { 
    data: data, 
    handleCardClick: cardData => {
      popupFigure.open(cardData) 
    }
  }, '.template-cards', deleteFormCard.open, (like, cardId) => {
    if(like.classList.contains('element__group-like_active')){
      api.inActiveLike(cardId)
        .then(res => {
          card.toggleLike(res.likes)
        })
        .catch((err => console.log(`Ошибка ${err}`)))
    } else {
      api.activeLike(cardId)
        .then(res => {
          card.toggleLike(res.likes)
        })
        .catch((err => console.log(`Ошибка ${err}`)))
    }   
  });
  return card.renderCard()
}





const cardList = new Section((element) => {
  cardList.addItem(createCard(element))
}, '.elements')


const popupFigure = new PopupWithImage('.popup_zoom-image')
popupFigure.setEventListeners()


const popupFormCardAdd = new PopupWithForm('.popup_card-add', newValues => {
  Promise.all([api.getUserInfo(), api.addCard(newValues)])
   .then(([dataUser, dataCard]) => {
    dataCard.myid = dataUser._id;
    cardList.addItem(createCard(dataCard));
    popupFormCardAdd.close()
   })
   .catch((err => console.log(`Ошибка ${err}`)))

})
popupFormCardAdd.setEventListeners()

const userInfo = new UserInfo(infoSelector)
const popupFormProfilEdit = new PopupWithForm('.popup_open-edit', newValues => {
  api.setUserInfo(newValues)
    .then(res => {
      userInfo.setUserInfo({name: res.name, info: res.about, avatar: res.avatar})
    })
    .catch((err => console.log(`Ошибка ввода ${err}`)))
  // userInfo.setUserInfo(newValues);
  popupFormProfilEdit.close()
})
popupFormProfilEdit.setEventListeners()


function openProfilePopup() {
  profileEditFormValidator.disableSubmitButton()
  userInfo.getUserInfo()
  nameInput.value = title.textContent;
  jobInput.value = subtitle.textContent;
  popupFormProfilEdit.open()

}
buttonOpenProfile.addEventListener('click', openProfilePopup);

buttonOpenEdit.addEventListener('click', _ => {
  cardAddFormValidator.disableSubmitButton()
  popupFormCardAdd.open()
})


const validation = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}); 

const profileEditFormValidator = new FormValidator(validation, popupProfile)
profileEditFormValidator.enableValidation()

const cardAddFormValidator = new FormValidator(validation, popupAdding)
cardAddFormValidator.enableValidation()
//валидация аватара
const profileEditAvatar = new FormValidator(validation, popupAvatar)



const avatarEditSelector = new PopupWithForm('.popup_avatar', (data) => {
  api.setUserAvatar(data)
  .then(res => {
    userInfo.setUserInfo({name: res.name, info: res.about, avatar: res.avatar})
  })
  .catch((err => console.log(`Ошибка ${err}`)))
  // .finally(() => avatarEditSelector.textChange())
  avatarEditSelector.close()
})
avatarEditSelector.setEventListeners()
// avatarEditSelector.textChange()

buttonOpenAvatar.addEventListener('click', () => {
  profileEditAvatar.enableValidation()
  avatarEditSelector.open()
})


Promise.all([api.getUserInfo(), api.getUserCard()])
  .then(([dataUser, dataCard]) => {
    dataCard.forEach(item => item.myid = dataUser._id)
    userInfo.setUserInfo({name: dataUser.name, info: dataUser.about, avatar: dataUser.avatar})
    cardList.render(dataCard.reverse())
  })
  .catch((err => console.log(`Ошибка ${err}`)))

