let openForm = document.querySelector('.profile__container-edit');
let info = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('#name-input');
let jobInput = document.querySelector('#info-input');
let title = document.querySelector('.profile__container-title');
let subtitle = document.querySelector('.profile__container-subtitle');
nameInput.value = title.textContent;
jobInput.value = subtitle.textContent;

function openClick() {
    info.classList.add('popup__opened');
}
openForm.addEventListener('click', openClick);


function closeClick() {
    info.classList.remove('popup__opened');
}
popupClose.addEventListener('click', closeClick);


function handleFormSubmit (evt) {
    evt.preventDefault(); 
    closeClick
}   
formElement.addEventListener('submit', handleFormSubmit);

