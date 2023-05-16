// import './index.css';
import { FormValidator } from "../scripts/FormValidator.js";
import { Card } from "../scripts/Card.js";
import  Popup from "../scripts/Popup.js";
import Section from '../scripts/Section.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from "../scripts/UserInfo.js";
import PopupWithImage from "../scripts/PopupWithImage.js";

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
const elements = document.querySelector('.elements')

const createCard = (data) => {
  const card = new Card( {
    data: data,
    handleCardClick: _ => {
      popupFigure.open(data)
    }
  }, '.template-cards')
  return card
}


// Функция отрисовки карточек
const cardList = new Section( {
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item)
    const cardElement = card.renderCard()

    cardList.addItem(cardElement)
  } }, '.elements')

cardList.render()

const popupFigure = new PopupWithImage('.popup_zoom-image')
popupFigure.setEventListeners()

// функция добавления карточки
const popupFormCardAdd = new PopupWithForm('.popup_card-add', newValues => {
  const card = createCard(newValues)
  const cardElement = card.renderCard()
  cardList.addItem(cardElement)
  cardAddFormValidator.disableSubmitButton()
  popupFormCardAdd.close()
})

popupFormCardAdd.setEventListeners()

const btn  = document.querySelector('.popup__add-card')

const userInfo = new UserInfo({inputName: '.profile__container-title', inputJob: '.profile__container-subtitle'})
const popupFormProfilEdit = new PopupWithForm('.popup_open-edit', _=> {
  userInfo.setUserInfo(nameInput, jobInput)
  popupFormProfilEdit.close()
})
popupFormProfilEdit.setEventListeners()
btn.addEventListener('click', _ => {
  const userData = userInfo.getUserInfo()
  profileEditFormValidator.disableSubmitButton()
  title.value = userData.name
  subtitle.value = userData.info
})
buttonOpenProfile.addEventListener('click', _ => {
  profileEditFormValidator.enableValidation()
    popupFormProfilEdit.open()
})
function openProfilePopup() {
  nameInput.value = title.textContent;
  jobInput.value = subtitle.textContent;
}
buttonOpenProfile.addEventListener('click', openProfilePopup);


// функция открытия второго попапа
const popupOpenEd = new Popup('.popup_card-add')
popupOpenEd.setEventListeners()
buttonOpenEdit.addEventListener('click', _ => {
  cardAddFormValidator.enableValidation()

  popupOpenEd.open()
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
