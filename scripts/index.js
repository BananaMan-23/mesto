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
const openForm = document.querySelector('.profile__container-edit');
const info = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('#name-input');
const jobInput = document.querySelector('#info-input');
const title = document.querySelector('.profile__container-title');
const subtitle = document.querySelector('.profile__container-subtitle');
const openFormCard = document.querySelector('.profile__container-add');
const infoCard = document.querySelector('.popup_card-add');
const popupCloseCard = document.querySelector('.popup__close-button');

const deleteCards = document.querySelector('.element__trash');
const elementsCard = document.querySelector('.elements');
const buttonLikes = document.getElementsByClassName('element__group-like');
const addingCard = document.querySelector('.popup__add-card');
const placeNameCard = document.querySelector('.popup__input_place_name');
const placeUrlCard = document.querySelector('.popup__input_place_url');
const template = document.querySelector('.template-cards').content;
const closeZoomImage = document.querySelector('.popup__close-button_zoom-image');
const popupZoomImage = document.querySelector('.popup_zoom-image');

function closeCardsForm () {
  infoCard.remove('.popup_opened');
}
addingCard.addEventListener('click', closeCardsForm);


initialCards.forEach(renderCards)
function renderCards (item) {
  const htmlElement = template.cloneNode(true);
  htmlElement.querySelector('.element__trash').addEventListener('click', deleteCard);
  htmlElement.querySelector('.element__image').src = item.link;
  htmlElement.querySelector('.element__image').alt = item.name;
  htmlElement.querySelector('.element__group-subtitle').textContent = item.name;
  htmlElement.querySelector('.element__group-like').addEventListener('click', likeActive);
  htmlElement.querySelector('.element__image').addEventListener('click', () => openImage(item))
  elementsCard.prepend(htmlElement);
  return createCard;
}

function openImage (item) {
  popupZoomImage.querySelector('.popup__image').src = item.link;
  popupZoomImage.querySelector('.popup__caption').textContent = item.name;
  popupZoomImage.classList.add('popup_opened');
}
function handleCloseZoom () {
  popupZoomImage.classList.remove('popup_opened');
}
closeZoomImage.addEventListener('click', handleCloseZoom);

function renderCard (item) {
  const cardElement = createCard(item);
  elementsCard.append(cardElement);
}
function createCard (item) {
  elementsCard = renderCards(item);
  return elementsCard;
}
function handleAdding (evt) {
  evt.preventDefault();
  const item = {name: placeNameCard.value, link: placeUrlCard.value};
  renderCard(item);
  closeCardsForm();
  evt.target.reset();

}
addingCard.addEventListener('click', handleAdding);


function deleteCard (event) {
  const card = event.target.closest('.element');
  card.remove()
}

function likeActive () {
  for (const buttonLike of buttonLikes) {
    buttonLike.addEventListener('click', function clickLike() {
        buttonLike.classList.toggle('element__group-like_active');
    })
}

}



function openClick() {
    nameInput.value = title.textContent;
    jobInput.value = subtitle.textContent;
    info.classList.add('popup_opened');
}
openForm.addEventListener('click', openClick);
function closeClick() {
    info.classList.remove('popup_opened');
}
popupClose.addEventListener('click', closeClick);



function openClickCard() {
    infoCard.classList.add('popup_opened');
}
openFormCard.addEventListener('click', openClickCard);
function closeClickCard() {
    infoCard.classList.remove('popup_opened');
}
popupCloseCard.addEventListener('click', closeClickCard);



function handleFormSubmit (evt) {
    evt.preventDefault(); 
    title.textContent = nameInput.value; 
    subtitle.textContent = jobInput.value;  
    closeClick()
}   
formElement.addEventListener('submit', handleFormSubmit);
function close(event) {
    if(event.target !== event.currentTarget) {
        return;
    }
    closeClick()
}
info.addEventListener('click', close);


