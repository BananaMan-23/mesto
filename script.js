let openForm = document.querySelector('.profile__info_edit-button');
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