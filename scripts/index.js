let openForm = document.querySelector('.profile__container-edit');
let info = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('#name-input');
let jobInput = document.querySelector('#info-input');
let title = document.querySelector('.profile__container-title');
let subtitle = document.querySelector('.profile__container-subtitle');

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


function handleFormSubmit (evt) {
    evt.preventDefault(); 
    title.textContent = nameInput.value; 
    subtitle.textContent = jobInput.value;  
    closeClick()
}   
formElement.addEventListener('submit', handleFormSubmit);

