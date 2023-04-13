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
// все попапы
const popups = document.querySelectorAll('.popup');
// кнопка открытия редактирования профиля
const buttonOpenProfile = document.querySelector('.profile__container-edit');

const popupOpenEdit = document.querySelector('.popup_open-edit');

const popupClosed = document.querySelector('.popup__close');
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

const popupCloseCard = document.querySelector('.popup__close_button_card-add');
// кнопка удаления карточки
const deleteCards = document.querySelector('.element__trash');

const elementsCard = document.querySelector('.elements');
// кнопка добавление карточки на сайт
const addingCard = document.querySelector('.popup__add-card');
// название карточки
const placeNameCard = document.querySelector('.popup__input_place_name');
// ссылка на карточку
const placeUrlCard = document.querySelector('.popup__input_place_url');
// template шаблон
const template = document.querySelector('.template-cards').content;

const closeZoomImage = document.querySelector('.popup__close_button_zoom-image');

const popupZoomImage = document.querySelector('.popup_zoom-image');
// картинка в большем размере
const popupImage = document.querySelector('.popup__image');
// подпись к фотографиям
const popupCaption = document.querySelector('.popup__caption');


const popupAdding =  document.querySelector("form[name='popup_adding']");
const popupProfile = document.querySelector("form[name='popup_profile']")


function openPopup (popup) {
  popup.classList.add('popup_opened');
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
}


initialCards.forEach(renderCards)

function renderCards (item) {
  const newCard = createCards(item);
  elementsCard.append(newCard);

}


function createCards(item) {
  const htmlElement = template.cloneNode(true);
  const buttonLike = htmlElement.querySelector('.element__group-like');
  htmlElement.querySelector('.element__trash').addEventListener('click', deleteCard);
  htmlElement.querySelector('.element__image').src = item.link;
  htmlElement.querySelector('.element__image').alt = item.name;
  htmlElement.querySelector('.element__group-subtitle').textContent = item.name;
  buttonLike.addEventListener('click', () => {
    buttonLike.classList.toggle('element__group-like_active');
  });
  htmlElement.querySelector('.element__image').addEventListener('click', () => openImage(item));
  return htmlElement;
}


function addCard (event) {
  event.preventDefault();
  const newCard = createCards({name: placeNameCard.value, link: placeUrlCard.value});
  elementsCard.prepend(newCard);
  event.target.reset()
}

function openImage (item) {
  popupImage.src = item.link;
  popupImage.alt = item.name;
  popupCaption.textContent = item.name;
  openPopup(popupZoomImage);
}


function deleteCard (event) {
  const card = event.target.closest('.element');
  card.remove()
}

function openClick() {
    // nameInput.value = title.textContent;
    // jobInput.value = subtitle.textContent;
    openPopup(popupOpenEdit);
}

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    title.textContent = nameInput.value; 
    subtitle.textContent = jobInput.value;
   closePopup(popupOpenEdit);  
    
}  

function close(event) {
    if(event.target !== event.currentTarget) {
        return;
    }
    closePopup(popupOpenEdit);
    closePopup(popupOpenCard);
    closePopup(popupZoomImage);
}

// функция закрытия попапа
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closePopup(popupOpenEdit);
    closePopup(popupOpenCard);
    closePopup(popupZoomImage);
  }
})



popupZoomImage.addEventListener('click', close);
popupOpenCard.addEventListener('click', close);
popupOpenEdit.addEventListener('click', close);
popupProfile.addEventListener('submit', handleFormSubmit);
buttonOpenProfile.addEventListener('click', openClick);
popupAdding.addEventListener('submit',addCard);
addingCard.addEventListener('click', () => closePopup(popupOpenCard));
popupClosed.addEventListener('click', () => closePopup(popupOpenEdit));
popupCloseCard.addEventListener('click', () => closePopup(popupOpenCard));
closeZoomImage.addEventListener('click', () => closePopup(popupZoomImage));
buttonOpenEdit.addEventListener('click', () => openPopup(popupOpenCard));

