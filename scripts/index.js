let openForm = document.querySelector('.profile__container-edit');
let info = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('#name-input');
let jobInput = document.querySelector('#info-input');
let title = document.querySelector('.profile__container-title');
let subtitle = document.querySelector('.profile__container-subtitle');
let like = document.querySelector('.element__group-like');
let likeActive = document.querySelector('.element__group-like_active');

function likeClick() {
    likeActive.style = 'background-image: url(./././images/like-active.svg)'
}
like.addEventListener('click', likeClick)

function openClick() {
    info.style = 'opacity: 1; visibility: visible';
}
openForm.addEventListener('click', openClick);

function closeClick() {
    info.style = 'opacity: 0; visibility: hidden';
}
popupClose.addEventListener('click', closeClick);

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    title.textContent = nameInput.value;
    subtitle.textContent = jobInput.value;
    formElement.addEventListener('submit', closeClick);
}   
formElement.addEventListener('submit', handleFormSubmit);

