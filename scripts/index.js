import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import  Popup from "./Popup.js"
import Section from './Section.js'
import PopupWithForm from './PopupWithForm.js'
import UserInfo from "./UserInfo.js";
import PopupWithImage from "./PopupWithImage.js";

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

// Функция отрисовки карточек
const cardList = new Section( {
  items: initialCards,
  renderer: (item) => {
    const card = new Card({data: item, handleCardClick: _ => {
      popupFigure.open(item)
    }}, '.template-cards')
    const cardElement = card.renderCards()

    cardList.addItem(cardElement)
  } }, '.elements')

cardList.render()

const popupFigure = new PopupWithImage('.popup_zoom-image')
popupFigure.setEventListeners()

// функция добавления карточки
const popupFormCardAdd = new PopupWithForm('.popup_card-add', newValues => {
  
  const card = new Card({data: newValues, handleCardClick: _ => {
    popupFigure.open(newValues)
  }}, '.template-cards')
  const cardElement = card.renderCards()
  cardList.addItem(cardElement)
  cardAddFormValidator.disableSubmitButton()
  popupOpenEd.close()
})

popupFormCardAdd.setEventListeners()
// popupAdding.addEventListener('click', _ => {
//   const userData = userInfo.getUserInfo()
//   // profileNameInput.value = userData.name
//   // profileInfoInput.value = userData.info
//   popupFormCardAdd.open()
// })

// const popupFormProfilEd = new PopupWithForm('.popup_profile-edit', _ => {
//   handleProfileFormSubmit()
// })
// popupFormProfilEd.setEventListeners()
// buttonOpenProfile.addEventListener('click', _ => {
//   popupFormProfilEd.open()
//   openProfilePopup()
// })

const userInfo = new UserInfo({name: '.profile__container-title', job: '.profile__container-subtitle'})
userInfo.getUserInfo()
const popupFormProfilEdit = new PopupWithForm('.popup_open-edit', _ => {
  userInfo.setUserInfo()
  popupFormProfilEdit.close()

})
popupFormProfilEdit.setEventListeners()
popupAdding.addEventListener('click', _ => {
  nameInput.textContent = userInfo.getUserInfo().value
 jobInput.textContent = userInfo.getUserInfo().value
})


// функция открытия попапа профиля
const popupOpenProfile = new Popup('.popup_open-edit')
popupOpenProfile.setEventListeners()
buttonOpenProfile.addEventListener('click', _ => {
  popupOpenProfile.open()
})
function openProfilePopup() {
  nameInput.value = title.textContent;
  jobInput.value = subtitle.textContent;
}

// function handleProfileFormSubmit (evt) {
//   evt.preventDefault(); 
//   title.textContent = nameInput.value; 
//   subtitle.textContent = jobInput.value;
//   popupOpenProfile.close()
// }  
// popupProfile.addEventListener('submit', handleProfileFormSubmit);
// функция открытия второго попапа
const popupOpenEd = new Popup('.popup_card-add')
popupOpenEd.setEventListeners()
buttonOpenEdit.addEventListener('click', _ => {
  popupOpenEd.open()
})

buttonOpenProfile.addEventListener('click', openProfilePopup);

const popups = document.querySelectorAll('.popup')
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            popupOpenProfile.close()
            popupOpenEd.close()
        }
        if (evt.target.classList.contains('popup__close')) {
          popupOpenProfile.close()
          popupOpenEd.close()
        }
    })
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
