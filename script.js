let openForm = document.querySelector('.profile__container_edit-button');
let info = document.querySelector('.popup');
function Open() {
    info.style = 'opacity: 1; visibility: visible';
}
openForm.addEventListener('click', Open);

let popupClose = document.querySelector('.popup__close');
function Close() {
    info.style = 'opacity: 0; visibility: hidden';
}
popupClose.addEventListener('click', Close);

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('#name-input');
let jobInput = document.querySelector('#info-input');

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    // Получите значение полей jobInput и nameInput из свойства value
    let title = document.querySelector('.profile__container-title');
    let subtitle = document.querySelector('.profile__container_subtitle');
    title.textContent = nameInput.value;
    subtitle.textContent = jobInput.value;
}   
formElement.addEventListener('submit', handleFormSubmit);
formElement.addEventListener('submit', Close);
