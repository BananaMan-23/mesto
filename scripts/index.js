import { FormValidator } from "./FormValidator.js";
import { Card } from "./card.js";

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
const popupOpenEdit = document.querySelector('.popup_open-edit');
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

const popupOpenCard = document.querySelector('.popup_card-add');
const elementsCard = document.querySelector('.elements');
// кнопка добавление карточки на сайт
const addingCardButton = document.querySelector('.popup__add-card');
// название карточки
const placeNameCard = document.querySelector('.popup__input_place_name');
// ссылка на карточку
const placeUrlCard = document.querySelector('.popup__input_place_url');
// template шаблон
// const template = document.querySelector('.template-cards').content;
const popupZoomImage = document.querySelector('.popup_zoom-image');
// картинка в большем размере
const popupImage = document.querySelector('.popup__image');
// подпись к фотографиям
const popupCaption = document.querySelector('.popup__caption');
const popupAdding =  document.querySelector("form[name='popup_adding']");
const popupProfile = document.querySelector("form[name='popup_profile']")


function openImage (item) {
  popupImage.src = item.link;
  popupImage.alt = item.name;
  popupCaption.textContent = item.name;
  openPopup(popupZoomImage);
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup)
  }
}
export function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape); 
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape); 
}

function openProfilePopup() {
    nameInput.value = title.textContent;
    jobInput.value = subtitle.textContent;
    openPopup(popupOpenEdit);
}

function handleProfileFormSubmit (evt) {
    evt.preventDefault(); 
    title.textContent = nameInput.value; 
    subtitle.textContent = jobInput.value;
    closePopup(popupOpenEdit);
}  

// function handleOverlay(event) {
//     if(event.target === event.currentTarget) {
//       closePopup(event.currentTarget);
//     }
// }


popupProfile.addEventListener('submit', handleProfileFormSubmit);
buttonOpenProfile.addEventListener('click', openProfilePopup);
buttonOpenEdit.addEventListener('click', () => openPopup(popupOpenCard));

const popups = document.querySelectorAll('.popup')
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
          closePopup(popup)
        }
    })
})

const handleAddCard = (item) => {
  const newCard = new Card(item, '.template-cards')
  newCard.renderCards(elementsCard)
}

function addCard(event) {
  event.preventDefault()
  const newValues = ({
      name: placeNameCard.value,
      link: placeUrlCard.value
  });
  const newCards = handleAddCard(newValues)
  event.target.reset();
  addingCardButton.classList.add('popup__button_disabled');
  addingCardButton.disabled = true;
  closePopup(popupOpenCard);
  return newCards
}

initialCards.forEach((item) => {
  handleAddCard(item)
})

popupAdding.addEventListener('submit',addCard);
