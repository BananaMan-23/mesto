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
const buttonLikes = document.getElementsByClassName('element__group-like');
const addingCard = document.querySelector('.profile__container-add');


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



for (const buttonLike of buttonLikes) {
    buttonLike.addEventListener('click', function clickLike() {
        buttonLike.classList.toggle('element__group-like_active');
    })
}



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

