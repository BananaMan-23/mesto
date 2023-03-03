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

// Находим форму в DOM
let formElement = document.querySelector('.popup__form')// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('#name-input'); // Воспользуйтесь инструментом .querySelector()

let jobInput = document.querySelector('#info-input'); // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);