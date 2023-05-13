import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import  Popup from "./Popup.js"
import PopupWithImage from "./PopupWithImage.js";
import Section from './Section.js'
import PopupWithForm from './PopupWithForm.js'



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
    const card = new Card(item, '.template-cards')
    const cardElement = card.renderCards()

    cardList.addItem(cardElement)
  } }, '.elements')

cardList.render()

// функция добавления карточки
const popupFormCardAdd = new PopupWithForm('.popup_card-add', _ => {
  const newValues = 
  {
    name: placeNameCard.value,
    link: placeUrlCard.value
  }

  const card = new Card(newValues, '.template-cards')
  const cardElement = card.renderCards()
  cardList.addItem(cardElement)
  cardAddFormValidator.disableSubmitButton()
  popupOpenEd.close()
})

popupFormCardAdd.setEventListeners()
popupAdding.addEventListener('click', _ => {
  popupFormCardAdd.open()
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

function handleProfileFormSubmit (evt) {
  evt.preventDefault(); 
  title.textContent = nameInput.value; 
  subtitle.textContent = jobInput.value;
  popupOpenProfile.close()
}  
popupProfile.addEventListener('submit', handleProfileFormSubmit);
// функция открытия второго попапа
const popupOpenEd = new Popup('.popup_card-add')
popupOpenEd.setEventListeners()
buttonOpenEdit.addEventListener('click', _ => {
  popupOpenEd.open()
})


// function closeByEscape(evt) {
//   if (evt.key === 'Escape') {
//     const openedPopup = document.querySelector('.popup_opened');
//     closePopup(openedPopup)
//   }
// }
// export function openPopup (popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closeByEscape); 
// }

// export function closePopup (popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closeByEscape); 
// }


buttonOpenProfile.addEventListener('click', openProfilePopup);
// buttonOpenEdit.addEventListener('click', () => openPopup(popupOpenCard));

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

// function createCard (item) {
//   const newCard = new Card(item, '.template-cards')
//   return newCard.renderCards()
// }

// function addCard(event) {
//   event.preventDefault()
//   const newValues = ({
//       name: placeNameCard.value,
//       link: placeUrlCard.value
//   });
//   const newCards = cardList.addItem(newValues)
//   event.target.reset();
//   cardAddFormValidator.disableSubmitButton()
//   popupOpenEd.close()
//   elements.prepend(newCards)
// }

// initialCards.forEach((item) => {
//   const cardElement = createCard(item)
//   elements.prepend(cardElement)
// })
// popupAdding.addEventListener('submit',addCard);

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
