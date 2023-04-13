const enableValidation = ({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}); 


function Validation ({formSelector, ...rest}) {
    const forms = Array.from(document.querySelectorAll(formSelector));
    forms.forEach(form => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(form, rest)
    });
};

function setEventListeners (formValidate, {submitButtonSelector, inputSelector, ...rest}) {
    const formInputs = Array.from(formValidate.querySelectorAll(inputSelector));
    const formButton = formValidate.querySelector(submitButtonSelector);

    disableButton(formButton, rest)
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            checkInputValidity(input,  rest)
            if(hasInvalidInput(formInputs)) {
                disableButton(formButton, rest)
            } else {
                enableButton(formButton, rest)
            }
        })
    })
};


function checkInputValidity (input, {inputErrorClass, errorClass, ...rest}) {
    const textError = document.querySelector(`#${input.id}-error`)
    if(input.checkValidity()) {
        textError.textContent = '';
        textError.classList.remove(errorClass)
        input.classList.remove(inputErrorClass)
    } else {
        textError.classList.add(errorClass)
        textError.textContent = input.validationMessage;
        input.classList.add(inputErrorClass)
    }
};


function hasInvalidInput (form) {
    return form.some(item => !item.validity.valid)
}

function enableButton (button, {inactiveButtonClass}) {
    button.classList.remove(inactiveButtonClass)
    button.setAttribute('disabled')
}

function disableButton (button, {inactiveButtonClass}) {
    button.classList.add(inactiveButtonClass)
    button.removeAttribute('disabled')
};

Validation (enableValidation);
