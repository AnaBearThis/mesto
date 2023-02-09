const formValidationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

function disableSubmit(evt) {
    evt.preventDefault();
};

function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((form) => {
        form.addEventListener('submit', disableSubmit);
        form.addEventListener('input', () => {
            toggleButton(form, config);
        });

        toggleButton(form, config);
    });
}

function handleFormInput(inputItem, config) {
    const inputId = inputItem.id;
    const inputError = document.querySelector(`#${inputId}-error`);

    if (inputItem.validity.valid) {
        inputItem.classList.remove(config.inputErrorClass);
        inputError.classList.remove(config.errorClass);
        inputError.textContent = '';
    } else {
        inputItem.classList.add(config.inputErrorClass);
        inputError.classList.add(config.errorClass);
        inputError.textContent = inputItem.validationMessage;
    }
}

function toggleButton(form, config) {
    const buttonSubmit = form.querySelector(config.submitButtonSelector);
    const isFormValid = form.checkValidity();

    buttonSubmit.disabled = !isFormValid;
    buttonSubmit.classList.toggle(config.inactiveButtonClass, !isFormValid);
}

function setInputListeners(form, config) {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));

    inputList.forEach(function (inputItem) {
        inputItem.addEventListener('input', () => {
            handleFormInput(inputItem, config);
        });
        handleFormInput(inputItem, config);
    });
};

enableValidation(formValidationConfig);